export type SupportedValueTypes = number | string | boolean | Date | bigint;
export type SupportedValueArrayTypes = SupportedValueTypes[];
export type SupportedValues = SupportedValueTypes | SupportedValueArrayTypes;

// TODO: Replace string | string[] with SupportedValues
export type SPHooksStateType = Record<string, string | string[]>;

export interface ObserveAndStoreOptions<
  S extends Record<string, SupportedValueTypes>,
> {
  /**
   * Default values will be used in the case that the search param
   * you're accessing does not contain a value. We recommend always
   * providing default values for your search params.
   */
  defaultValues?: Partial<S>;

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
}
