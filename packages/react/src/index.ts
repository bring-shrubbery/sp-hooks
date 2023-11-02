import { useEffect, useMemo, useState } from "react";
import type { ReadonlyURLSearchParams } from "next/navigation";

import type { ZodObject, ZodRawShape, infer as ZodInfer, SomeZodObject } from "zod";

export type SetStateType<S extends ZodObject<R>, R extends ZodRawShape> = <
  T extends ZodInfer<S>,
  K extends keyof T
>(
  key: K,
  value: T[K]
) => void;

const getDefaultValueObject = <S extends ZodObject<R>, R extends ZodRawShape>(
  schema: S
) => {
  const schemaKeys = Object.keys(schema.shape);
  const newDefaultValuesObject: Record<string, unknown> = {};
  schemaKeys.forEach((k) => {
    const def = schema.shape[k]?._def;
    if (def?.typeName === "ZodDefault") {
      newDefaultValuesObject[k] = def.defaultValue();
    }
  });
  return newDefaultValuesObject;
};

const createObjectFromSearchParams = (
  sp: URLSearchParams | ReadonlyURLSearchParams
): Record<string, unknown> => {
  const newObj: Record<string, unknown> = {};
  const keys = Array.from(sp.keys());

  for (const key of keys) {
    newObj[key] = sp.get(key);
  }

  return newObj;
};

function partialObjectEqual(
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>
) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const overlappingKeys = keys1.filter((k) => keys2.includes(k));

  for (const key of overlappingKeys) {
    if (obj1[key] == obj2[key]) continue;
    else return false;
  }

  return true;
}

const initOptions = (options?: UseSearchParamsStateOptions) => {
  return {
    removeFalsyValues: true,
    ...options,
  } satisfies Required<UseSearchParamsStateOptions>;
};

const useDefaultValues = <S extends ZodObject<R>, R extends ZodRawShape>(
  schema: S
) => {
  return useMemo(() => getDefaultValueObject(schema), [schema]);
};

const validateSchemaFormat = <S extends ZodObject<R>, R extends ZodRawShape>(
  schema: S
) => {
  if (schema._def.typeName !== "ZodObject") {
    throw new Error(
      "Schema has to be a Zod object. Use z.object() to define your schema."
    );
  }
};

const getStateFromParams = <
  S extends ZodObject<R>,
  R extends ZodRawShape,
  T extends ZodInfer<S>
>(
  schema: S,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  return schema.parse(createObjectFromSearchParams(params)) as T;
};

/**
 * Requirements list
 *
 * - [x] Initial state comes from search params.
 * - [x] Initial state is set to default values if not present in search params (zod).
 * - [x] Hook exposes current state and setState function.
 * - [x] setState function updates state and calls saveSearchParams function after the state is updated.
 * - [ ] ??? State includes parameters in zod schema, extra props are not added or removed from searchParams.
 * - [ ] If no params are provided, they are not set until state is changed.
 * - [ ] saveSearchParams function updates search params outside of the hook.
 * - [ ] Optional parameters.
 * - [ ] SSR function to parse searchParams once.
 * - [ ] Zod schema should be optional, but if provided, it has to be type-safe.
 * - [x] Zod schema has to be an object first, even for single param.
 * - [ ] Array field support, allowing to have multi-value parameters.
 */

export type UseSearchParamsStateParams = <
  ZodSchema extends SomeZodObject = SomeZodObject
>{
  // Required properties

  searchParams: URLSearchParams | ReadonlyURLSearchParams;
  saveSearchParams: (newSearchParams?: URLSearchParams) => void;
  
  // Optional properties
  
  /**
   * Default values will be used in the case that the search param
   * you're accessing does not contain a value. We recommend always
   * providing default values for your search params.
   */
  defaultValues?: Record<string, unknown>;

  /**
   * Zod schema 
   */
  zodSchema?: ZodSchema;


  /**
   * @default true
   */
  removeDefaultValues?: boolean;
}

export function useSearchParamsState<
  S extends ZodObject<R>,
  R extends ZodRawShape,
  T extends ZodInfer<S>
>(
  p: UseSearchParamsStateParams 
): [T, SetStateType<S, R>] {
  console.log("-------- NEW RENDER --------");
  validateSchemaFormat(p.schema);

  const opts = initOptions(options);

  const parsedSearchParams = useMemo(
    () => getStateFromParams<S, R, T>(p.schema, p.searchParams),
    [p.schema, p.searchParams]
  );

  const [initiallySetKeys] = useState(Array.from(p.searchParams.keys()));
  const defaultValues = useDefaultValues(p.schema);
  const [s, ss] = useState<T>(parsedSearchParams);

  const setState: SetStateType<S, R> = (key, value) => {
    ss((ps) => {
      const cleanObject = {
        ...ps,
        [key]: p.schema.shape[key as any]?.parse(value),
      };

      if (opts.removeFalsyValues) {
        Object.keys(cleanObject).forEach((k) => {
          if (!cleanObject[k]) {
            delete cleanObject[k];
          }
        });
      }

      return cleanObject;
    });
  };

  useEffect(() => {
    const createQueryString = () => {
      const stateKeys = Object.keys(s);
      if (!stateKeys.length) return undefined;

      const params = new URLSearchParams();

      stateKeys.forEach((key) => {
        const value = s[key];
        if (value != defaultValues[key] || initiallySetKeys.includes(key)) {
          params.set(key, s[key] ?? "");
        }
      });

      return params;
    };

    const newParams = createQueryString();
    if (!newParams) return;

    const didChange = !partialObjectEqual(
      getStateFromParams(p.schema, newParams),
      parsedSearchParams
    );

    if (!!newParams && didChange) p.saveSearchParams(newParams);
  }, [defaultValues, initiallySetKeys, p, parsedSearchParams, s]);

  return [s, setState];
}

export const createQueryStringFromSchema = <
  S extends ZodObject<R>,
  R extends ZodRawShape
>(
  searchParams: URLSearchParams | ReadonlyURLSearchParams,
  schema: S
): URLSearchParams | undefined => {
  const stateKeys = Object.keys(schema.shape);
  if (!stateKeys.length) return undefined;

  const newParams = new URLSearchParams();
  const stateObject = createObjectFromSearchParams(searchParams);

  stateKeys.forEach((key) => {
    const value = schema.shape[key as any]?.parse(stateObject[key]);
    newParams.set(key, value);
  });

  return newParams;
};
