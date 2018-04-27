const RunsLimitSignal = require('./signal')

function buildSignal(options) {
  const signal = new RunsLimitSignal(options)
  return signal.wait.bind(signal)
}

module.exports = buildSignal
