class RunsLimitSignal {
  constructor ({maxRuns = 100} = {}) {
    this._maxRuns = maxRuns
    this._queue = []
    this._runningCount = 0
  }

  _flush () {
    const countToRun = this._maxRuns - this._runningCount
    if (countToRun > 0) {
      const resolves = this._queue.splice(0, countToRun)
      this._runningCount += resolves.length
      resolves.forEach(resolve => resolve())
    }
  }

  wait () {
    return new Promise(resolve => {
      this._queue.push(resolve)
      this._flush()
    }).then(() => () => {
      this._runningCount--
      this._flush()
    })
  }
}

module.exports = RunsLimitSignal
