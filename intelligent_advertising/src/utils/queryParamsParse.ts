// obj -> queryString
export function serializationQuery(
  queryObject: Record<string, string>,
  transformEncodeURIComponent: boolean
): string {
  return (
    Object.keys(queryObject)
      /*encodeURIComponent 在一些带有特殊字符的情况下会出错, eg: github的api*/
      .map((key) =>
        transformEncodeURIComponent
          ? `${key}=${encodeURIComponent(queryObject[key])}`
          : `${key}=${queryObject[key]}`
      )
      .join("&")
  );
}

// queryString -> obj
export function deserializationQuery(
  searchString: string
): Record<string, string> {
  return (searchString.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (iterated: Record<string, string>, current: string) => {
      const key = current.slice(0, current.indexOf("="));
      const value = current.slice(current.indexOf("=") + 1);

      iterated[key] = value;

      return iterated;
    },
    {}
  );
}
