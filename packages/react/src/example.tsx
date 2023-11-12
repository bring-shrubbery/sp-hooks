import { useState } from "react";

import { useSearchParamsState } from "./index";

const Component1 = () => {
  const [searchParams, setSearchParams] = useState(new URLSearchParams());

  const [state, setState] = useSearchParamsState<{
    greeting?: string;
    hello: string[];
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
      : setState("hello", ["hello"]);
  };

  return <button onClick={handleClick}>{state.greeting ?? "hello"}</button>;
};

<Component1 />;

const Comp2 = () => {
  const [searchParams, setSearchParams] = useState(new URLSearchParams());

  const [state, setState] = useSearchParamsState<{
    page: string;
    hello: string;
    testArray: string[];
  }>({
    defaultValues: {
      hello: "world",
    },
    searchParams,
    setSearchParams: (newSearchParams) => {
      console.log("newSearchParams", newSearchParams);
      setSearchParams(newSearchParams);
    },
  });

  const handleClick = () => {
    state.page === "1" ? setState("page", "2") : setState("page", "1");

    setState("testArray", ["hello", "world"]);
  };

  return <button onClick={handleClick}>{state.page}</button>;
};

<Comp2 />;
