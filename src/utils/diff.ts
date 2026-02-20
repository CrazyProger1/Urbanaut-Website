const isEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return [...a].sort().every((v, i) => isEqual(v, [...b].sort()[i]));
  }
  if (typeof a === "object" && typeof b === "object" && a !== null && b !== null) {
    return Object.keys(b as object).every((k) =>
      isEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]),
    );
  }
  return false;
};

export const getDiff = <T, U extends Record<string, unknown>>(original: T, updated: U): Partial<U> =>
  Object.fromEntries(
    Object.entries(updated).filter(([key, value]) => !isEqual((original as Record<string, unknown>)[key], value)),
  ) as Partial<U>;