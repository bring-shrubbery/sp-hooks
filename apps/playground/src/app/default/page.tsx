"use client";

import { useSearchParamsState } from "@use-search-params-state/react";

export default function Page() {
  const [searchParams, setSearchParams] = useSearchParamsState();

  return <div>default</div>;
}
