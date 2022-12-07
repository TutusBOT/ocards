import { it, describe, expect } from "vitest";
import useSearch from "./useSearch";

describe("useSearch", () => {
	it("returns all elements with empty value", () => {
		expect(
			useSearch(
				[
					{ name: "Adam", age: 10, lang: "en" },
					{ name: "Bartek", age: 19, lang: "pl" },
				],
				""
			)
		).toStrictEqual([
			{ name: "Adam", age: 10, lang: "en" },
			{ name: "Bartek", age: 19, lang: "pl" },
		]);
	});
	it("returns searched elements with searched value", () => {
		expect(
			useSearch(
				[
					{ name: "Adam", age: 10, lang: "en" },
					{ name: "Bartek", age: 19, lang: "pl" },
				],
				"Adam"
			)
		).toStrictEqual([{ name: "Adam", age: 10, lang: "en" }]);
	});
	it("returns empty array if no object value matches provided value", () => {
		expect(
			useSearch(
				[
					{ name: "Adam", age: 10, lang: "en" },
					{ name: "Bartek", age: 19, lang: "pl" },
				],
				"John"
			)
		).toStrictEqual([]);
	});
	it("returns elements with values that match provided value with exception to values assigned to excluded keys", () => {
		expect(
			useSearch(
				[
					{ name: "Adam", age: 10, lang: "en" },
					{ name: "Bartek", age: 19, lang: "pl" },
					{ name: "Eden", age: 15, lang: "de" },
				],
				"E",
				["lang"]
			)
		).toStrictEqual([{ name: "Eden", age: 15, lang: "de" }]);
	});
});
