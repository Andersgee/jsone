import { expect, test } from "vitest";
import { JSONE } from "../src/index.js";

test("Date", () => {
	const x = new Date("2001-02-03T01:02:03.004Z");
	expect(JSONE.parse(`["Date", "2001-02-03T01:02:03.004Z"]`)).toEqual(x);
});

test("BigInt", () => {
	const x = BigInt("1");
	expect(JSONE.parse(`["BigInt", "1"]`)).toEqual(x);
});

test("Uint8Array", () => {
	const x = new Uint8Array([0, 255, 3, 22, 0]);
	//const b = Buffer.from(x.buffer);
	expect(JSONE.parse(`["Base64", "AP8DFgA"]`)).toEqual(x);
});

test("Uint16Array", () => {
	const x = new Uint16Array([0, 1255, 3, 22, 0]);
	const b = new Uint8Array(x.buffer);
	expect(JSONE.parse(`["Base64", "AADnBAMAFgAAAA"]`)).toEqual(b);
});

test("Float32Array", () => {
	const x = new Float32Array([0, 4.1, 3, 22, 0]);
	const b = new Uint8Array(x.buffer);
	expect(JSONE.parse(`["Base64", "AAAAADMzg0AAAEBAAACwQQAAAAA"]`)).toEqual(b);
});

test("Float64Array", () => {
	const x = new Float64Array([0, 4.1, 3, 22, 0]);
	const b = new Uint8Array(x.buffer);
	expect(JSONE.parse(`["Base64", "AAAAAAAAAABmZmZmZmYQQAAAAAAAAAhAAAAAAAAANkAAAAAAAAAAAA"]`)).toEqual(b);
});
