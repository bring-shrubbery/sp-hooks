"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SetKeyValueInputs } from "@/components/set-key-value-inputs";
import { Alert } from "@/components/ui/alert";

import { searchParamsToObject, useObserveAndStore } from "@sp-hooks/next";

const defaultValues = {
  hello: "world",
};

export default function Page() {
  const sp = useSearchParams();

  const [state, setState] = useState(
    searchParamsToObject(sp, { defaultValues }),
  );

  useObserveAndStore(state, { defaultValues });

  return (
    <div>
      <Alert>
        {
          'This page has a default value of "world" for the key "hello". The key/value pair is removed from URL if its set to the default value.'
        }
      </Alert>

      <SetKeyValueInputs setState={setState} />

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
