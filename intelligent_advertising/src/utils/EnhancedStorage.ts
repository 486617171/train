import packageJSON from "../../package.json";

type Package = typeof packageJSON & { name?: string };

export enum SaveType {
  LocalStorage = "localStorage",
  SessionStorage = "sessionStorage",
}

interface EnhancedStorageOptions {
  serialization?: boolean;
  prefix?: string;
  cached?: boolean;
  saveType?: SaveType;
}

type Cached = EnhancedStorageOptions["prefix"][];

class EnhancedStorage {
  cached: Cached = [];
  currentKeyMapToNamespace = {};

  options: EnhancedStorageOptions = {
    cached: true,
    serialization: true,
    saveType: SaveType.LocalStorage,
    prefix: "$" + (packageJSON as Package).name || "init",
  };

  constructor(options?: EnhancedStorageOptions) {
    this.options = {
      ...this.options,
      ...options,
    };
  }

  getPrefix() {
    return this.options.prefix;
  }

  set(key, value) {
    const result = this.serializate(value);
    const namespace = this.addPrefix(key);
    const saveType = this.getSaveType();

    window[saveType].setItem(namespace, result);

    // 缓存namespace下的
    if (this.options.cached) {
      this.cached = [...this.cached, namespace];
    }

    if (namespace?.startsWith(this.getPrefix())) {
      this.currentKeyMapToNamespace = {
        ...this.currentKeyMapToNamespace,
        [key]: namespace,
      };
    }
  }

  setSaveType(saveType: SaveType) {
    this.options = {
      ...this.options,
      saveType: saveType,
    };
  }

  get(key) {
    const saveType = this.getSaveType();
    const prefix = this.options.prefix;
    const result = window[saveType].getItem(prefix + key);
    return this.deserializate(result);
  }

  remove(key) {
    const saveType = this.getSaveType();
    window[saveType].removeItem(key);

    if (this.getPrefix()) {
      this.removeCache(key);
    }
  }

  removeCache(targetNamespace) {
    this.cached = this.cached?.filter(
      (namespace) => namespace !== targetNamespace
    );
  }

  clear() {
    const saveType = this.getSaveType();
    window[saveType].clear();
  }

  removeNamespaceAllItem(prefix) {
    if (!this.options.cached) {
      throw new Error(
        "[No Cache]: You don't have cache enabled, so you can't clear storage via prefix"
      );
    }

    this.cached?.forEach((namespace) => {
      if (namespace?.startsWith(prefix)) {
        this.remove(namespace);
        this.removeCache(namespace);
      }
    });
  }

  serializate(value) {
    const { serialization } = this.options;
    if (serialization) {
      return JSON.stringify(value);
    }
    return value;
  }

  deserializate(value) {
    const { serialization } = this.options;
    return serialization ? JSON.parse(value) : value;
  }

  addPrefix(key) {
    const prefix = this.getPrefix();
    return prefix ? `${prefix}${key}` : key;
  }

  getKeyMap() {
    return this.currentKeyMapToNamespace;
  }

  getSaveType(): SaveType {
    return this.options.saveType || SaveType.LocalStorage;
  }
}

export default EnhancedStorage;
