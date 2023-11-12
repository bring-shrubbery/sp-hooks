import type { ReadonlyURLSearchParams } from "next/navigation";

import type { UseSearchParamsStateParams } from "./types";

export const getSearchParams = ({
  newObject,
  options,
  initiallySetKeys,
}: {
  newObject: Record<string, string>;
  options: UseSearchParamsStateParams<Record<string, unknown>>;
  initiallySetKeys: string[];
}) => {
  const sp = new URLSearchParams();

  Object.keys(newObject).forEach((k) => {
    const v = newObject[k];
    if (typeof v === "undefined") return;

    // If the key was set initially, we want to set save it regardless of value.
    if (options.preserveInitialKeys && initiallySetKeys.includes(k)) {
      sp.set(k, v);
      return;
    }

    // If the value is falsy and we want to remove falsy values, skip it.
    if (options.removeFalsyValues && !v) return;

    // If the value is the default value and we want to remove default values, skip it.
    if (options.removeDefaultValues && v === options.defaultValues?.[k]) return;

    sp.set(k, v);
  });

  if (options.sortKeys) {
    sp.sort();
  }

  return sp;
};

export const searchParamsToObject = (
  sp: URLSearchParams | ReadonlyURLSearchParams,
): Record<string, string> => {
  const newObj: Record<string, string> = {};

  for (const key of Array.from(sp.keys())) {
    const value = sp.get(key);
    if (value === null) continue;
    newObj[key] = value;
  }

  return newObj;
};
