let activeEffect = null;

export function signal(value) {
  const effects = new Set();

  return {
    get() {
      if (activeEffect) effects.add(activeEffect);
      return value;
    },
    set(v) {
      value = v;
      effects.forEach(fn => fn());
    }
  };
}

export function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

export function Signal(obj, callback) {
  const sig = signal(obj);
  callback(obj);

  return new Proxy(obj, {
    set(target, prop, value) {
      target[prop] = value;
      callback(obj);
      sig.set({ ...target });
      return true;
    }
  });
}
