"use client";

import { useState } from "react";
import { SetKeyValueInputs } from "@/components/set-key-value-inputs";
import { Alert } from "@/components/ui/alert";
import { useObserveAndStore } from "@sp-hooks/next";

export default function Page() {
  const [state, setState] = useState<Record<string, string | string[]>>({
    hello: "world",
  });

  useObserveAndStore(state);

  return (
    <div>
      <Alert>
        {'This page has a default value of "world" for the key "hello".'}
      </Alert>

      <SetKeyValueInputs setState={setState} />

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
