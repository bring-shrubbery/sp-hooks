---
title: Basic usage with Redux and Next.js
description: The bare minimum example of using sp-hooks with Redux and Next.js.
---

> Note: We're assuming you've setup Redux in your Next.js app, and wrapped your app in a `Provider` component.

## Example

```tsx
import { useObserveAndStore } from "@sp-hooks/next";
import { useDispatch, useSelector } from "react-redux";

const ClientComponent = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useObserveAndStore(state);

  const handleClick = () => {
    dispatch({
      type: "hello",
      payload: state.hello === "hello" ? "world" : "there"
    });
  };

  return <button onClick={handleClick}>{state.hello}</button>;
};
```
