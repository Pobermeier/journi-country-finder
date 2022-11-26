export type Cache<T> = Record<string, T>;

export const getCache = <T>(cacheKey: string, cache: Cache<T>) => cache[cacheKey];

export const setCache = <T>(resultToCache: T, cacheKey: string, cache: Cache<T>) => {
  cache[cacheKey] = resultToCache;

  return resultToCache;
};
