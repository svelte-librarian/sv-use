---
category: sensors
---

# createSpeechRecognition

Reactive controller interface for the recognition service.

## Usage

> [!IMPORTANT]
> You can only call it during component initialization.

```ts
import { createSpeechRecognition } from '@sv-use/core';

const speech = createSpeechRecognition({
    lang: 'en',
    interimResults: false,
    onResult(transcript) {
        console.log("Transcript received", transcript);
    },
    onError(error) {
        console.log('Oops, something went wrong', error);
    }
});

if (speech.isSupported) {
    speech.start();
}
```
