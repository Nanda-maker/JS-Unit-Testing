import { it, expect, describe } from "vitest";
import { calculateDiscount, getCoupons } from "../src/core";

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
    expect(result).toMatch(/ok/i); // this will pass even if the string changes
    // this will pass even if the string contains "ok" anywhere
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
    expect(result).toEqual([1, 2, 3]);
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
    // tight (too specific) -- this is not a good practice -- order changes will fail the test
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
    // to check if the result is an array not an object
    expect(Array.isArray(coupon)).toBe(true);
    expect(coupon.length).toBeGreaterThan(0);
  });
  it("should return an array with a valid coupon code", () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("code");
      expect(typeof coupon.code).toBe("string");
      expect(coupon.code).toBeTruthy(); // not an empty string
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

describe("calculateDiscount", () => {
  it("should return a discounted price for valid inputs", () => {
    const price = 100;
    const discountCode = "SAVE20";
    const result = calculateDiscount(price, discountCode);
    expect(result).toBe(80);
  });

  it("should return 'Invalid price' for non-number price", () => {
    const result = calculateDiscount("100", "SAVE20");
    // expect(result).toBe("Invalid price");
    expect(result).toMatch(/invalid/i);
  });
  it("should handle negative price", () => {
    expect(calculateDiscount(-100, "SAVE20")).toBe("Invalid price");
  });

  it("should return 'Invalid discount code' for invalid code", () => {
    expect(calculateDiscount(100, "INVALIDCODE")).toBe(100); // no discount applied
  });
  it("should handle the non-string discount code", () => {
    expect(calculateDiscount(100, 100)).toMatch(/invalid/i);
  });
});
