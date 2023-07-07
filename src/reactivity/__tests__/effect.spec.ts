import { describe, expect, it } from 'vitest'
import { reactive } from '../reactive'
import { effect } from '../effect'

describe('effect', () => {
  it('happy path', () => {
    const user = reactive({
      age: 10,
    })

    let nextAge
    effect(() => {
      nextAge = user.age + 1
    })
    expect(nextAge).toBe(11)

    user.age++
    expect(nextAge).toBe(12)
  })
  it('return runner when call effect', () => {
    let foo = 10
    const runner = effect(() => {
      foo++
      return 'bar'
    })

    expect(foo).toBe(11)
    const result = runner()
    expect(foo).toBe(12)
    expect(result).toBe('bar')
  })
})
