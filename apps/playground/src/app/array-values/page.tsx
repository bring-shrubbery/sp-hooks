"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SetKeyValueArrayInputs } from "@/components/set-key-value-inputs";
import { Alert } from "@/components/ui/alert";

import { searchParamsToObject, useObserveAndStore } from "@sp-hooks/next";

export default function Page() {
  const sp = useSearchParams();

  const [state, setState] = useState(searchParamsToObject(sp));

  useObserveAndStore(state);

  return (
    <div>
      <Alert>
        {"This demonstration shows how to use the library with arrays."}
      </Alert>

      <SetKeyValueArrayInputs
        setState={(key, values) => {
          setState((s) => ({ ...s, [key]: values }));
        }}
      />

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
