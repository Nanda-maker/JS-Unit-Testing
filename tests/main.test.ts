import { calculateDiscount } from '../src/main';
import { it, expect, describe } from 'vitest';
describe('calculateDiscount', () => {
  it('should return a discounted price for valid inputs', () => {
    const price = 100;
    const discountCode = 'SAVE20';
    const result = calculateDiscount(price, discountCode);
    expect(result).toBe(80);
  });
  // no need to write test case since it is cheked by typescript
  //   it("should return 'Invalid price' for non-number price", () => {
  //     const result = calculateDiscount('100', 'SAVE20');
  //     // expect(result).toBe("Invalid price");
  //     expect(result).toMatch(/invalid/i);
  //   });
  it('should handle negative price', () => {
    expect(calculateDiscount(-100, 'SAVE20')).toBe('Invalid price');
  });

  it("should return 'Invalid discount code' for invalid code", () => {
    expect(calculateDiscount(100, 'INVALIDCODE')).toBe(100); // no discount applied
  });
  //   it('should handle the non-string discount code', () => {
  //     expect(calculateDiscount(100, 100)).toMatch(/invalid/i);
  //   });
});
