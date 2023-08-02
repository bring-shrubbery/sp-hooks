# useSearchParamsState

![approximate implementation preview](./assets/estimated-implementation.png)

## Features

- `useState` hook that syncs the state with url search params.
- Search params are validated using Zod, so only the validated properties and values are used.
- Removes search params set to default value, to avoid unnecessary query string length.
- Next.js support.
