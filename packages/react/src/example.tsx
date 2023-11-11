import { useState } from "react";

import { useSearchParamsState } from "./index";

const Component = () => {
  const [searchParams, setSearchParams] = useState(new URLSearchParams());

  const [state, setState] = useSearchParamsState<{
    greeting?: string;
    hello: string;
  }>({
    searchParams,
    setSearchParams: (newSearchParams) => {
      console.log("newSearchParams", newSearchParams);
      setSearchParams(newSearchParams);
    },
  });

  const handleClick = () => {
    state.greeting === "hello"
      ? setState("greeting", "world")
      : setState("greeting", "hello");
  };

  return <button onClick={handleClick}>{state.greeting ?? "hello"}</button>;
};

<Component />;
