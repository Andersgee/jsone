import { expect, test } from "vitest";
import { JSONE } from "../src/index.js";

test("Date", () => {
	const x = new Date("2001-02-03T01:02:03.004Z");
	expect(JSONE.stringify(x)).toEqual(`["Date","2001-02-03T01:02:03.004Z"]`);
});

test("BigInt", () => {
	const x = BigInt("1");
	expect(JSONE.stringify(x)).toEqual(`["BigInt","1"]`);
});

test("Uint8Array", () => {
	const x = new Uint8Array([0, 255, 3, 22, 0]);
	expect(JSONE.stringify(x)).toEqual(`["Base64","AP8DFgA"]`);
});

test("Uint16Array", () => {
	const x = new Uint16Array([0, 1255, 3, 22, 0]);
	expect(JSONE.stringify(x)).toEqual(`["Base64","AADnBAMAFgAAAA"]`);
});

test("Float32Array", () => {
	const x = new Float32Array([0, 4.1, 3, 22, 0]);
	expect(JSONE.stringify(x)).toEqual(`["Base64","AAAAADMzg0AAAEBAAACwQQAAAAA"]`);
});

test("Float64Array", () => {
	const x = new Float64Array([0, 4.1, 3, 22, 0]);
	expect(JSONE.stringify(x)).toEqual(`["Base64","AAAAAAAAAABmZmZmZmYQQAAAAAAAAAhAAAAAAAAANkAAAAAAAAAAAA"]`);
});
