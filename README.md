# Runs Limit Signal

Limit concurrency of function executions by waiting a signal.

## Installation

```
npm install runs-limit-signal
```

## Usage


``` ecmascript6
const buildSignal = require('runs-limit-signal')

const signal = buildSignal({
  maxRuns: 100 // default to 100
})

async function task() {
  const done = await signal()
  // do something
  done()
}

task()
task()
...
```

## License

MIT
