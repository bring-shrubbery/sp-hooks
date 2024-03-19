import { useEffect } from "react";
import type { ReadonlyURLSearchParams } from "next/navigation";

import { SPHooksStateType, SupportedValues } from "./types";

/*
 * Conerts a URLSearchParams object to a plain object, with
 * the values being either a string or an array of strings,
 * depending on the number of values for a given key.
 */
export const searchParamsToObject = <S extends SPHooksStateType>(
  sp: URLSearchParams | ReadonlyURLSearchParams,
  options?: { defaultValues?: Partial<S> },
): SPHooksStateType => {
  const newObj: SPHooksStateType = {};

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

  if (options?.defaultValues) {
    Object.entries(options.defaultValues).forEach(
      ([key, value]: [string, string | string[]]) => {
        if (typeof newObj[key] === "undefined") {
          newObj[key] = value;
        }
      },
    );
  }

  return newObj;
};

/*
 * Converts a plain object to a URLSearchParams object.
 */
export function stateToSearchParams<S extends SPHooksStateType>(
  state: S,
  options?: { defaultValues?: Partial<S> },
) {
  const searchParams = new URLSearchParams();

  Object.entries(state).forEach(([key, value]) =>
    mutSetValueToSearchParams(searchParams, key, value, options),
  );

  return searchParams;
}

/*
 * Observe a state object and call setSearchParams when the state changes.
 */
export function useObserveAndStore<S extends SPHooksStateType>(
  state: S,
  setSearchParams: (newSearchParams: URLSearchParams) => void,
  options?: { defaultValues?: Partial<S> }, // TODO: Change this to ObserveAndStoreOptions
) {
  useEffect(() => {
    setSearchParams(stateToSearchParams(state, options));
  }, [state]);
}

/*
 * Accepts URLSearchParams as first parameter and a generic serialisable type as a second.
 * Converts type to a string or an array of strings depending on the provided type and sets it in the URLSearchParams.
 */
export function mutSetValueToSearchParams<S extends SPHooksStateType>(
  sp: URLSearchParams,
  key: string,
  value: SupportedValues,
  options?: { defaultValues?: Partial<S> },
) {
  if (Array.isArray(value)) {
    value.forEach((v) => {
      sp.append(key, encodeURIComponent(v.toString()));
    });
  } else {
    if (options?.defaultValues && options.defaultValues[key] === value) {
      return;
    }

    sp.set(key, encodeURIComponent(value.toString()));
  }
}
