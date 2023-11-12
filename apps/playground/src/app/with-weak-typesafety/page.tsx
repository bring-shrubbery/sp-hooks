"use client";

import { SetKeyValueInputs } from "@/components/set-key-value-inputs";
import { Alert } from "@/components/ui/alert";

import { useSearchParamsState } from "@use-search-params-state/next";

interface SearchParamsType {
  page: string;
  search?: string;
}

export default function Page() {
  const [state, setState] = useSearchParamsState<SearchParamsType>({
    defaultValues: {
      page: "1",
    },
  });

  return (
    <div>
      <Alert>
        {
          "Check source code for this page. It has a generic type parameter passed to useSearchParamsState and enforces usage of the state inline with the provided type."
        }
      </Alert>

      <SetKeyValueInputs
        setState={(k, v) => setState(k as keyof SearchParamsType, v)}
      />

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
