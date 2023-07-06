let activeEffect

// target -> key -> dep
const targetMap = new WeakMap()
export function track(target, key) {
  if (!activeEffect)
    return

  let depsMap = targetMap.get(target)
  if (!depsMap) {
    // no map.
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    // no dependencies (effects)
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(activeEffect) // Add effect to dependency map
}
export function trigger(target, key) {
  const depsMap = targetMap.get(target) // Does this object have any properties that have dependencies (effects)
  if (!depsMap)
    return

  const dep = depsMap.get(key) // If there are dependencies (effects) associated with this
  if (dep) {
    dep.forEach((effect) => {
      // run them all
      effect()
    })
  }
}

export function effect(eff) {
  activeEffect = eff // Set this as the activeEffect
  activeEffect() // Run it
  activeEffect = null // Unset it
}
