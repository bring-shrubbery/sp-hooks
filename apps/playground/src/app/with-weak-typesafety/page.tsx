"use client";

import { useState } from "react";
import { SetKeyValueInputs } from "@/components/set-key-value-inputs";
import { Alert } from "@/components/ui/alert";
import { useObserveAndStore } from "@sp-hooks/next";

interface SearchParamsType extends Record<string, string | string[]> {
  page: string;
  search: string;
  testArray: string[];
}

export default function Page() {
  const [state, setState] = useState<SearchParamsType>({
    page: "1",
    search: "",
    testArray: [],
  });

  useObserveAndStore(state);

  return (
    <div>
      <Alert>
        {
          "Check source code for this page. It has a generic type parameter passed to useSearchParamsState and enforces usage of the state inline with the provided type."
        }
      </Alert>

      <SetKeyValueInputs setState={setState} />

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
