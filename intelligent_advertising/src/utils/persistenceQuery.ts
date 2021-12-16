import type { Authentication } from "@/shared/types/authentication";
import EnhancedStorage, { SaveType } from "@/utils/EnhancedStorage";

const enhancedStorage = new EnhancedStorage({
  prefix: "$$APP_INIT/",
  saveType: SaveType.LocalStorage,
});

// 将鉴权的参数持久化到localStorage
const semoizeQuery = memoize();
function persistenceQuery(query: Authentication): void {
  const param = query?.shop ? query : enhancedStorage.get("query");
  semoizeQuery<Authentication>(query, () =>
    enhancedStorage.set("query", param)
  );
}

function memoize() {
  const cached: Map<string, string> = new Map();

  return <M = unknown>(
    memoizeObj: M,
    onChangeCallback?: (value: M, allMemoized?: Map<string, string>) => void
  ) => {
    // XXX： 是否使用JSON stringify 有待商议
    const serializated = JSON.stringify(memoizeObj);

    if (!cached.has(serializated)) {
      cached.set(serializated, serializated);
      onChangeCallback && onChangeCallback(memoizeObj, cached);
    }

    // ...
    // 缓存结果没有变化
  };
}

export default persistenceQuery;
export { enhancedStorage };
