---
title: Basic usage with Zustand and Next.js
description: The bare minimum example of using sp-hooks with Zustand and Next.js.
---


## Example

```tsx
import { useObserveAndStore } from "@sp-hooks/next";
import create from "zustand";

const useStore = create((set) => ({
  hello: "hello",
  setHello: (hello: string) => set({ hello })
}));

const ClientComponent = () => {
  const state = useStore();
  const setState = useStore((state) => state.setHello);

  useObserveAndStore(state);

  const handleClick = () => {
    setState(state.hello === "hello" ? "world" : "there");
  };

  return <button onClick={handleClick}>{state.hello}</button>;
};
```
