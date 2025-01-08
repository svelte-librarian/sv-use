# SvelteUse

> [!WARNING]
> This is still an experimental library and not suited for production because breaking changes can happen at any time, hence the usage of pre-1.0 versioning.

A collection of Svelte 5 utilities.

## Features

-   Feature Rich (not exactly *yet*, but we're getting there)
-   Complete documentation and demos
-   Strongly-typed with Typescript
-   Supports Svelte and SvelteKit (even with SSR enabled)

## Installation

```bash
npm install @sv-use/core
```

For more information and documentation, see the [official website](https://svelte-librarian.github.io/sv-use).

## FAQ

1. Aren't there other libraries that do this already ?  
   Yes there are. However, most of the libraries haven't transitioned to Svelte 5.
1. Why use this one instead of [`svecosystem/runed`](https://github.com/svecosystem/runed) (or other libraries) ?
   1. I wanted to make a library that had a lot of utilities to the level of [vueuse/vueuse](https://github.com/vueuse/vueuse) and/or [streamich/react-use](https://github.com/streamich/react-use). It's not there yet, but it's slowly growing.
   1. I'm not a big fan of using the `use` prefix *everywhere*, especially when other verbs could be more descriptive.
1. When can I expect this project to be stable ?
   1. Though it is an arbitrary number, I want to reach at least 40 utilities.
   1. I'd like to reach a higher coverage percentage. Or at least have some tests *per* utility, which is not yet the case. 

## Acknowledgements

Though it's not a 1:1 port, I heavily took inspiration from these libraries to adapt the library for the Svelte ecosystem :

-   [vueuse/vueuse](https://github.com/vueuse/vueuse)
-   [streamich/react-use](https://github.com/streamich/react-use)

And a special thanks to the [`svecosystem/runed`](https://github.com/svecosystem/runed) library for certain patterns and utilities.
