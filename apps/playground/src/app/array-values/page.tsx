"use client";

import { SetKeyValueArrayInputs } from "@/components/set-key-value-inputs";
import { Alert } from "@/components/ui/alert";

import { useSearchParamsState } from "@use-search-params-state/next";

export default function Page() {
  const [state, setState] = useSearchParamsState();

  return (
    <div>
      <Alert>
        {"This demonstration shows how to use the library with arrays."}
      </Alert>

      <SetKeyValueArrayInputs setState={(k, v) => setState(k, v)} />

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
