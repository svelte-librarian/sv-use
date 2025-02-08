---
category: State
---

# defaultState

A reactive state that falls back to `defaultValue` if set to `null` or `undefined`.

## Usage

> [!NOTE]
> Although the `current` property is typed as nullable, it will never return a nullable value.
>
> This is to ensure that you can set a nullable value when changing the state without TS complaining.

```svelte
<script>
    import { defaultState } from "@sv-use/core";

    const message = defaultState("fallback message", "initial message");

    message.current = "Hello, World!";

    message.current = null; // message is now "fallback message"
</script>
```
