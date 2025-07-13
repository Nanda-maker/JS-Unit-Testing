import { vi, it, expect, describe } from "vitest";
import { getPriceInCurrency, getShippingInfo } from "../src/mocking";
import { getExchangeRate } from "../src/libs/currency";
import { getShippingQuote } from "../src/libs/shipping";

vi.mock("../src/libs/currency");
vi.mock("../src/libs/shipping");
describe("test suite", () => {
  it("test suite", () => {
    const greet = vi.fn();
    // greet.mockReturnValue("Hello, World!"); // for getting a value
    /// greet.mockResolvedValue("Hello, World!"); // for getting a promise
    greet.mockImplementation((name) => "hello " + name); // add logic or implementation to mock function
    //const result = greet();
    /// greet().then((result) => console.log(result)); // "Hello, World!"
    const result = greet("World");
    console.log(result); // "hello World"
    expect(greet).toHaveBeenCalled();
    expect(greet).toHaveBeenCalledTimes(1);
    expect(greet).toHaveBeenCalledWith("World");
  });
});

describe("test suite", () => {
  it("test case", () => {
    // create a mock for the following function

    const sendText = vi.fn();
    //sendText(message){}
    sendText.mockReturnValue("ok");

    // call the mock fucntion
    const result = sendText("message");
    // assert that the mock fucntion is called
    expect(sendText).toHaveBeenCalledWith("message");
    // assert that the result is 'ok'
    expect(result).toBe("ok");
  });
});

describe("getPriceInCurrency", () => {
  it("should return the price in the specified currency", () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5); // Mock the exchange rate to 1.5
    const price = getPriceInCurrency(100, "AUD");
    expect(price).toBe(150);
  });
});

describe("getShippingInfo", () => {
  it("should return shipping unavailable if no quote is returned", () => {
    vi.mocked(getShippingQuote).mockReturnValue(null); // Mock the shipping quote to be null
    const info = getShippingInfo("New York");
    expect(info).toMatch(/Unavailable/i);
  });
  it("should return shipping cost and estimated days if quote is available", () => {
    vi.mocked(getShippingQuote).mockReturnValue({ cost: 50, estimatedDays: 5 });
    const info = getShippingInfo("Los Angeles");
    expect(info).toMatch("$50");
    expect(info).toMatch(/5 days/i);
    expect(info).toMatch(/Shipping cost: \$50 \(5 days\)/i);
  });
});
