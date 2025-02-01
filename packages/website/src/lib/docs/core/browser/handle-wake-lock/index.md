# handleWakeLock

Provides a way to prevent devices from dimming or locking the screen when an application needs to keep running.

You may read more about the [Screen Wake Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API).

## Usage

> [!IMPORTANT]
> Since it uses `$effect` internally, you must either call `handleWakeLock` in
> the component initialization lifecycle or call it inside `$effect.root`.

```svelte
<script>
	import { handleWakeLock } from '@sv-use/core';

	const wakeLock = handleWakeLock();

	// When you need to prevent the screen from locking or dimming
    await wakeLock.request('screen');

    // ...

    // When you don't need it anymore
    await wakeLock.release();
</script>
```
