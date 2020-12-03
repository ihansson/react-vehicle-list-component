const CACHE: any = {};

export function setBasicCache(path: string, value: any) {
  CACHE[path] = value;
}

export function getBasicCache(path: string) {
  return path in CACHE ? CACHE[path] : false;
}
