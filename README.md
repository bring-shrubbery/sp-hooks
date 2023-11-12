# use-search-params-state

[![build](https://github.com/bring-shrubbery/use-search-params-state/actions/workflows/ci.yml/badge.svg)](https://github.com/bring-shrubbery/use-search-params-state/actions/workflows/ci.yml)

## Features

- 🚀 `useState` hook that syncs the state with URL Search Params.
- 🤓 Keeps URL clean by automatically removing default values.
- ⚡️ Accepts Zod schema for validation and parsing (WIP).
- 😳 Built for React, with Next.js integration available.
- 😇 Integrations for SvelteKit/Astro coming soon.

## Packages

| Package                        | Latest Version                                                                |
| ------------------------------ | ----------------------------------------------------------------------------- |
| @use-search-params-state/react | ![react-npm](https://img.shields.io/npm/v/%40use-search-params-state%2Freact) |
| @use-search-params-state/next  | ![next-npm](https://img.shields.io/npm/v/%40use-search-params-state%2Fnext)   |

## Getting Started

### Next.js

`pnpm add @use-search-params-state/next`

### React.js

`pnpm add @use-search-params-state/react`

## Examples

### Simple Next.js usage

Following example will render a button, which when clicked will toggle the button text between "hello" and "world". It will also update the search params to include the value, which means that after refreshing the page, the state will be preserved.

```tsx
import { useSearchParamsState } from "@use-search-params-state/next";

const Component = () => {
  const [state, setState] = useSearchParamsState();

  const handleClick = () => {
    state.greeting === "hello"
      ? setState("greeting", "world")
      : setState("greeting", "hello");
  };

  return <button onClick={handleClick}>{state.greeting ?? "hello"}</button>;
};
```

### Next.js usage with default values

This example works in the same way functionally speaking. In the example above you can see that we manually fall back on the default text value for ths button, but there's a better way. You can provide `defaultValues` parameter to the `useSearchParamsState` hook as seen below. This will do 3 things:

- If no search params are provided, the `greeting` parameter will fall back the default value.
- When `greeting` search param is set to the default value, that value will be removed from the URL, since your code will automatically fallback to that value (You can disable this behavior in options, [read more here](/#todo)).
- TypeScript will understand that you have `greeting` parameter available, and will autosuggest it for you.

```tsx
import { useSearchParamsState } from "@use-search-params-state/next";

const Component = () => {
  const [state, setState] = useSearchParamsState({
    defaultValues: {
      greeting: "hello",
    },
  });

  const handleClick = () => {
    state.greeting === "hello"
      ? setState("greeting", "world")
      : setState("greeting", "hello");
  };

  return <button onClick={handleClick}>{state.greeting}</button>;
};
```

### Next.js with Zod validation (coming soon)

Here, before using the search params hook, we define Zod validation schema that we want to use for the search params validation. Then we only need to pass the schema into the `zodSchema` prop inside of our `useSearchParamsState`, and we're good to go! Now our state is fully type-safe, and if we define schema with `.catch` statements, then it even catches invalid values and falls back to default ones! Additionally, you get number types automatically by using `z.coerce` to parse numbers.

```tsx
"use client"
import { useSearchParamsState } from "@use-search-params-state/next";
import { z } from 'zod'

const SearchParamsSchema = z.object({
  page: z.coerce.number().catch(1),
  perPage: z.coerce.number().catch(100),
  search: z.string().optional(),
})

const Component = () => {
  const [state, setState] = useSearchParamsState({
    zodSchema: SearchParamsSchema
  });

  return <>
    ...
  </>;
};

// In a `page.tsx`:

export default function Page({ searchParam }) {
  const parsedParams = SearchParamsSchema.parse(searchParams);

  const data = db.query(..., {
    page: parsedParams.page,
    perPage: parsedParams.perPage,
    search: parsedParams.search,
  });

  return <Component data={data}/>
}
```

## Roadmap

- [x] State comes from search params.
- [x] Set state updates search params.
- [x] Default values.
- [x] Option to remove search params if they are set to their default values.
- [x] Remove falsy values.
- [x] Preserve initial keys - keys are preserved in search params, if they were initially set.
- [x] Next.js integration.
- [ ] Array values.
- [ ] Zod validation.
- [ ] Zod default values.
- [ ] Zod optional values.
- [ ] Type-safe state from default values or when validation schema is provided.
- [ ] More validation tools (yup, etc.).
- [ ] Svelte/SvelteKit

## Credits

This project is built and maintained by [Antoni](https://github.com/bring-shrubbery)

If you need help building anything that has a frontend, check out [Quassum](https://quassum.com)

## License

[Apache 2.0 License](./LICENSE)
