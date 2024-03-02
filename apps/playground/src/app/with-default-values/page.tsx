"use client";

import { SetKeyValueInputs } from "@/components/set-key-value-inputs";
import { Alert } from "@/components/ui/alert";

import { useObserveAndStore } from "@sp-hooks/next";
import { useState } from "react";

export default function Page() {
  const [state, setState] = useState({
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
