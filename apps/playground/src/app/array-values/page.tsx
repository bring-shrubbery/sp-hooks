"use client";

import { useState } from "react";
import { SetKeyValueArrayInputs } from "@/components/set-key-value-inputs";
import { Alert } from "@/components/ui/alert";
import { useObserverAndSearch } from "@sp-hooks/next";

export default function Page() {
  const [state, setState] = useState();

  useObserverAndSearch(state);

  return (
    <div>
      <Alert>
        {"This demonstration shows how to use the library with arrays."}
      </Alert>

      <SetKeyValueArrayInputs setState={setState} />

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
