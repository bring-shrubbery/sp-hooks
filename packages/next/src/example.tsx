import { useSearchParamsState } from "./index";

const Component = () => {
  const [state, setState] = useSearchParamsState<{
    greeting?: string;
    hello: string;
  }>();

  const handleClick = () => {
    state.greeting === "hello"
      ? setState("greeting", "world")
      : setState("greeting", "hello");
  };

  return <button onClick={handleClick}>{state.greeting ?? "hello"}</button>;
};

<Component />;
