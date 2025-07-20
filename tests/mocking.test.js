import { vi, it, expect, describe } from 'vitest';
import {
  getPriceInCurrency,
  getShippingInfo,
  renderPage,
  signUp,
  submitOrder,
} from '../src/mocking';
import { getExchangeRate } from '../src/libs/currency';
import { getShippingQuote } from '../src/libs/shipping';
import { trackPageView } from '../src/libs/analytics';
import { charge } from '../src/libs/payment';
import { sendEmail } from '../src/libs/email';

vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');
vi.mock('../src/libs/analytics');
vi.mock('../src/libs/payment.js');
vi.mock('../src/libs/email.js', async (importOriginal) => {
  const importModule = await importOriginal();
  return {
    ...importModule,
    sendEmail: vi.fn(),
  };
});
describe('test suite', () => {
  it('test suite', () => {
    const greet = vi.fn();
    // greet.mockReturnValue("Hello, World!"); // for getting a value
    /// greet.mockResolvedValue("Hello, World!"); // for getting a promise
    greet.mockImplementation((name) => 'hello ' + name); // add logic or implementation to mock function
    //const result = greet();
    /// greet().then((result) => console.log(result)); // "Hello, World!"
    const result = greet('World');
    console.log(result); // "hello World"
    expect(greet).toHaveBeenCalled();
    expect(greet).toHaveBeenCalledTimes(1);
    expect(greet).toHaveBeenCalledWith('World');
  });
});

describe('test suite', () => {
  it('test case', () => {
    // create a mock for the following function

    const sendText = vi.fn();
    //sendText(message){}
    sendText.mockReturnValue('ok');

    // call the mock fucntion
    const result = sendText('message');
    // assert that the mock fucntion is called
    expect(sendText).toHaveBeenCalledWith('message');
    // assert that the result is 'ok'
    expect(result).toBe('ok');
  });
});

describe('getPriceInCurrency', () => {
  it('should return the price in the specified currency', () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5); // Mock the exchange rate to 1.5
    const price = getPriceInCurrency(100, 'AUD');
    expect(price).toBe(150);
  });
});

describe('getShippingInfo', () => {
  it('should return shipping unavailable if no quote is returned', () => {
    vi.mocked(getShippingQuote).mockReturnValue(null); // Mock the shipping quote to be null
    const info = getShippingInfo('New York');
    expect(info).toMatch(/Unavailable/i);
  });
  it('should return shipping cost and estimated days if quote is available', () => {
    vi.mocked(getShippingQuote).mockReturnValue({ cost: 50, estimatedDays: 5 });
    const info = getShippingInfo('Los Angeles');
    expect(info).toMatch('$50');
    expect(info).toMatch(/5 days/i);
    expect(info).toMatch(/Shipping cost: \$50 \(5 days\)/i);
  });
});

describe('renderPage', () => {
  it('should return correct content', async () => {
    const result = await renderPage();
    expect(result).toMatch(/content/i);
  });
  it('should call analytics tracking', async () => {
    await renderPage();
    expect(trackPageView).toHaveBeenCalledWith('/home');
  });
});

describe('submitOrder', () => {
  const order = { totalAmount: 100 };
  const creditCard = { creditCardNumber: '1234' };
  it('should charge the customer', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'success' });
    await submitOrder(order, creditCard);
    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
  });
  it('should return success if payment is successful', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'success' });
    const result = await submitOrder(order, creditCard);
    expect(result).toEqual({ success: true });
  });
  it('should return success if payment is successful', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'failed' });
    const result = await submitOrder(order, creditCard);
    expect(result).toEqual({ success: false, error: 'payment_error' });
  });
});

describe('signUp', () => {
  const email = 'email@example.com';
  it('should return false for invalid email', async () => {
    const result = await signUp('invalid-email');
    expect(result).toBe(false);
  });
  it('should return true for valid email', async () => {
    const result = await signUp(email);
    expect(result).toBe(true);
  });
  it('should send a welcome email for valid email', async () => {
    expect(sendEmail).toHaveBeenCalled();
    const args = vi.mocked(sendEmail).mock.calls[0];
    expect(args[0]).toBe(email);
    expect(args[1]).toMatch(/welcome/i);
  });
});
