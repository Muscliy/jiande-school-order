const KeysMap = {
  State: "state",
  Mutations: "mutations",
  Actions: "actions",
  Getters: "getters",
};

function each(target, type, source, moduleName, store) {
  return Object.keys(source).reduce((target, name) => {
    const key = `${moduleName}/${name}`;
    switch (type) {
      case KeysMap.State:
        Object.defineProperty(target, name, {
          get: () => store.state[moduleName]?.[name],
        });
        break;
      case KeysMap.Mutations:
        target[name] = (payload) => store.commit(key, payload);
        break;
      case KeysMap.Actions:
        target[name] = (payload) => store.dispatch(key, payload);
        break;
      case KeysMap.Getters:
        Object.defineProperty(target, name, { get: () => store.getters[key] });
        break;
    }
    return target;
  }, target);
}

export function moduleWrapper(moduleName, moduleObj, store) {
  return Object.keys(moduleObj).reduce(
    (acc, key) =>
      each(
        acc,
        key,
        (key === KeysMap.State ? moduleObj[key]() : moduleObj[key]) || {},
        moduleName,
        store
      ),
    {}
  );
}
