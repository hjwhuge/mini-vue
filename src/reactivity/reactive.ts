import { track, trigger } from './effect'

export function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)

      // 收集依赖
      track(target, key)
      return result
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)

      // 触发依赖
      trigger(target, key)
      return result
    },
  }
  return new Proxy(target, handler)
}
