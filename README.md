```ts
import { chunk } from "@ihaback/your-typescript-lib"
// Chunk an array into smaller arrays of a specified size
    const bigArray = Array.from({ length: 100 }, (v, i) => i);

    const chunkedArray = chunk(bigArray, 25);
```