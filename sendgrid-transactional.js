module.exports = function (RED) {
  function SendGridTransactionalNode(config) {
    RED.nodes.createNode(this, config)
    var node = this

    node.on('input', function (msg) {
      this.status({ fill: 'green', shape: 'dot', text: 'sending' })
      const sgMail = require('@sendgrid/mail')

      sgMail.setApiKey(this.credentials.key)

      var data = {
        from: config.from || msg.from,
        to: config.to || msg.to,
        templateId: msg.topic || msg.title || 'Message from Node-RED',
        dynamic_template_data: msg.data || msg.payload.data || {}
      }

      sgMail.send(data, function (err) {
        if (err) {
          node.error(err.toString(), msg)
        }
      })

      this.status({})
    })
  }
  RED.nodes.registerType('sendgrid-transactional', SendGridTransactionalNode, {
    credentials: {
      key: { type: 'password' }
    }
  })
}
