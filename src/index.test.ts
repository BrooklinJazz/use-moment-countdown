import { renderHook, act } from "@testing-library/react-hooks";
import { useCountdown, CountdownConfig, CountdownInput } from "./";
import React from "react";

describe("useCountdown _ initial time", () => {
  test("time _ no input", () => {
    const { result } = renderHook(() => useCountdown())

    expect(result.current.time.format("mm:ss")).toBe("00:00");
  });

  test("time _ 1 second input", () => {
    const { result } = renderHook(() => useCountdown({ s: 1 }))


    expect(result.current.time.format("mm:ss")).toBe("00:01");
  });

  test("time _ 1 minute input", () => {
    const { result } = renderHook(() => useCountdown({ m: 1 }))


    expect(result.current.time.format("mm:ss")).toBe("01:00");
  });

  test("time _ 1 hour input", () => {
    const { result } = renderHook(() => useCountdown({ h: 1 }))


    expect(result.current.time.format("hh:mm")).toBe("01:00");
  });

  test("time _ 1 hour _ 1 minute _ 1 second", () => {
    const { result } = renderHook(() => useCountdown({ h: 1, m: 1, s: 1 }))

    act(() => {});

    expect(result.current.time.format("hh:mm:ss")).toBe("01:01:01");
  });
});


describe("useCountdown _ timer", () => {
  jest.useFakeTimers();
  test("timer _ 1 minute _ after 1 second", () => {
    const { result} = renderHook(() => useCountdown({m: 1}))
    act(() => {
      result.current.start()
      jest.runOnlyPendingTimers();
    })
    expect(result.current.time.seconds()).toEqual(59)
  });
  test("timer _ 1 minute _ after 1 minute", () => {
    const { result} = renderHook(() => useCountdown({m: 1}))
    act(() => {
      result.current.start()
      jest.advanceTimersByTime(60 * 1000);
    })
    expect(result.current.time.seconds()).toEqual(0)
  });

  test("timer _ 1 minute _ after 1 minute 10 seconds", () => {
    const { result} = renderHook(() => useCountdown({m: 1}))
    act(() => {
      result.current.start()
      jest.advanceTimersByTime((60 + 10) * 1000);
    })
    expect(result.current.time.seconds()).toEqual(0)
  });

  test("timer _ onDone triggers when timer ends", () => {
    const fakeFn = jest.fn()
    const { result} = renderHook(() => useCountdown({s: 1}, {onDone: fakeFn}))
    act(() => {
      result.current.start()
      jest.advanceTimersByTime(1000);
    })
    expect(fakeFn).toHaveBeenCalledTimes(1)
  });
});