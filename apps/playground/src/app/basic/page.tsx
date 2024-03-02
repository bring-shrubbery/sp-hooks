"use client";

import { SetKeyValueInputs } from "@/components/set-key-value-inputs";

import { useObserveAndStore,  } from "@sp-hooks/next";
import { searchParamsToObject } from "@sp-hooks/react"
import { useSearchParams } from "next/navigation";
import { useState } from "react";

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
