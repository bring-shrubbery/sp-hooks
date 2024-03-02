---
title: Introduction
description: Why and how to use `@sp-hooks` packages.
---

## The problem

With the rise of server-sided state management solutions, we find ourselves in a situation where we not only need to manage state on the client side, but also sync it with the server.

Here's a situation: you need to implement an e-commerce browse page, where you can filter/sort/paginate products. You store user's filters in a regular React `useState` hook, then make a client sided request to get the products.

Now, there's a little problem, you get a number of delays, because of all the round trips to the server. React Server Components solve this problem by removing as many of the round trips as possible, leaving you with essentially two things: API call from your frontend's backend to the API backend, and the time it takes to stream in HTML into your React application.

Here lies the state synchronisation problem. When prerendering the page on the server side, there's no way to access state of the `useState` hook. The best way to solve this at the moment is through the use of URL search params, which can be accessed on the server side, while each route getting its own state.

This means that for the route like `/products?filter=price&sort=asc&page=2`, you can get the state of the filters, sort and page, and use it to render the page on the server side.

## The solution

In production, the code to manage the state of the URL search params becomes unmanageable quite fast. You need to parse state from the URL, update the state, and then update the URL again. This is where `@sp-hooks` come in.

`@sp-hooks` packages are a set of hooks that simplify management of state in a way that is both client and server side friendly. They are designed to be used with Next.js, but can be used with any React application.
