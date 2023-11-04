import { useSearchParamsState as useSearchParamsStateReact, type UseSearchParamsStateOptions } from "@use-search-params-state/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSearchParamsState = (opts?: UseSearchParamsStateOptions) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setSearchParams = (newSearchParams: URLSearchParams) => {
    router.push(pathname + "?" + newSearchParams.toString());
  }

  return useSearchParamsStateReact({
    searchParams,
    setSearchParams,
    ...opts
  });
}
