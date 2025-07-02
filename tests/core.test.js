import { it, expect, describe } from "vitest";
import { calculateDiscount, getCoupons, validateUserInput } from "../src/core";

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

describe("validateUserInput", () => {
  it("should return success if given valid inputs", () => {
    expect(validateUserInput("nanda", 40)).toMatch(/successful/i);
  });
  it("should return error for invalid username", () => {
    expect(validateUserInput("na", 40)).toMatch(/invalid username/i);
  });
  it("should return error for invalid less age", () => {
    expect(validateUserInput("nanda", 17)).toMatch(/invalid age/i);
  });
  it("should return error for invalid not a number age", () => {
    expect(validateUserInput("nanda", "17")).toMatch(/invalid age/i);
  });
  it("should return error if the age greater than 100", () => {
    expect(validateUserInput("nanda", 101)).toMatch(/invalid age/i);
  });
  it("should return an error if username is longer than 256 characters", () => {
    expect(validateUserInput("a".repeat(256), 40)).toMatch(/invalid username/i);
  });
  it("should return an error if both username and age are invalid", () => {
    expect(validateUserInput("", 0)).toMatch(/invalid username, invalid age/i);
  });
});
