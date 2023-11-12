import { useSearchParamsState } from "./index";

const Component = () => {
  const [state, setState] = useSearchParamsState<{
    greeting?: string;
    hello: string;
    testArray: string[];
  }>();

  const handleClick = () => {
    state.greeting === "hello"
      ? setState("greeting", "world")
      : setState("greeting", "hello");

    setState("testArray", ["hello", "world"]);
  };

  return <button onClick={handleClick}>{state.greeting ?? "hello"}</button>;
};

<Component />;

const Comp2 = () => {
  const [state, setState] = useSearchParamsState();

  const handleClick = () => {
    state.greeting === "hello"
      ? setState("greeting", "world")
      : setState("greeting", "hello");

    setState("fdsafdsa", ["fdsafdsa"]);
    setState("fdsafdsa", "fdsafdsa");
  };

  return <button onClick={handleClick}>{state.greeting ?? "hello"}</button>;
};

<Comp2 />;
