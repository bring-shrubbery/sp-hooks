# Search Params Hooks

[![build](https://github.com/bring-shrubbery/sp-hooks/actions/workflows/ci.yml/badge.svg)](https://github.com/bring-shrubbery/sp-hooks/actions/workflows/ci.yml)

## Features

- 😌 Sync state to the URL Search Params and back again.
- 💪 Use your own state manager.
- 🤓 Keeps URL clean by automatically removing default values.
- 😳 React Server Components ready.
- 🚀 Next.js integration.
- 🤯 Full TypeScript support.
- 😇 Integrations for SvelteKit/Solid.js coming soon.
- ⚡️ Accepts Zod schema for validation and parsing (WIP).

## Packages

| Package           | Latest Version                                                 |
| ----------------- | -------------------------------------------------------------- |
| `@sp-hooks/react` | ![react-npm](https://img.shields.io/npm/v/%40sp-hooks%2Freact) |
| `@sp-hooks/next`  | ![next-npm](https://img.shields.io/npm/v/%40sp-hooks%2Fnext)   |

## Getting Started

### Step 1 ⭐️

Before we start, don't forget to star this repo and follow [@bring-shrubbery](https://github.com/bring-shrubbery), thanks!

### Next.js

`pnpm add @sp-hooks/next`

### React.js

`pnpm add @sp-hooks/react`

## Examples

### Simple Next.js usage

Following example will render a button, which when clicked will toggle the button text between "hello" and "world". It will also update the search params to include the value, which means that after refreshing the page, the state will be preserved.

```tsx
import { useState } from "react";

import { useObserveAndStore } from "@sp-hooks/next";

const Component = () => {
  const [darkMode, setDarkMode] = useState(false);

  useObserveAndStore({ darkMode });

  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "🌚" : "☀️"}
    </button>
  );
};
```

## Roadmap

- [x] Store React state in URL Search Params.
- [x] Next.js integration.
- [ ] Default values (remove default values from URL).
- [ ] Remove falsy values.
- [ ] Preserve initial keys - keys are preserved in search params, if they were initially set.
- [ ] Array values.
- [ ] Zod validation.
  - [ ] Coercing into typed values.
  - [ ] Zod default values.
  - [ ] Zod optional values.
- [ ] Type-safe state from default values or when validation schema is provided.
- [ ] More validation tools (yup, etc.).
- [ ] Svelte/SvelteKit
- [ ] Solid

## Credits

This project is built and maintained by [Antoni](https://github.com/bring-shrubbery)

If you need help building anything that has a frontend, check out [Quassum](https://quassum.com)

## License

[Apache 2.0 License](./LICENSE)
