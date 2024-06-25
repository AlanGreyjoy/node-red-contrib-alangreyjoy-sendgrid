module.exports = function (RED) {
  function BasicEmail(config) {
    RED.nodes.createNode(this, config)

    this.sendgridConfig = RED.nodes.getNode(config.sendgridConfig)

    const node = this

    node.on('input', function (msg) {
      const sgMail = require('@sendgrid/mail')
      const { apiKey } = node.sendgridConfig

      if (!apiKey) {
        node.error('No SendGrid API key found in configuration node', msg)
        return
      }

      sgMail.setApiKey(apiKey)

      this.status({ fill: 'green', shape: 'dot', text: 'sending' })

      const data = {
        from: config.from || msg.payload.from,
        to: config.to || msg.payload.to,
        cc: config.cc || msg.payload.cc,
        bcc: config.bcc || msg.payload.bcc,
        subject: config.subject || msg.payload.subject || 'Message from Node-RED'
      }

      if (config.content === 'html') data.html = msg.payload.html.toString()
      else data.text = msg.payload.text.toString()

      sgMail.send(data, function (err) {
        if (err) {
          node.error(err.toString(), msg)
        }
      })

      this.status({})
    })
  }

  RED.nodes.registerType('sendgrid-basic-email', BasicEmail)
}
