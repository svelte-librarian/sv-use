---
category: browser
---

# createVibration

Most modern mobile devices include vibration hardware, which lets software code
provide physical feedback to the user by causing the device to shake.

The Vibration API offers Web apps the ability to access this hardware, if it
exists, and does nothing if the device doesn't support it.

## Usage

Vibration is described as a pattern of on-off pulses, which may be of varying
lengths.

The pattern may consist of either a single integer, describing the number of
milliseconds to vibrate, or an array of integers describing a pattern of
vibrations and pauses.

```js
import { createVibration } from '@sv-use/core';

// 1. Vibrates the device for 300ms
// 2. Pauses for 100ms
// 3. Vibrates the device again for 200ms
const vibration = createVibration({ pattern: [300, 100, 200] });

// Start the vibration
// It will automatically stop when the pattern is completed
vibration.vibrate();

// Or you can manually stop it
vibration.stop();
```
