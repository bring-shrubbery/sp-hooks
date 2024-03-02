import { useState } from "react";

import type { SupportedValueTypes, UseSearchParamsStateParams } from "./types";
import { searchParamsToObject } from "./utils";

export * from "./types";

// --------------- Number Getter ---------------

type NumberGetterResult = Readonly<{
  catch: (cval: number) => number;
  value: () => number;
}>;

const createNumberGetter = ({
  value,
}: {
  value?: SupportedValueTypes;
}): NumberGetterResult => {
  const v = Number(value);

  return Object.freeze({
    catch: (cval) => (isNaN(v) || typeof value === "undefined" ? cval : v),
    value: () => v,
  });
};

type AllNumberGetterResult = Readonly<{
  catch: (cval: number[]) => number[];
  value: () => number[];
}>;

const createAllNumberGetter = ({
  values,
}: {
  values: SupportedValueTypes[];
}): AllNumberGetterResult => {
  const v = values.map((v) => Number(v));

  return Object.freeze({
    catch: (cval) => (v.every((v) => isNaN(v)) ? cval : v),
    value: () => v,
  });
};

// ---------------- Boolean Getter --------------

type BooleanGetterResult = Readonly<{
  catch: (cval: boolean) => boolean;
  value: () => boolean;
}>;

const createBooleanGetter = ({
  value,
}: {
  value?: SupportedValueTypes;
}): BooleanGetterResult => {
  const v = Boolean(value);

  return Object.freeze({
    catch: (cval) => {
      const isBoolean =
        typeof value === "boolean" || value === "true" || value === "false";

      return isBoolean ? v : cval;
    },
    value: () => v,
  });
};

type AllBooleanGetterResult = Readonly<{
  catch: (cval: boolean[]) => boolean[];
  value: () => boolean[];
}>;

const createAllBooleanGetter = ({
  values,
}: {
  values: SupportedValueTypes[];
}): AllBooleanGetterResult => {
  const v = values.map((v) => Boolean(v));

  const isBoolean = values.every(
    (vb) => typeof vb === "boolean" || vb === "true" || vb === "false",
  );

  return Object.freeze({
    catch: (cval) => (isBoolean ? v : cval),
    value: () => v,
  });
};

// ----------------- Date Getter -------------

type DateGetterResult = Readonly<{
  catch: (cval: Date) => Date;
  value: () => Date | undefined;
}>;

const createDateGetter = ({
  value,
}: {
  value?: SupportedValueTypes;
}): DateGetterResult => {
  const vn = Date.parse(value as string);
  const v = new Date(value as string);

  return Object.freeze({
    catch: (cval: Date) => (isNaN(vn) ? cval : v),
    value: () => (typeof value !== "undefined" ? v : value),
  });
};

type AllDateGetterResult = Readonly<{
  catch: (cval: Date[]) => Date[];
  value: () => Date[];
}>;

const createAllDateGetter = ({
  values,
}: {
  values: SupportedValueTypes[];
}): AllDateGetterResult => {
  const vn = values.map((v) => Date.parse(v as string));
  const v = values.map((v) => new Date(v as string));

  return Object.freeze({
    catch: (cval: Date[]) => (vn.every((v) => isNaN(v)) ? cval : v),
    value: () => v,
  });
};

// ---------------- General Getter ----------------

type GetterResult<
  R,
  O extends "asNumber" | "asBoolean" | "asDate" | "value" = never,
> = Omit<
  {
    asNumber: () => NumberGetterResult;
    asBoolean: () => BooleanGetterResult;
    asDate: () => DateGetterResult;
    value: () => R | undefined;
  },
  O
>;

type AllGetterResult<
  R,
  O extends "asNumber" | "asBoolean" | "asDate" | "value" = never,
> = Readonly<
  Omit<
    {
      asNumber: () => AllNumberGetterResult;
      asBoolean: () => AllBooleanGetterResult;
      asDate: () => AllDateGetterResult;
      value: () => R[];
    },
    O
  >
>;

// ----------------- createGetter -----------------

const createGetter = <R extends SupportedValueTypes | undefined = never>({
  value,
}: {
  value?: R;
}): GetterResult<R> => {
  return Object.freeze({
    asNumber: () => createNumberGetter({ value }),
    asBoolean: () => createBooleanGetter({ value }),
    asDate: () => createDateGetter({ value }),
    value: () => value,
  });
};

// ----------------- createAllGetter -----------------

const createAllGetter = <R extends SupportedValueTypes = never>({
  values,
}: {
  values: R[];
}): AllGetterResult<R> => {
  return Object.freeze({
    asNumber: () => createAllNumberGetter({ values }),
    asBoolean: () => createAllBooleanGetter({ values }),
    asDate: () => createAllDateGetter({ values }),
    value: () => values,
  });
};

// ----------------- createSetter -----------------

type SetterResult = Readonly<{
  number: (value: number | number[]) => void;
  boolean: (value: boolean | boolean[]) => void;
  date: (value: Date | Date[]) => void;
  string: (value: string | string[]) => void;
}>;

const createSetter = ({ key }: { key: string }): SetterResult => {
  return Object.freeze({
    string: (value: string | string[]) => {
      const sp = new URLSearchParams();

      if (Array.isArray(value)) {
        // setStringArray;
        // sp.set(key, firstValue);
        // sp.append(key, values[i+1]);
      } else {
        // setString;
        // sp.set(key, value);
      }

      // setSearchParams(sp);
    },
    number: (value: number | number[]) => {
      if (Array.isArray(value)) {
        // setNumberArray;
      } else {
        // setNumber;
      }
    },
    boolean: (value: boolean | boolean[]) => {
      if (Array.isArray(value)) {
        // setBooleanArray;
      } else {
        // setBoolean;
      }
    },
    date: (value: Date | Date[]) => {
      if (Array.isArray(value)) {
        // setDateArray;
      } else {
        // setDate;
      }
    },
  });
};

// ----------------- useSearchParamsState -----------------

export const useSearchParamsState = <
  Params extends UseSearchParamsStateParams = UseSearchParamsStateParams,
>(
  p: Params,
): Readonly<{
  get: (key: string) => ReturnType<typeof createGetter>;
  getAll: (key: string) => ReturnType<typeof createAllGetter>;
  set: (key: string) => ReturnType<typeof createSetter>;
}> => {
  // Configure default values.
  const opts: Params = {
    removeDefaultValues: true,
    removeFalsyValues: true,
    sortKeys: true,
    instant: false,
    ...p,
  };
  // return [spObject as unknown as S, setState];

  return Object.freeze({
    get: (key) => {
      // Extract default value, taking first item if it's an array.
      const defaultValue = ((): SupportedValueTypes | undefined => {
        if (!p.defaultValues || !(key in p.defaultValues)) return undefined;

        const val = p.defaultValues[key];
        if (!val) return undefined;

        if (Array.isArray(val)) {
          return val.at(0);
        }

        return val;
      })();

      const value = p.searchParams.get(key) ?? defaultValue ?? undefined;

      return createGetter({
        value,
      });
    },
    getAll: (key) => {
      // Extract default value as an array, even if it's a single value.
      const defaultValue = ((): SupportedValueTypes[] | undefined => {
        if (!p.defaultValues || !(key in p.defaultValues)) return undefined;

        const val = p.defaultValues[key];
        if (!val) return undefined;

        if (Array.isArray(val)) {
          return val;
        }

        return [val];
      })();

      const value = p.searchParams.getAll(key);

      return createAllGetter({
        values:
          value.length > 0
            ? value
            : defaultValue && defaultValue.length > 0
              ? defaultValue
              : [],
      });
    },
    set: (key) => {
      // TODO: Implement
      console.log("WIP: Setting is not yet implemented.");

      return createSetter({ key });
    },
  });
};

// const s = useSearchParamsState({
//   searchParams: new URLSearchParams(),
//   setSearchParams: () => {},
// });

// s.get("page").asNumber().value();
// s.get("perPage").asNumber().value();
