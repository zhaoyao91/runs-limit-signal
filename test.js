const sleep = require('sleep-promise')
const Signal = require('./signal')
const buildSignal = require('./index')

describe('Signal', function () {
  it('should run functions with concurrent limit', async () => {
    const started = []
    const finished = []

    const signal = new Signal({maxRuns: 2})

    async function func (arg) {
      const done = await signal.wait()
      started.push(arg)
      await sleep(100)
      finished.push(arg)
      done()
    }

    func(1)
    func(2)
    func(3)

    await sleep()
    expect(started).toEqual([1, 2])
    await sleep(100)
    expect(finished).toEqual([1, 2])
    await sleep()
    expect(started).toEqual([1, 2, 3])
    await sleep(100)
    expect(finished).toEqual([1, 2, 3])
    await sleep()
    expect(started).toEqual([1, 2, 3])
    func(4)
    await sleep()
    expect(started).toEqual([1, 2, 3, 4])
    await sleep(100)
    expect(finished).toEqual([1, 2, 3, 4])
  })

  it('should run functions with concurrent limit using simple builder', async () => {
    const started = []
    const finished = []

    const signal = buildSignal({maxRuns: 2})

    async function func (arg) {
      const done = await signal()
      started.push(arg)
      await sleep(100)
      finished.push(arg)
      done()
    }

    func(1)
    func(2)
    func(3)

    await sleep()
    expect(started).toEqual([1, 2])
    await sleep(100)
    expect(finished).toEqual([1, 2])
    await sleep()
    expect(started).toEqual([1, 2, 3])
    await sleep(100)
    expect(finished).toEqual([1, 2, 3])
    await sleep()
    expect(started).toEqual([1, 2, 3])
    func(4)
    await sleep()
    expect(started).toEqual([1, 2, 3, 4])
    await sleep(100)
    expect(finished).toEqual([1, 2, 3, 4])
  })
})