module.exports = function (RED) {
  function DynamicTemplate(config) {
    RED.nodes.createNode(this, config)

    this.sendgridConfig = RED.nodes.getNode(config.sendgridConfig)
    const node = this

    node.on('input', function (msg) {
      const sgMail = require('@sendgrid/mail')
      const { apiKey } = node.sendgridConfig
      sgMail.setApiKey(apiKey)

      this.status({ fill: 'green', shape: 'dot', text: 'sending' })

      const templateData = msg.payload.data

      if (!templateData) {
        node.error('No template data provided', msg)
        return
      }

      var data = {
        to: config.to || msg.payload.to,
        from: config.from || msg.payload.from,
        subject: config.subject || msg.payload.subject || '',
        templateId: config.templateId || msg.payload.templateId,
        dynamic_template_data: {
          ...templateData
        }
      }

      sgMail.send(data, function (err) {
        if (err) {
          node.error(err.toString(), msg)
        }
      })

      this.status({})
    })
  }
  RED.nodes.registerType('sendgrid-dynamic-template', DynamicTemplate)
}
