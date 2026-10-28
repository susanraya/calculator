import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import Calculator from "./Calculator";

function renderScreen() {
  render(
    <MemoryRouter>
      <Calculator />
    </MemoryRouter>,
  );
}

function click(wf: string) {
  fireEvent.click(document.querySelector(`[data-wf="${wf}"]`) as HTMLElement);
}

const KEY = {
  "0": "b-7-0",
  "1": "b-6-0",
  "2": "b-6-1",
  "3": "b-6-2",
  "4": "b-5-0",
  "5": "b-5-1",
  "6": "b-5-2",
  "7": "b-4-0",
  "8": "b-4-1",
  "9": "b-4-2",
  ".": "b-7-1",
  "+": "b-6-3",
  "-": "b-5-3",
  "*": "b-4-3",
  "/": "b-3-3",
  "%": "b-3-2",
  "=": "b-7-2",
  C: "b-3-1",
  AC: "b-3-0",
};

const CLEAR_HISTORY_WF = "b-3-4";

function output(): HTMLElement {
  return document.querySelector("output") as HTMLElement;
}

function sessionCount(): string | null {
  return document.querySelector('[data-wf="b-0-0"] span.block')?.textContent ?? null;
}

describe("Calculator screen", () => {
  it("[AC-013] tapping on-screen digit, operator and equals buttons performs the calculation and updates the display", () => {
    renderScreen();
    click(KEY["7"]);
    click(KEY["*"]);
    click(KEY["8"]);
    click(KEY["="]);
    expect(output()).toHaveTextContent("56");
  });

  it("[AC-013] AC resets the display back to 0", () => {
    renderScreen();
    click(KEY["7"]);
    click(KEY.AC);
    expect(output()).toHaveTextContent("0");
  });

  it("[AC-013] C clears only the current entry", () => {
    renderScreen();
    click(KEY["5"]);
    click(KEY["+"]);
    click(KEY["3"]);
    click(KEY.C);
    expect(output()).toHaveTextContent("0");
  });

  it("[AC-013] percentage key computes a percentage of the current entry", () => {
    renderScreen();
    click(KEY["5"]);
    click(KEY["0"]);
    click(KEY["%"]);
    expect(output()).toHaveTextContent("0.5");
  });

  it("[AC-013] decimal point key appends a decimal to the entry", () => {
    renderScreen();
    click(KEY["1"]);
    click(KEY["."]);
    click(KEY["5"]);
    expect(output()).toHaveTextContent("1.5");
  });

  it("[AC-013] dividing by zero shows the error message and locks digit entry", () => {
    renderScreen();
    click(KEY["5"]);
    click(KEY["/"]);
    click(KEY["0"]);
    click(KEY["="]);
    expect(output()).toHaveTextContent("Cannot divide by zero");
    expect(document.querySelector(`[data-wf="${KEY["7"]}"]`)).toBeDisabled();
  });

  it("[AC-014] an activated button shows a visible pressed state", () => {
    renderScreen();
    const btn = document.querySelector(`[data-wf="${KEY["7"]}"]`) as HTMLElement;
    fireEvent.click(btn);
    expect(btn.style.boxShadow).toBe("none");
  });

  it("[AC-015] keyboard input for digits, operators and Enter produces the same result as on-screen buttons", () => {
    renderScreen();
    fireEvent.keyDown(window, { key: "7" });
    fireEvent.keyDown(window, { key: "*" });
    fireEvent.keyDown(window, { key: "8" });
    fireEvent.keyDown(window, { key: "Enter" });
    expect(output()).toHaveTextContent("56");
  });

  it("[AC-015] Escape clears the current entry and Delete performs an all clear", () => {
    renderScreen();
    fireEvent.keyDown(window, { key: "5" });
    fireEvent.keyDown(window, { key: "Escape" });
    expect(output()).toHaveTextContent("0");
    fireEvent.keyDown(window, { key: "9" });
    fireEvent.keyDown(window, { key: "Delete" });
    expect(output()).toHaveTextContent("0");
  });

  it("[AC-016] mixing keyboard and on-screen input within one calculation updates the same shared state", () => {
    renderScreen();
    click(KEY["7"]);
    fireEvent.keyDown(window, { key: "*" });
    click(KEY["8"]);
    fireEvent.keyDown(window, { key: "Enter" });
    expect(output()).toHaveTextContent("56");
  });

  it("[AC-020] no fetch is issued by any calculator interaction", () => {
    const originalFetch = globalThis.fetch;
    let called = false;
    globalThis.fetch = (() => {
      called = true;
      return Promise.reject(new Error("should not be called"));
    }) as typeof fetch;
    try {
      renderScreen();
      click(KEY["7"]);
      click(KEY["*"]);
      click(KEY["8"]);
      click(KEY["="]);
      click(KEY["%"]);
      click(KEY.AC);
      expect(called).toBe(false);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("history starts empty on first load with no seeded sample data", () => {
    renderScreen();
    expect(screen.getByText("No calculations yet")).toBeInTheDocument();
    expect(sessionCount()).toBe("00");
  });

  it("[AC-025] completing a calculation with = adds the expression and result to the client-side history list", () => {
    renderScreen();
    click(KEY["7"]);
    click(KEY["*"]);
    click(KEY["8"]);
    click(KEY["="]);
    expect(screen.getByText("7 × 8")).toBeInTheDocument();
    expect(sessionCount()).toBe("01");

    click(KEY["+"]);
    click(KEY["4"]);
    click(KEY["="]);
    expect(sessionCount()).toBe("02");
  });

  it("[AC-026] no fetch is issued while calculations are added to history", () => {
    const originalFetch = globalThis.fetch;
    let called = false;
    globalThis.fetch = (() => {
      called = true;
      return Promise.reject(new Error("should not be called"));
    }) as typeof fetch;
    try {
      renderScreen();
      click(KEY["7"]);
      click(KEY["*"]);
      click(KEY["8"]);
      click(KEY["="]);
      expect(sessionCount()).toBe("01");
      expect(called).toBe(false);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("[AC-027] choosing clear history removes all entries and shows the empty state", () => {
    renderScreen();
    click(KEY["7"]);
    click(KEY["*"]);
    click(KEY["8"]);
    click(KEY["="]);
    expect(sessionCount()).toBe("01");

    click(CLEAR_HISTORY_WF);
    expect(screen.getByText(/Delete 1 entry\?/)).toBeInTheDocument();
    click(CLEAR_HISTORY_WF);

    expect(sessionCount()).toBe("00");
    expect(screen.getByText("History cleared")).toBeInTheDocument();
  });

  it("[AC-027] Escape cancels the clear-history confirmation and keeps entries", () => {
    renderScreen();
    click(KEY["7"]);
    click(KEY["*"]);
    click(KEY["8"]);
    click(KEY["="]);
    click(CLEAR_HISTORY_WF);
    expect(screen.getByText(/Delete 1 entry\?/)).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.queryByText(/Delete 1 entry\?/)).not.toBeInTheDocument();
    expect(sessionCount()).toBe("01");
  });
});
