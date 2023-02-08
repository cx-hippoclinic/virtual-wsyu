export function deriveObject<T, P = T[keyof T]>(obj: T, fn: (value: T[keyof T]) => P) {
  const res = {} as unknown as { readonly [K in keyof T]: P };
  for (const [key, val] of Object.entries(obj)) {
    res[key] = fn(val);
  }
  return res;
}

export function pickObject<T, K extends keyof T>(object: T, ...keys: K[]): { [P in K]: T[P] } {
  const result = {} as any;
  for (const key of keys) {
    result[key] = object[key];
  }
  return result;
}
