# whenever

Shorthand for running a callback when a dependency is truthy.

It can also take an array of dependencies, in which case it will run if all
dependencies are truthy.

## Usage

```svelte
<script>
    import { whenever } from '@sv-use/core';

    let isActive = $state(false);

    whenever(() => isActive, () => {
        console.log('Active now !');
    });
</script>
```
