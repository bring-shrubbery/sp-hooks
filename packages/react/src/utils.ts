import { useEffect, useState, type DependencyList } from "react";
import type { ReadonlyURLSearchParams } from "next/navigation";

import { SupportedValues } from "./types";

/*
 * Conerts a URLSearchParams object to a plain object, with
 * the values being either a string or an array of strings,
 * depending on the number of values for a given key.
 */
export const searchParamsToObject = (
  sp: URLSearchParams | ReadonlyURLSearchParams,
): Record<string, string | string[]> => {
  const newObj: Record<string, string | string[]> = {};

  for (const key of Array.from(sp.keys())) {
    const values = sp.getAll(key);

    if (values.length > 1) {
      newObj[key] = values;
    } else {
      const value = values.at(0);
      if (typeof value === "undefined") continue;
      newObj[key] = value;
    }
  }

  return newObj;
};

/*
 * Converts a plain object to a URLSearchParams object.
 */
export function stateToSearchParams<S extends Record<string, SupportedValues>>(
  state: S,
) {
  const searchParams = new URLSearchParams();

  Object.entries(state).forEach(([key, value]) =>
    mutSetValueToSearchParams(searchParams, key, value),
  );

  return searchParams;
}

/*
 * Observe a state object and call setSearchParams when the state changes.
 */
export function useObserveAndStore<S extends Record<string, SupportedValues>>(
  state: S,
  setSearchParams: (newSearchParams: URLSearchParams) => void,
) {
  useEffect(() => {
    setSearchParams(stateToSearchParams(state));
  }, Object.entries(state));
}

/*
 * Accepts URLSearchParams as first parameter and a generic serialisable type as a second.
 * Converts type to a string or an array of strings depending on the provided type and sets it in the URLSearchParams.
 */
export function mutSetValueToSearchParams(
  sp: URLSearchParams,
  key: string,
  value: SupportedValues,
) {
  if (Array.isArray(value)) {
    value.forEach((v) => {
      sp.append(key, encodeURIComponent(v.toString()));
    });
  } else {
    sp.set(key, encodeURIComponent(value.toString()));
  }
}
