interface Options {
  /**
   * 递归处理的 key 列表
   */
  recursiveKeys?: string[];
  /**
   * 优先排序的 key 列表
   */
  favoriteKeys?: string[];
  /**
   * 默认解析包含 & 或者 = 的 value
   */
  recursive?: boolean;
}

export const extractURLParams = (url: string, options?: Options) => {
  const { recursiveKeys = [], favoriteKeys = [], recursive = true } = options || {};
  const search = url.split('?')[1] || url;
  if (!(search.includes('&') || search.includes('='))) return {};
  // 使用 URLSearchParams
  const searchParams = new URLSearchParams(search);
  const params: { [key: string]: string } = {};
  // 递归处理, 使用 stack 模拟递归
  const stack: [string, string][] = Array.from(searchParams.entries()).reverse();
  while (stack.length) {
    const [key, value] = stack.pop()!;
    if (
      recursiveKeys.includes(key) ||
      ((value.includes('&') || value.includes('=')) && recursive)
    ) {
      let _searchParams: URLSearchParams = new URLSearchParams(value);
      // 如果 value 中包含 ?, 代表是 url
      if (value.includes('?')) {
        const _search = value.split('?')[1];
        _searchParams = new URLSearchParams(_search);
      }
      stack.push(...Array.from(_searchParams.entries()).reverse());
    }
    params[key] = value;
  }
  // 按照 favoriteKeys 的顺序对 params 进行排序
  const _params: { [key: string]: string } = {};
  favoriteKeys.forEach((key) => {
    if (params[key]) {
      _params[key] = params[key];
    }
  });
  Object.keys(params).forEach((key) => {
    if (!_params[key]) {
      _params[key] = params[key];
    }
  });
  return _params;
};
