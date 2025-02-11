---
category: sensors
---

# onSwipe

Reactive swipe detection for mobile devices using [TouchEvents](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent).

## Usage

```js
import { onSwipe } from '@sv-use/core';

let el = $state();
const swipe = onSwipe(() => el);
```
