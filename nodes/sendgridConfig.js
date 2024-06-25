module.exports = function (RED) {
  function SendgridConfig(n) {
    RED.nodes.createNode(this, n)

    this.apiKey = n.apiKey
  }

  RED.nodes.registerType('sendgridConfig', SendgridConfig)
}
