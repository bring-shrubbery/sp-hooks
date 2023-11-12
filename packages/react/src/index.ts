import { useState } from "react";

import type { UseSearchParamsStateParams } from "./types";
import { getSearchParams, searchParamsToObject } from "./utils";

export * from "./types";

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
