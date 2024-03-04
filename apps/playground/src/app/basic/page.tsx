"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SetKeyValueInputs } from "@/components/set-key-value-inputs";

import { searchParamsToObject, useObserveAndStore } from "@sp-hooks/next";

export default function Page() {
  const sp = useSearchParams();

  const [state, setState] = useState(searchParamsToObject(sp));

  useObserveAndStore(state);

  return (
    <div>
      <SetKeyValueInputs setState={setState} />

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
