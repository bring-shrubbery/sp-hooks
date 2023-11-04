"use client";

import { SetKeyValueInputs } from "@/components/set-key-value-inputs";
import { Alert } from "@/components/ui/alert";
import { useSearchParamsState } from "@use-search-params-state/next";

export default function Page() {
  const [state, setState] = useSearchParamsState({
    defaultValues: {
      hello: "world"
    }
  });

  return <div>
    <Alert>
      {'This page has a default value of "world" for the key "hello".'}
    </Alert>

    <SetKeyValueInputs setState={setState} />


    <pre>{
      JSON.stringify(state, null, 2)
    }</pre>
  </div>;
}
