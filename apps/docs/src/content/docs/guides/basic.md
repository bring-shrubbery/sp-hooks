---
title: Basic usage with Next.js.
description: The bare minimum example of sp-hooks.
---

The `@sp-hooks` packages are designed to be used in conjunction with the state management solution of your choice. They are designed to be used with Next.js, but can be used with any React application.

## The `useObserveAndStore` hook

The first thing you will want to do with `@sp-hooks` is to observe and store the state of your component. This is done with the `useObserveAndStore` hook.

This hook will observe the state of your component, and store it in the URL search params. This means on every change of the state, the URL will be updated to reflect the new state.

```tsx
import { useObserveAndStore } from "@sp-hooks/next";

const ClientComponent = () => {
  const [state, setState] = useState();

  useObserveAndStore(state);

  const handleClick = () => {
    setState({
      hello: state.hello === "hello" ? "world" : "there"
    });
  };

  return <button onClick={handleClick}>{state.hello}</button>;
};
```

The `useObserveAndStore` hook expects you to pass an object with the following type: `Record<string, Value | Value[]>`, where `type Value = string | number | boolean | BigInt | Date`.

> Note: Since we are serializing the state to the URL, we are limited to the types that can be serialized to a string. This means that you cannot store complex objects in the URL.

## The `searchParamsToObject` function

If you try the code above, you will notice that the stae is updated in React and in the URL. But if you refresh the page, the state will be lost. This is because we are not reading the state from the URL.

The `searchParamsToObject` function is a utility function that will convert the URL search params to an object.

```tsx
import { useSearchParams } from "next/navigation";
import { searchParamsToObject, useObserveAndStore } from "@sp-hooks/next";

const ClientComponent = () => {
  const searchParams = useSearchParams();

  const [state, setState] = useState(searchParamsToObject(searchParams));

  useObserveAndStore(state);

  const handleClick = () => {
    setState({
      hello: state.hello === "hello" ? "world" : "there"
    });
  };

  return <button onClick={handleClick}>{state.hello}</button>;
};
```

Now when you refresh the page, the state will be read from the URL and passed as initial state of `useState` hook. The button will reflect the state.
