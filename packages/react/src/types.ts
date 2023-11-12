import type { ReadonlyURLSearchParams } from "next/navigation";

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
  defaultValues?: Record<string, string>;

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

export type UseSearchParamsStateParams<State> = UseSearchParamsStateBase &
  UseSearchParamsStateOptions<State>;
