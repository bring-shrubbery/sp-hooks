import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useSearchParamsState as useSearchParamsStateReact } from "@use-search-params-state/react";
import type { UseSearchParamsStateOptions } from "@use-search-params-state/react";

export const useSearchParamsState = <
  State extends
    | { [K in keyof State]: string }
    | Record<string, string> = Record<string, string>,
>(
  opts?: UseSearchParamsStateOptions<State>,
) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setSearchParams = (newSearchParams: URLSearchParams) => {
    router.push(pathname + "?" + newSearchParams.toString());
  };

  return useSearchParamsStateReact<State>({
    searchParams,
    setSearchParams,
    ...opts,
  });
};
