import { useState } from "react";
import type { ReadonlyURLSearchParams } from "next/navigation";

// export type SetStateType<S extends ZodObject<R>, R extends ZodRawShape> = <
//   T extends ZodInfer<S>,
//   K extends keyof T
// >(
//   key: K extends keyof T ? K : string,
//   value: K extends keyof T ? T[K] : string
// ) => void;

// const getDefaultsFromSchema = <S extends ZodObject<R>, R extends ZodRawShape>(
//   schema: S
// ) => {
//   const schemaKeys = Object.keys(schema.shape);
//   const newDefaultValuesObject: Record<string, unknown> = {};
//   schemaKeys.forEach((k) => {
//     const def = schema.shape[k]?._def;
//     if (def?.typeName === "ZodDefault") {
//       newDefaultValuesObject[k] = def.defaultValue();
//     }
//   });
//   return newDefaultValuesObject;
// };

// function partialObjectEqual(
//   obj1: Record<string, unknown>,
//   obj2: Record<string, unknown>
// ) {
//   const keys1 = Object.keys(obj1);
//   const keys2 = Object.keys(obj2);

//   const overlappingKeys = keys1.filter((k) => keys2.includes(k));

//   for (const key of overlappingKeys) {
//     if (obj1[key] == obj2[key]) continue;
//     else return false;
//   }

//   return true;
// }

// const initOptions = (options?: UseSearchParamsStateOptions) => {
//   return {
//     removeFalsyValues: true,
//     ...options,
//   } satisfies Required<UseSearchParamsStateOptions>;
// };

// const useDefaultValues = <S extends ZodObject<R>, R extends ZodRawShape>(
//   schema: S
// ) => {
//   return useMemo(() => getDefaultValueObject(schema), [schema]);
// };

// const validateSchemaFormat = <S extends ZodObject<R>, R extends ZodRawShape>(
//   schema: S
// ) => {
//   if (schema._def.typeName !== "ZodObject") {
//     throw new Error(
//       "Schema has to be a Zod object. Use z.object() to define your schema."
//     );
//   }
// };

// const getStateFromParams = <
//   S extends ZodObject<R>,
//   R extends ZodRawShape,
//   T extends ZodInfer<S>
// >(
//   schema: S,
//   params: URLSearchParams | ReadonlyURLSearchParams
// ) => {
//   return schema.parse(createObjectFromSearchParams(params)) as T;
// };

export interface UseSearchParamsStateBase {
  searchParams: URLSearchParams | ReadonlyURLSearchParams;
  setSearchParams: (newSearchParams: URLSearchParams) => void;
}

export interface UseSearchParamsStateOptions<State> {
  /**
   * Default values will be used in the case that the search param
   * you're accessing does not contain a value. We recommend always
   * providing default values for your search params.
   */
  defaultValues?: State extends Record<string, string>
    ? Record<string, string>
    : { [K in keyof State]?: string };

  /**
   * Zod schema
   */
  // TODO: Implement Zod Validation
  // zodSchema?: ZodSchema ;

  /**
   * If true, default values will be removed from the search params.
   * @default true
   */
  removeDefaultValues?: boolean;

  /**
   * If true, falsy values will be removed from the search params.
   * @default true
   */
  removeFalsyValues?: boolean;

  /**
   * If true, keys that were initially present in the search params
   * will be preserved even if the removeDefaultValues and
   * removeFalsyValues options are set to true.
   * @default false
   */
  preserveInitialKeys?: boolean;

  /**
   * If true, keys will be sorted alphabetically.
   * @default true
   */
  sortKeys?: boolean;
}

const searchParamsToObject = (
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

export type UseSearchParamsStateParams<State> = UseSearchParamsStateBase &
  UseSearchParamsStateOptions<State>;

export const useSearchParamsState = <
  State extends
    | { [K in keyof State]: string }
    | Record<string, string> = Record<string, string>,
  // ZodSchema extends ZodObject<ZodSchemaRaw>,
  // ZodSchemaRaw extends ZodRawShape,
  // ZodSchemaType extends ZodInfer<ZodSchema>,
  Params extends
    UseSearchParamsStateParams<State> = UseSearchParamsStateParams<State>,
>(
  p: Params,
): [State, (key: keyof State, value: string) => void] => {
  // Configure default values.
  const opts: Params = {
    removeDefaultValues: true,
    removeFalsyValues: true,
    preserveInitialKeys: false,
    sortKeys: true,
    ...p,
  };

  const spObject = Object.assign(
    {},
    opts.defaultValues,
    searchParamsToObject(p.searchParams),
  );

  const [initiallySetKeys] = useState(Array.from(p.searchParams.keys()));

  const setState = (key: keyof State, value: string) => {
    const newObject = {
      ...spObject,
      [key]: value,
    };

    const newSearchParams = getSearchParams({
      newObject: newObject as unknown as State,
      options: opts,
      initiallySetKeys,
    });

    p.setSearchParams(newSearchParams);
  };

  return [spObject as unknown as State, setState];
};

const getSearchParams = ({
  newObject,
  options,
  initiallySetKeys,
}: {
  newObject: Record<string, string>;
  options: UseSearchParamsStateParams<Record<string, unknown>>;
  initiallySetKeys: string[];
}) => {
  const newSearchParams = new URLSearchParams();

  Object.keys(newObject).forEach((k) => {
    const v = newObject[k];
    if (typeof v === "undefined") return;

    // If the key was set initially, we want to set save it regardless of value.
    if (options.preserveInitialKeys && initiallySetKeys.includes(k)) {
      newSearchParams.set(k, v);
      return;
    }

    // If the value is falsy and we want to remove falsy values, skip it.
    if (options.removeFalsyValues && !v) return;

    // If the value is the default value and we want to remove default values, skip it.
    if (options.removeDefaultValues && v === options.defaultValues?.[k]) return;

    newSearchParams.set(k, v);
  });

  if (options.sortKeys) {
    newSearchParams.sort();
  }

  return newSearchParams;
};

// export const createQueryStringFromSchema = <
//   S extends ZodObject<R>,
//   R extends ZodRawShape
// >(
//   searchParams: URLSearchParams | ReadonlyURLSearchParams,
//   schema: S
// ): URLSearchParams | undefined => {
//   const stateKeys = Object.keys(schema.shape);
//   if (!stateKeys.length) return undefined;

//   const newParams = new URLSearchParams();
//   const stateObject = createObjectFromSearchParams(searchParams);

//   stateKeys.forEach((key) => {
//     const value = schema.shape[key as any]?.parse(stateObject[key]);
//     newParams.set(key, value);
//   });

//   return newParams;
// };
