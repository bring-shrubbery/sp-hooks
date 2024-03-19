---
title: Default Values
description: How to set default values for your state.
---

When using default values you have to do a couple of things:

- Provide default values to your state manager.
- Provide the same default values to `useObserveAndStore` hook, if you want to remove default values from search params when they are set to the default value.

## Example

```tsx
import { useObserveAndStore } from "@sp-hooks/next";

const ClientComponent = () => {
  const [state, setState] = useState({
    greeting: "hello",
  });

  useObserveAndStore(state, {
    defaultValues: {
      greeting: "hello",
    },
  });

  return <button>{state.greeting}</button>;
}
```

## A cleaner version

```tsx
import { useObserveAndStore } from "@sp-hooks/next";

const defaultValues = {
  greeting: "hello",
};

const ClientComponent = () => {
  const [state, setState] = useState(defaultValues);

  useObserveAndStore(state, { defaultValues });

  return <button>{state.greeting}</button>;
}
```
