import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useSearchParamsState as useSearchParamsStateReact } from "@use-search-params-state/react";
import type { UseSearchParamsStateOptions } from "@use-search-params-state/react";

export const useSearchParamsState = <
  S extends Partial<Record<string, string | string[]>>,
>(
  opts?: UseSearchParamsStateOptions<S>,
) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setSearchParams = (newSearchParams: URLSearchParams) => {
    router.push(pathname + "?" + newSearchParams.toString());
  };

  return useSearchParamsStateReact<S>({
    searchParams,
    setSearchParams,
    ...opts,
  });
};
