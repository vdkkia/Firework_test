import React from "react";
import App from "./App";
import { render, fireEvent, cleanup, act } from "@testing-library/react";
import "@testing-library/jest-dom";

var initialValue;

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  jest.clearAllTimers();
  jest.useFakeTimers("modern");
});

test("initial UI is rendered as expected", () => {
  initialValue = 60;
  const renderApp = () => render(<App initial={initialValue} />);
  let { getByTestId } = renderApp();
  expect(getByTestId("app-title")).toHaveTextContent("Timer");
  expect(getByTestId("timer-value")).toHaveTextContent("60");
  expect(getByTestId("stop-button")).toHaveTextContent("Stop Timer");
});

test("inital value is set via props", async () => {
  initialValue = 120;
  const renderApp = () => render(<App initial={initialValue} />);
  let { getByTestId } = renderApp();
  expect(getByTestId("timer-value")).toHaveTextContent("120");

  // This doesn't pass
  // act(() => jest.advanceTimersByTime(10000));

  // But this one passes:
  for (let i = 0; i < 10; i++) {
    act(() => jest.advanceTimersByTime(1000));
  }
  expect(getByTestId("timer-value")).toHaveTextContent("110");
});

test("timer stops at 0", () => {
  initialValue = 5;
  const renderApp = () => render(<App initial={initialValue} />);
  let { getByTestId } = renderApp();
  expect(getByTestId("timer-value")).toHaveTextContent("5");

  // This doesn't pass
  // act(() => jest.advanceTimersByTime(10000));

  // But this one passes:
  for (let i = 0; i < 10; i++) {
    act(() => jest.advanceTimersByTime(1000));
  }

  expect(getByTestId("timer-value")).toHaveTextContent("0");
});

test("stop timer button stops the timer", () => {
  initialValue = 50;
  const renderApp = () => render(<App initial={initialValue} />);
  let { getByTestId } = renderApp();
  let stopTimerButton = getByTestId("stop-button");
  expect(getByTestId("timer-value")).toHaveTextContent("50");

  // This doesn't pass
  // act(() => jest.advanceTimersByTime(10000));

  // But this one passes:
  for (let i = 0; i < 10; i++) {
    act(() => jest.advanceTimersByTime(1000));
  }

  expect(getByTestId("timer-value")).toHaveTextContent("40");
  fireEvent.click(stopTimerButton);
  expect(getByTestId("timer-value")).toHaveTextContent("40");

  // This doesn't pass
  // act(() => jest.advanceTimersByTime(10000));

  // But this one passes:
  for (let i = 0; i < 10; i++) {
    act(() => jest.advanceTimersByTime(1000));
  }

  expect(getByTestId("timer-value")).toHaveTextContent("40");
});
