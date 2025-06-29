import { it, expect, describe } from "vitest";
import { getCoupons } from "../src/core";

describe("test", () => {
  it("test", () => {
    const result = "the result is ok";
    // loose (too general) -- this is not a good practice
    expect(result).toBeDefined();
    // tight (too specific) -- this is not a good practice
    expect(result).toBe("the result is ok");
    // better assertion
    expect(result).toEqual("the result is ok");
    // even better assertion
    expect(result).toMatch(/ok$/);
    // best assertion
    expect(result).toContain("result");
  });
});

describe("testArray", () => {
  it("array", () => {
    const result = [1, 2, 3];
    // loose (too general) -- this is not a good practice- even pass even empty array
    expect(result).toBeDefined();
    // tight (too specific) -- this is not a good practice -- order changes will fail the test
    expect(result).toStrictEqual([1, 2, 3]);
    // better assertion
    expect(result).toEqual(expect.arrayContaining([1, 2, 3])); // this will pass even if the order changes
    // even better assertion
    // expect(result).toMatch([3]);
    // best assertion
    expect(result.length).toBeGreaterThan(0);
  });
});

describe("testObject", () => {
  it("object", () => {
    const result = { name: "John", age: 30 };
    // loose (too general) -- this is not a good practice
    expect(result).toBeDefined();
    // tight (too specific) -- this is not a good practice
    expect(result).toMatchObject({ name: "John" });
    // better assertion
    expect(result).toEqual(expect.objectContaining({ name: "John", age: 30 }));
    // even better assertion
    expect(result.name).toBe("John");
    expect(typeof result.name).toBe("string");
    // best assertion
    expect(result).toHaveProperty("age", 30);
  });
});
describe("getCoupons", () => {
  it("should return an array of coupons", () => {
    const coupon = getCoupons();
    expect(Array.isArray(coupon)).toBe(true);
    expect(coupon.length).toBeGreaterThan(0);
  });
  it("should return an array with a valid coupon code", () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("code");
      expect(typeof coupon.code).toBe("string");
      expect(coupon.code).toBeTruthy();
    });
  });
  it("should return an array with a valid discount", () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("discount");
      expect(typeof coupon.discount).toBe("number");
      expect(coupon.discount).toBeGreaterThanOrEqual(0);
      expect(coupon.discount).toBeLessThanOrEqual(1);
    });
  });
});
