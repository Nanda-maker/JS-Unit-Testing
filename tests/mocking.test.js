import { vi, it, expect, describe } from "vitest";

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
