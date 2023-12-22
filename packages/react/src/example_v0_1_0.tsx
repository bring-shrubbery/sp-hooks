import { useState } from "react";

import { useSearchParamsState } from "./index";

const Component1 = () => {
  const [searchParams, setSearchParams] = useState(new URLSearchParams());

  const s = useSearchParamsState<{
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
    s.get("greeting") === "hello"
      ? s.set("greeting").value("world")
      : s.set("hello").value(["bye"]);
  };

  return <button onClick={handleClick}>{state.greeting ?? "hello"}</button>;
};

<Component1 />;

const Comp2 = () => {
  const [searchParams, setSearchParams] = useState(new URLSearchParams());

  const s = useSearchParamsState({
    defaultValues: {
      hello: "world",
    },
    searchParams,
    setSearchParams: (newSearchParams) => {
      console.log("newSearchParams", newSearchParams);
      setSearchParams(newSearchParams);
    },
  });

  const page = s.get("page").asNumber().catch(1);
  const perPage = s.get("perPage").asNumber().catch(10);
  const search = s.get("search");
  const query = s.get("search").value();
  const catogories = s.getAll("catogories");
  const dates = s.getAll("dates").asDate();

  const update = () => {
    s.set("page").value(2);
    s.set("perPage").value(20);
    s.set("search").value("hello");
    s.set("catogories").value(["a", "b"]);
    s.set("catogories").push("c");
    s.set("catogories").extend(["a", "d"]);
    s.set("dates").value([new Date(), new Date()]);

    s.remove("page");
    s.remove("perPage");
  };

  console.log(page, perPage, search, query, catogories, dates, update());

  return null;
};

<Comp2 />;
