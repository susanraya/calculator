/**
 * Pure calculator engine.
 *
 * No React, no DOM, no network, no storage. `press(state, key)` is a plain
 * reducer: given a state and a key, it returns the next state. `formatDisplay`
 * turns that state into the string a screen should show.
 *
 * All arithmetic goes through decimal.js so repeating-binary artefacts (the
 * classic 0.1 + 0.2 !== 0.3) never reach the display. Results are rounded to
 * PRECISION significant figures before they are stored back into state.
 */
import Decimal from "decimal.js";

export type Operator = "+" | "-" | "*" | "/";

export type Key =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "."
  | "+"
  | "-"
  | "*"
  | "/"
  | "%"
  | "="
  | "C"
  | "AC";

export interface CalcState {
  /** The raw string currently shown on the display / being typed. */
  entry: string;
  /** The stored left-hand operand of a pending operation, or null. */
  accumulator: string | null;
  /** The pending operator, or null when no operation is in progress. */
  operator: Operator | null;
  /** True when the next digit/decimal key should start a fresh entry. */
  overwrite: boolean;
  /** A user-facing error message, or null when the engine is healthy. */
  error: string | null;
}

export const DIVIDE_BY_ZERO_MESSAGE = "Cannot divide by zero";

const PRECISION = 12;

export const initialState: CalcState = Object.freeze({
  entry: "0",
  accumulator: null,
  operator: null,
  overwrite: true,
  error: null,
});

function isDigitKey(key: string): boolean {
  return /^[0-9]$/.test(key);
}

function isOperatorKey(key: string): key is Operator {
  return key === "+" || key === "-" || key === "*" || key === "/";
}

function toDecimal(value: string): Decimal {
  return new Decimal(value);
}

function formatNumber(value: Decimal): string {
  if (!value.isFinite()) return "0";
  return value.toSignificantDigits(PRECISION).toString();
}

function applyOperator(a: Decimal, operator: Operator, b: Decimal): Decimal {
  switch (operator) {
    case "+":
      return a.plus(b);
    case "-":
      return a.minus(b);
    case "*":
      return a.times(b);
    case "/":
      return a.div(b);
  }
}

export function press(state: CalcState, key: string): CalcState {
  if (key === "AC") {
    return { ...initialState };
  }

  if (key === "C") {
    return { ...state, entry: "0", overwrite: true, error: null };
  }

  if (state.error) {
    // Any other key is a no-op while an error is being held; only C/AC recover.
    return state;
  }

  if (isDigitKey(key)) {
    let entry: string;
    if (state.overwrite || state.entry === "0") {
      entry = key;
    } else {
      entry = state.entry + key;
    }
    return { ...state, entry, overwrite: false };
  }

  if (key === ".") {
    if (state.overwrite) {
      return { ...state, entry: "0.", overwrite: false };
    }
    if (state.entry.includes(".")) {
      return state;
    }
    return { ...state, entry: state.entry + ".", overwrite: false };
  }

  if (key === "%") {
    const current = toDecimal(state.entry);
    if (state.accumulator !== null && state.operator !== null) {
      const accumulator = toDecimal(state.accumulator);
      const result = accumulator.times(current).div(100);
      return { ...state, entry: formatNumber(result), overwrite: false };
    }
    const result = current.div(100);
    return { ...state, entry: formatNumber(result), overwrite: false };
  }

  if (isOperatorKey(key)) {
    if (state.accumulator === null) {
      return { ...state, accumulator: state.entry, operator: key, overwrite: true };
    }
    if (!state.overwrite) {
      const current = toDecimal(state.entry);
      if (state.operator === "/" && current.isZero()) {
        return { ...state, error: DIVIDE_BY_ZERO_MESSAGE };
      }
      const accumulator = toDecimal(state.accumulator);
      const result = applyOperator(accumulator, state.operator as Operator, current);
      const formatted = formatNumber(result);
      return {
        ...state,
        entry: formatted,
        accumulator: formatted,
        operator: key,
        overwrite: true,
      };
    }
    // Operator pressed again before a new operand: just swap the pending operator.
    return { ...state, operator: key };
  }

  if (key === "=") {
    if (state.operator === null || state.accumulator === null) {
      return state;
    }
    const current = toDecimal(state.entry);
    if (state.operator === "/" && current.isZero()) {
      return { ...state, error: DIVIDE_BY_ZERO_MESSAGE };
    }
    const accumulator = toDecimal(state.accumulator);
    const result = applyOperator(accumulator, state.operator, current);
    return {
      entry: formatNumber(result),
      accumulator: null,
      operator: null,
      overwrite: true,
      error: null,
    };
  }

  return state;
}

export function formatDisplay(state: CalcState): string {
  return state.error ?? state.entry;
}
