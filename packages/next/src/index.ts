import { usePathname, useRouter } from "next/navigation";

import { useObserveAndStore as useObserveAndStoreReact } from "@sp-hooks/react";
import type { SPHooksStateType } from "@sp-hooks/react";

export * from "@sp-hooks/react";
export type * from "@sp-hooks/react";

export function useObserveAndStore<S extends SPHooksStateType>(
  state: S,
  options?: { defaultValues?: Partial<S> },
) {
  const router = useRouter();
  const pathname = usePathname();

  useObserveAndStoreReact(
    state,
    (newSearchParams) => {
      router.push(pathname + "?" + newSearchParams.toString());
    },
    options,
  );
}
