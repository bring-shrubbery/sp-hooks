---
title: Basic usage with Jotai and Next.js
description: The bare minimum example of using sp-hooks with Jotai and Next.js.
---

## Example

```tsx
import { useObserveAndStore } from "@sp-hooks/next";
import { atom, useAtom } from "jotai";

const stateAtom = atom({
  hello: "hello"
});

const ClientComponent = () => {
  const [state, setState] = useAtom(stateAtom);

  useObserveAndStore(state);

  const handleClick = () => {
    setState({
      hello: state.hello === "hello" ? "world" : "there"
    });
  };

  return <button onClick={handleClick}>{state.hello}</button>;
};
```
