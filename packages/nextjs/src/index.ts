// import {
//   useSearchParamsState as useSearchParamsStateReact,
//   type SetStateType,
//   type UseSearchParamsStateOptions,
// } from "@use-search-params-state/react";
// import { useRouter, usePathname } from "next/navigation";
// import type { ReadonlyURLSearchParams } from "next/navigation";

// import type { ZodObject, ZodRawShape, infer as ZodInfer } from "zod";

// export function useSearchParamsState<
//   S extends ZodObject<R>,
//   R extends ZodRawShape,
//   T extends ZodInfer<S>
// >(
//   searchParams: URLSearchParams | ReadonlyURLSearchParams,
//   schema: S,
//   options?: UseSearchParamsStateOptions
// ): [T, SetStateType<S, R>] {
//   const router = useRouter();
//   const pathname = usePathname();

//   const handleSaveSearchParams = (newSearchParams?: URLSearchParams) => {
//     const newPath = pathname + "?" + newSearchParams?.toString();
//     router.replace(newPath, { forceOptimisticNavigation: true });
//   };

//   const [state, setState] = useSearchParamsStateReact<S, R, T>(
//     {
//       saveSearchParams: handleSaveSearchParams,
//       searchParams,
//       schema,
//     },
//     options
//   );

//   return [state, setState];
// }

export {};
