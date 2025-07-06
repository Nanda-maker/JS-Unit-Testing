import {
  it,
  expect,
  describe,
  beforeEach,
  beforeAll,
  afterEach,
  afterAll,
} from "vitest";
import {
  calculateDiscount,
  canDrive,
  fetchData,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  validateUserInput,
} from "../src/core";

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

describe("isPriceInRange", () => {
  it.each([
    { scenario: "price < min", price: -10, result: false },
    { scenario: "price > max", price: 200, result: false },
    { scenario: "price = min", price: 0, result: true },
    { scenario: "price = max", price: 100, result: true },
    { scenario: "price within range", price: 50, result: true },
  ])("should return $result when $scenario", ({ price, result }) => {
    expect(isPriceInRange(price, 0, 100)).toBe(result);
  });

  // it("should return false when price is outside the range", () => {
  //   expect(isPriceInRange(-10, 0, 100)).toBe(false);
  //   expect(isPriceInRange(200, 0, 100)).toBe(false);
  // });
  // it("should return true when price is equal to min or max", () => {
  //   expect(isPriceInRange(0, 0, 100)).toBe(true);
  //   expect(isPriceInRange(100, 0, 100)).toBe(true);
  // });
  // it("should return true when price is within the range", () => {
  //   expect(isPriceInRange(50, 0, 100)).toBe(true);
  // });
});

describe("isValidUsername", () => {
  const minLength = 5;
  const maxLength = 15;
  it("should return false if username is too short", () => {
    expect(isValidUsername("a".repeat(minLength - 1))).toBe(false);
  });
  it("should return false if username is too long", () => {
    expect(isValidUsername("a".repeat(maxLength + 1))).toBe(false);
  });
  it("should return true if username is at the min or max", () => {
    expect(isValidUsername("a".repeat(minLength))).toBe(true);
    expect(isValidUsername("a".repeat(maxLength))).toBe(true);
  });
  it("should return true if username is within the length limits", () => {
    expect(isValidUsername("a".repeat(minLength + 1))).toBe(true);
    expect(isValidUsername("a".repeat(maxLength - 1))).toBe(true);
  });
  it("should return false for invalid input types", () => {
    expect(isValidUsername(123)).toBe(false);
    expect(isValidUsername(null)).toBe(false);
    expect(isValidUsername(undefined)).toBe(false);
  });
});

describe("canDrive", () => {
  // parameterized tests
  // using vitest's it.each for parameterized tests
  // this allows us to run the same test with different inputs
  it.each([
    { age: 15, country: "US", result: false },
    { age: 16, country: "US", result: true },
    { age: 17, country: "US", result: true },
    { age: 16, country: "UK", result: false },
    { age: 17, country: "UK", result: true },
    { age: 18, country: "UK", result: true },
  ])(
    "should return $result for age $age in country $country",
    ({ age, country, result }) => {
      expect(canDrive(age, country)).toBe(result);
    }
  );

  // it("should return error for invalid country code", () => {
  //   expect(canDrive(20, "FR")).toBe(/invalid/i);
  // });
  // it("should return false for underage in US", () => {
  //   expect(canDrive(15, "US")).toBe(false);
  // });
  // it("should return true for min age in US", () => {
  //   expect(canDrive(16, "US")).toBe(true);
  // });
  // it("should return true for eligible age in US", () => {
  //   expect(canDrive(17, "US")).toBe(true);
  // });
});
describe("fetchData", () => {
  it("should return a promise that resolves to an array", async () => {
    try {
      const result = await fetchData();
      // expect(Array.isArray(result)).toBe(true);
      //  expect(result.length).toBeGreaterThan(0);
    } catch (error) {
      expect(error).toHaveProperty("reason");
      expect(error.reason).toMatch(/network/i);
    }
  });
});

describe("test suite", () => {
  beforeAll(() => {
    console.log("beforeAll called");
  });
  beforeEach(() => {
    console.log("beforeEach called");
  });
  afterEach(() => {
    console.log("afterEach called");
  });
  afterAll(() => {
    console.log("afterAll called");
  });
  it("test", () => {
    expect(true).toBe(true);
  });
  it("test", () => {
    expect(true).toBe(true);
  });
});
