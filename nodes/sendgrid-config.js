module.exports = function (RED) {
  function SendgridConfig(config) {
    RED.nodes.createNode(this, config)

    this.apiKey = config.apiKey
  }

  RED.nodes.registerType('sendgrid-config', SendgridConfig)
}
