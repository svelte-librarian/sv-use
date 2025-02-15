---
category: browser
---

# createShare

Invokes the native sharing mechanism of the device to share data such as text,
URLs, or files.

The available share targets depend on the device, but might include the
clipboard, contacts and email applications, websites, Bluetooth, etc.

## Usage

> [!IMPORTANT]
> To prevent abuse, it must be triggered off a UI event like a button click and
> cannot be launched at arbitrary points by a script.

```js
import { createShare } from '@sv-use/core';

const share = createShare({
    title: 'SvelteUse',
    text: 'SvelteUse is awesome !',
    url: 'https://sv-use.org'
});
```
