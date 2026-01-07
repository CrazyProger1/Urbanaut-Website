export type ParamRecord = Record<
  string,
  string | string[] | number | number[] | boolean | undefined
>;

export const builtParamsFromRecord = (params: ParamRecord, base?: URLSearchParams) => {
  const newParams = new URLSearchParams(base);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          const uniqueValues = new Set(newParams.getAll(key));
          newParams.delete(key);

          value.forEach((subvalue) => {
            uniqueValues.add(String(subvalue));
          });

          uniqueValues.forEach((subvalue) => {
            newParams.append(key, String(subvalue));
          });
        } else {
          newParams.set(key, String(value));
        }
      } else {
        newParams.delete(key);
      }
    });

    return newParams;
  }
};
