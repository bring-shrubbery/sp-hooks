import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useObserveAndStore as useObserveAndStoreReact,
  type SupportedValues,
} from "@sp-hooks/react";

// export const useSearchParamsState = <
//   S extends Partial<Record<string, string | string[]>>,
// >(
//   opts?: UseSearchParamsStateOptions<S>,
// ) => {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const pathname = usePathname();

//   const setSearchParams = (newSearchParams: URLSearchParams) => {
//     router.push(pathname + "?" + newSearchParams.toString());
//   };

//   return useSearchParamsStateReact<S>({
//     searchParams,
//     setSearchParams,
//     ...opts,
//   });
// };

export function useObserveAndStore<S extends Record<string, SupportedValues>>(
  state: S,
) {
  const router = useRouter();
  const pathname = usePathname();

  useObserveAndStoreReact(state, (newSearchParams) => {
    router.push(pathname + "?" + newSearchParams.toString());
  });
}
