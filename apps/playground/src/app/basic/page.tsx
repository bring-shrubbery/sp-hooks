"use client";

import { SetKeyValueInputs } from "@/components/set-key-value-inputs";
import { useSearchParamsState } from "@use-search-params-state/next";

export default function Page() {
  const [state, setState] = useSearchParamsState();

  return <div>
    <SetKeyValueInputs setState={setState} />

    <pre>{
      JSON.stringify(state, null, 2)
    }</pre>
  </div>;
}
