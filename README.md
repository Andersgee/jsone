# jsone

- JSON stringify/parse that can handle Date, BigInt and TypedArrays.

- zero dependencies, works in the browser aswell.

## example usage

```sh
npm install @andersgee/jsone
```

```js
import { JSONE } from "@andersgee/jsone";

const str = JSONE.stringify({
	myString: "hello",
	myNumber: 2,
	myBigint: 8n,
	myDate: new Date(),
	myTypedarray: new Uint8Array([1, 2, 3, 4]),
});

console.log(JSONE.parse(str));
//{
//  myString: 'hello',
//  myNumber: 2,
//  myBigint: 8n,
//  myDate: 2024-07-14T16:28:13.934Z,
//  myTypedarray: Uint8Array(4) [ 1, 2, 3, 4 ]
//}
```
