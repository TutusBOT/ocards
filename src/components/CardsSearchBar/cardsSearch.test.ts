import { filterCards } from "./CardsSearchBar";
import { describe, expect, it } from "vitest";

describe("filterCards", () => {
	it("returns all cards with empty string as value", () => {
		expect(
			filterCards(
				[
					{ front: "test1", back: "test" },
					{ front: "xd", back: "jd" },
				],
				""
			)
		).toStrictEqual([
			{ front: "test1", back: "test" },
			{ front: "xd", back: "jd" },
		]);
	});
	it("return cards which front or back property starts with value", () => {
		expect(
			filterCards(
				[
					{ front: "test1", back: "test" },
					{ front: "xd", back: "jd" },
				],
				"tes"
			)
		).toStrictEqual([{ front: "test1", back: "test" }]);
	});
});
