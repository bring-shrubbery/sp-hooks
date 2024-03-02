import type { ReadonlyURLSearchParams } from "next/navigation";

export type SupportedValueTypes = number | string | boolean | Date | BigInt;
export type SupportedArrayValueTypes =
  | number[]
  | string[]
  | boolean[]
  | Date[]
  | BigInt[];
export type SupportedJointValueArrayTypes = SupportedValueTypes[];
export type SupportedValues =
  | SupportedValueTypes
  | SupportedArrayValueTypes
  | SupportedJointValueArrayTypes;

export interface UseSearchParamsStateBase {
  searchParams: URLSearchParams | ReadonlyURLSearchParams;
  setSearchParams: (newSearchParams: URLSearchParams) => void;
}

export interface UseSearchParamsStateOptions {
  /**
   * Default values will be used in the case that the search param
   * you're accessing does not contain a value. We recommend always
   * providing default values for your search params.
   */
  defaultValues?: Record<string, SupportedValueTypes>;

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
   * If true, keys will be sorted alphabetically.
   * @default true
   */
  sortKeys?: boolean;

  /**
   * If true, the URL will be updated instantly. If false, the URL
   * will use useState hook to batch updates.
   * @default false
   */
  instant?: boolean;
}

export type UseSearchParamsStateParams = UseSearchParamsStateBase &
  UseSearchParamsStateOptions;
