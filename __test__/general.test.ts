import { expect, test } from "vitest";
import { JSONE } from "../src/index.js";

test("pojo", () => {
	const x = {
		a: 1,
		b: "2",
		c: null,
		d: ["a", ["b1", "b2"]],
	};

	expect(JSONE.stringify(x)).toBe('{"a":1,"b":"2","c":null,"d":["a",["b1","b2"]]}');
});

test("nonpojo", () => {
	const x = {
		a: 1,
		b: "b",
		c: null,
		d: ["a", ["b1", "b2"]],
		e: undefined,
	};

	expect(JSONE.stringify(x)).toBe('{"a":1,"b":"b","c":null,"d":["a",["b1","b2"]]}');
});

test("BigInt", () => {
	const x = BigInt("1");

	expect(JSONE.stringify(x)).toBe('["BigInt","1"]');
	expect(JSONE.stringify([x, x])).toBe('[["BigInt","1"],["BigInt","1"]]');
	expect(
		JSONE.stringify({
			a: x,
			b: [x, x],
		})
	).toBe('{"a":["BigInt","1"],"b":[["BigInt","1"],["BigInt","1"]]}');

	expect(JSONE.parse('["BigInt","1"]')).toEqual(x);
	expect(JSONE.parse('[["BigInt","1"],["BigInt","1"]]')).toEqual([x, x]);
	expect(JSONE.parse('{"a":["BigInt","1"],"b":[["BigInt","1"],["BigInt","1"]]}')).toEqual({
		a: x,
		b: [x, x],
	});
});

test("Date", () => {
	const x = new Date("2001-02-03T01:02:03.004Z");

	const a = '["Date","2001-02-03T01:02:03.004Z"]';
	const b = '[["Date","2001-02-03T01:02:03.004Z"],["Date","2001-02-03T01:02:03.004Z"]]';
	const c =
		'{"a":["Date","2001-02-03T01:02:03.004Z"],"b":[["Date","2001-02-03T01:02:03.004Z"],["Date","2001-02-03T01:02:03.004Z"]]}';

	expect(JSONE.stringify(x)).toBe(a);
	expect(JSONE.stringify([x, x])).toBe(b);
	expect(JSONE.stringify({ a: x, b: [x, x] })).toBe(c);

	expect(JSONE.parse(a)).toEqual(x);
	expect(JSONE.parse(b)).toEqual([x, x]);
	expect(JSONE.parse(c)).toEqual({
		a: x,
		b: [x, x],
	});
});

test("Uint8Array", () => {
	const x = new Uint8Array([0, 255, 3, 22, 0]);
	//const buf = Buffer.from(x.buffer);
	const buf = new Uint8Array(x.buffer);

	const a = '["Base64","AP8DFgA"]';
	const b = '[["Base64","AP8DFgA"],["Base64","AP8DFgA"]]';
	const c = '{"a":["Base64","AP8DFgA"],"b":[["Base64","AP8DFgA"],["Base64","AP8DFgA"]]}';

	expect(JSONE.stringify(x)).toBe(a);
	expect(JSONE.stringify([x, x])).toBe(b);
	expect(JSONE.stringify({ a: x, b: [x, x] })).toBe(c);

	expect(JSONE.parse(a)).toEqual(buf);
	expect(JSONE.parse(b)).toEqual([buf, buf]);
	expect(JSONE.parse(c)).toEqual({ a: buf, b: [buf, buf] });
});
test("Uint16Array", () => {
	const x = new Uint16Array([0, 1255, 3, 22, 0]);
	//const buf = Buffer.from(x.buffer);
	const buf = new Uint8Array(x.buffer);

	const a = '["Base64","AADnBAMAFgAAAA"]';
	const b = '[["Base64","AADnBAMAFgAAAA"],["Base64","AADnBAMAFgAAAA"]]';
	const c = '{"a":["Base64","AADnBAMAFgAAAA"],"b":[["Base64","AADnBAMAFgAAAA"],["Base64","AADnBAMAFgAAAA"]]}';

	expect(JSONE.stringify(x)).toBe(a);
	expect(JSONE.stringify([x, x])).toBe(b);
	expect(JSONE.stringify({ a: x, b: [x, x] })).toBe(c);

	expect(JSONE.parse(a)).toEqual(buf);
	expect(JSONE.parse(b)).toEqual([buf, buf]);
	expect(JSONE.parse(c)).toEqual({ a: buf, b: [buf, buf] });
});

test("Float32Array", () => {
	const x = new Float32Array([0, 255.23, 3, 22, 0]);
	//const buf = Buffer.from(x.buffer);
	const buf = new Uint8Array(x.buffer);

	const a = '["Base64","AAAAAOE6f0MAAEBAAACwQQAAAAA"]';
	const b = '[["Base64","AAAAAOE6f0MAAEBAAACwQQAAAAA"],["Base64","AAAAAOE6f0MAAEBAAACwQQAAAAA"]]';
	const c =
		'{"a":["Base64","AAAAAOE6f0MAAEBAAACwQQAAAAA"],"b":[["Base64","AAAAAOE6f0MAAEBAAACwQQAAAAA"],["Base64","AAAAAOE6f0MAAEBAAACwQQAAAAA"]]}';

	expect(JSONE.stringify(x)).toBe(a);
	expect(JSONE.stringify([x, x])).toBe(b);
	expect(JSONE.stringify({ a: x, b: [x, x] })).toBe(c);

	expect(JSONE.parse(a)).toEqual(buf);
	expect(JSONE.parse(b)).toEqual([buf, buf]);
	expect(JSONE.parse(c)).toEqual({ a: buf, b: [buf, buf] });
});

test("parse trickery", () => {
	const x = new Date("2001-02-03T01:02:03.004Z");

	const a = '["Date","2001-02-03T01:02:03.004Z","nope"]';
	const b = '[["Date","2001-02-03T01:02:03.004Z"],["nope","Date","2001-02-03T01:02:03.004Z"]]';
	const c =
		'{"a":["Date","2001-02-03T01:02:03.004Z"],"b":[["Date","2001-02-03T01:02:03.004Z"],["Date","2001-02-03T01:02:03.004Z"]]}';

	expect(JSONE.parse(a)).toEqual(["Date", "2001-02-03T01:02:03.004Z", "nope"]);
	expect(JSONE.parse(b)).toEqual([x, ["nope", "Date", "2001-02-03T01:02:03.004Z"]]);
	expect(JSONE.parse(c)).toEqual({
		a: x,
		b: [x, x],
	});
});

test("stringify trickery", () => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const x = Object.create(null);

	expect(JSONE.stringify(x)).toBe("{}");
});

//this breaks
//test("parse trickery 2", () => {
//	const d = '["Date","hello"]';
//	expect(JSONE.parse(d)).toEqual(["Date", "hello"]);
//});
