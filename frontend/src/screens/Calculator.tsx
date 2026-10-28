import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";
import {
  press as pressKey,
  formatDisplay,
  initialState,
  DIVIDE_BY_ZERO_MESSAGE,
  type CalcState,
  type Key,
  type Operator,
} from "@/lib/calc";

const { Empty } = UI;

const { Check, Trash, ArrowRight, AlertCircle } = Icons;

const PRODUCT = "calculator";
const SCREEN = "Calculator";
const MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';

interface HistoryEntry {
  id: number;
  expr: string;
  result: string;
}

const DISPLAY_OP: Record<Operator, string> = { "+": "+", "-": "−", "*": "×", "/": "÷" };
const OP_NAMES: Record<Operator, string> = {
  "+": "Add",
  "-": "Subtract",
  "*": "Multiply",
  "/": "Divide",
};

const isDigitKey = (key: string): boolean => /^[0-9]$/.test(key);
const isOperatorKey = (key: string): key is Operator =>
  key === "+" || key === "-" || key === "*" || key === "/";

const group = (s: string): string => {
  if (s === "" || /e/i.test(s)) return s;
  const neg = s.charAt(0) === "-";
  const body = neg ? s.slice(1) : s;
  const dot = body.indexOf(".");
  const int = dot === -1 ? body : body.slice(0, dot);
  const rest = dot === -1 ? "" : body.slice(dot);
  return (neg ? "-" : "") + int.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + rest;
};

type Variant = "digit" | "op" | "equals" | "util";

interface KeyBtnProps {
  wf: string;
  label: string;
  aria?: string;
  onPress: () => void;
  variant?: Variant;
  span?: string;
  pressed?: boolean;
  disabled?: boolean;
}

const KeyBtn = ({
  wf,
  label,
  aria,
  onPress,
  variant = "digit",
  span,
  pressed,
  disabled,
}: KeyBtnProps) => {
  const ink = brand.primaryColor;
  const paper = brand.backgroundColor;
  const accent = brand.accentColor;
  const isOp = variant === "op";
  const isEq = variant === "equals";
  const bg = isOp ? ink : isEq ? accent : paper;
  const fg = isOp || isEq ? paper : ink;
  const shadowDepth = isEq ? 6 : 4;
  return (
    <button
      type="button"
      data-wf={wf}
      aria-label={aria}
      disabled={disabled}
      onClick={onPress}
      className={
        (span ?? "col-span-3 lg:col-span-2") +
        " wf-key flex items-center justify-center font-bold min-h-[60px] lg:min-h-[78px] " +
        "transition-transform duration-100 hover:-translate-x-[1px] hover:-translate-y-[1px] " +
        "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] " +
        "focus-visible:outline-[color:var(--wf-accent)] disabled:cursor-not-allowed"
      }
      style={{
        border: `3px solid ${ink}`,
        borderRadius: brand.radius,
        backgroundColor: bg,
        color: fg,
        fontFamily: MONO,
        fontVariantNumeric: "tabular-nums",
        fontSize: variant === "util" ? "1.125rem" : "1.6rem",
        letterSpacing: variant === "util" ? "0.08em" : "0",
        opacity: disabled ? 0.38 : 1,
        boxShadow: disabled || pressed ? "none" : `${shadowDepth}px ${shadowDepth}px 0 ${ink}`,
        transform: pressed ? `translate(${shadowDepth}px, ${shadowDepth}px)` : "none",
      }}
    >
      {label}
    </button>
  );
};

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const paper = brand.backgroundColor;
  const accent = brand.accentColor;
  const muted = brand.neutralColor;
  const thick = `3px solid ${ink}`;

  const [calc, setCalc] = React.useState<CalcState>(initialState);
  const [tape, setTape] = React.useState<string>("");
  const [label, setLabel] = React.useState<string | null>(null);
  const [history, setHistory] = React.useState<HistoryEntry[]>([]);
  const [cleared, setCleared] = React.useState(false);
  const [confirmClear, setConfirmClear] = React.useState(false);
  const [flash, setFlash] = React.useState<Key | null>(null);

  const calcRef = React.useRef(calc);
  calcRef.current = calc;
  const labelRef = React.useRef(label);
  labelRef.current = label;
  const confirmRef = React.useRef(confirmClear);
  confirmRef.current = confirmClear;
  const idRef = React.useRef(0);

  React.useEffect(() => {
    if (!flash) return undefined;
    const t = setTimeout(() => setFlash(null), 150);
    return () => clearTimeout(t);
  }, [flash]);

  const commit = (next: CalcState) => {
    calcRef.current = next;
    setCalc(next);
  };

  const pushHistory = (expr: string, result: string) => {
    idRef.current += 1;
    const id = idRef.current;
    setHistory((h) => [{ id, expr, result }, ...h].slice(0, 20));
    setCleared(false);
  };

  const act = (key: Key) => {
    const c = calcRef.current;

    if (key === "AC") {
      commit(pressKey(c, key));
      setTape("");
      setLabel(null);
      return;
    }

    if (key === "C") {
      commit(pressKey(c, key));
      setLabel(null);
      return;
    }

    if (c.error) return;

    if (isDigitKey(key) || key === ".") {
      commit(pressKey(c, key));
      setLabel(null);
      return;
    }

    if (key === "%") {
      const mark = group(c.entry) + "%";
      commit(pressKey(c, key));
      setLabel(mark);
      return;
    }

    if (isOperatorKey(key)) {
      const next = pressKey(c, key);
      if (next.error) {
        setTape(
          `${group(c.accumulator ?? "")} ${c.operator ? DISPLAY_OP[c.operator] : ""} ${group(c.entry)} =`,
        );
        commit(next);
        return;
      }
      commit(next);
      setTape(`${group(next.accumulator ?? "")} ${DISPLAY_OP[key]}`);
      setLabel(null);
      return;
    }

    if (key === "=") {
      if (c.operator === null || c.accumulator === null) {
        commit(pressKey(c, key));
        setTape(`${group(c.entry)} =`);
        return;
      }
      const next = pressKey(c, key);
      if (next.error) {
        setTape(`${group(c.accumulator)} ${DISPLAY_OP[c.operator]} ${group(c.entry)} =`);
        commit(next);
        return;
      }
      const expr = `${group(c.accumulator)} ${DISPLAY_OP[c.operator]} ${labelRef.current || group(c.entry)}`;
      pushHistory(expr, group(next.entry));
      commit(next);
      setTape(`${expr} =`);
      setLabel(null);
      return;
    }
  };

  const press = (key: Key) => {
    setFlash(key);
    act(key);
  };

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (k === "Escape" && confirmRef.current) {
        e.preventDefault();
        setConfirmClear(false);
        return;
      }
      let mapped: Key | null = null;
      if (/^[0-9]$/.test(k)) mapped = k as Key;
      else if (k === "." || k === ",") mapped = ".";
      else if (k === "+") mapped = "+";
      else if (k === "-") mapped = "-";
      else if (k === "*" || k === "x" || k === "X") mapped = "*";
      else if (k === "/") mapped = "/";
      else if (k === "%") mapped = "%";
      else if (k === "Enter" || k === "=") mapped = "=";
      else if (k === "Escape") mapped = "C";
      else if (k === "Delete") mapped = "AC";
      if (!mapped) return;
      const t = e.target as HTMLElement | null;
      if (k === "Enter" && t && (t.tagName === "BUTTON" || t.tagName === "A")) return;
      e.preventDefault();
      press(mapped);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pressedKey = flash;
  const isDiv0 = calc.error === DIVIDE_BY_ZERO_MESSAGE;
  const locked = isDiv0;
  const shown = group(calc.entry);
  const displayed = calc.error ?? shown;

  const keyProps = (
    key: Key,
    opts: {
      wf: string;
      label?: string;
      aria?: string;
      variant?: Variant;
      span?: string;
      disabled?: boolean;
    },
  ): KeyBtnProps => ({
    wf: opts.wf,
    label: opts.label || key,
    aria: opts.aria,
    variant: opts.variant,
    span: opts.span,
    pressed: pressedKey === key,
    disabled: opts.disabled,
    onPress: () => press(key),
  });

  const sideNote = "col-span-12 lg:col-span-4 flex flex-col justify-center py-2 pl-4";
  const noteStyle = { borderLeft: thick, fontFamily: MONO };
  const labelClass = "text-[11px] uppercase tracking-[0.18em]";

  return (
    <div
      style={{
        color: ink,
        fontFamily: brand.fontBody,
        ["--wf-accent" as string]: accent,
      }}
    >
      <style>{`
        @keyframes wf-rise { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
        @keyframes wf-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
        @media (prefers-reduced-motion: reduce) {
          .wf-anim { animation: none !important; }
          .wf-key { transition: none !important; }
        }
      `}</style>

      <div className="grid grid-cols-12 gap-4 lg:gap-5">
        {/* ROW 1 */}
        <header
          data-wf="b-0-0"
          className="col-span-12 flex flex-wrap items-end justify-between gap-4 pb-4"
          style={{ borderBottom: thick }}
        >
          <div>
            <p className={labelClass} style={{ fontFamily: MONO }}>
              {PRODUCT} / Keypad · no account · runs in your browser
            </p>
            <h1
              className="mt-2 text-6xl sm:text-7xl font-bold leading-none tracking-tight"
              style={{ fontFamily: brand.fontHeading }}
            >
              {SCREEN}
            </h1>
          </div>
          <p className="text-right" style={{ fontFamily: MONO }}>
            <span
              className="block text-5xl font-bold"
              style={{ fontFamily: brand.fontHeading, fontVariantNumeric: "tabular-nums" }}
            >
              {String(history.length).padStart(2, "0")}
            </span>
            <span className={labelClass}>in this session</span>
          </p>
        </header>

        {/* ROW 2 */}
        <section
          data-wf="b-1-0"
          className="col-span-12 lg:col-span-8 p-5 lg:p-7"
          style={{
            border: thick,
            borderRadius: brand.radius,
            backgroundColor: paper,
            boxShadow: `6px 6px 0 ${isDiv0 ? accent : ink}`,
          }}
        >
          <div className="flex items-center justify-between gap-3" style={{ fontFamily: MONO }}>
            <span className={labelClass}>Display</span>
            <span className={labelClass} style={{ color: muted }}>
              {isDiv0
                ? "Error held"
                : calc.operator
                  ? `Operator ${DISPLAY_OP[calc.operator]} held — ${OP_NAMES[calc.operator]}`
                  : "Ready"}
            </span>
          </div>
          <output
            aria-live="polite"
            aria-atomic="true"
            className="mt-4 block overflow-x-auto whitespace-nowrap text-right font-bold leading-none"
            style={{
              fontFamily: MONO,
              fontVariantNumeric: "tabular-nums",
              fontSize: isDiv0 ? "2rem" : "clamp(2.75rem, 9vw, 4.75rem)",
              color: isDiv0 ? accent : ink,
            }}
          >
            {isDiv0 ? formatDisplay(calc) : displayed}
          </output>
          <p className="mt-4 text-[11px]" style={{ fontFamily: MONO, color: muted }}>
            {isDiv0
              ? `Your entry is kept: ${shown}. Press C to re-enter the divisor.`
              : "Results are rounded to 12 significant figures, so decimals stay exact on screen."}
          </p>
        </section>

        <p data-wf="b-1-1" className={sideNote} style={noteStyle}>
          <span className={labelClass} style={{ color: muted }}>
            Privacy
          </span>
          <span className="mt-2 text-sm leading-relaxed">
            Recent calculations — kept in this browser only, never sent to a server.
          </span>
        </p>

        {/* ROW 3 */}
        <section
          data-wf="b-2-0"
          className="col-span-12 lg:col-span-8 flex h-full flex-col justify-between p-5 lg:p-6"
          style={{
            border: thick,
            borderRadius: brand.radius,
            backgroundColor: paper,
            boxShadow: `6px 6px 0 ${ink}`,
          }}
        >
          <h2 className={labelClass} style={{ fontFamily: MONO }}>
            01 / Running tape
          </h2>
          <p
            className="mt-4 overflow-x-auto whitespace-nowrap text-2xl sm:text-3xl font-bold"
            style={{
              fontFamily: MONO,
              fontVariantNumeric: "tabular-nums",
              color: tape ? ink : muted,
            }}
          >
            {tape || "Nothing on the tape — press a digit to start."}
          </p>
          <p
            className="mt-4 text-[11px] leading-relaxed"
            style={{ fontFamily: MONO, color: muted }}
          >
            Chain as long as you like: each result carries straight into the next operator. Press =
            again to hold the running result.
          </p>
        </section>

        <section data-wf="b-2-1" className="col-span-12 lg:col-span-4">
          <h2 className="text-2xl font-bold leading-none" style={{ fontFamily: brand.fontHeading }}>
            Session history
          </h2>
          <div className="mt-3" style={{ borderTop: thick }}>
            {history.length === 0 ? (
              <div className="pt-4">
                <Empty
                  title={cleared ? "History cleared" : "No calculations yet"}
                  description={
                    cleared
                      ? "Those entries are gone from this browser. Nothing was ever sent anywhere."
                      : "Finish a calculation with = and it is listed here for this browser session only."
                  }
                />
              </div>
            ) : (
              <ol>
                {history.map((h, i) => (
                  <li
                    key={h.id}
                    data-wf={i < 4 ? `i-2-1-${i}` : undefined}
                    className="wf-anim flex items-baseline gap-3 py-3"
                    style={{
                      borderBottom: `1px dashed ${muted}`,
                      fontFamily: MONO,
                      fontVariantNumeric: "tabular-nums",
                      animation: "wf-rise 240ms ease-out",
                    }}
                  >
                    <span className="text-[11px] w-6 shrink-0" style={{ color: muted }}>
                      {String(history.length - i).padStart(2, "0")}
                    </span>
                    <span className="text-sm">
                      {h.expr} <span aria-hidden="true">=</span>
                      <span className="sr-only">equals</span>{" "}
                      <strong className="font-bold">{h.result}</strong>
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>

        <h2 className="sr-only">Keypad</h2>

        {/* ROW 4 */}
        <KeyBtn
          {...keyProps("AC", {
            wf: "b-3-0",
            aria: "All clear — reset the whole calculation",
            variant: "util",
          })}
        />
        <KeyBtn
          {...keyProps("C", { wf: "b-3-1", aria: "Clear the current entry", variant: "util" })}
        />
        <KeyBtn
          {...keyProps("%", { wf: "b-3-2", aria: "Percentage", variant: "util", disabled: locked })}
        />
        <KeyBtn
          {...keyProps("/", {
            wf: "b-3-3",
            aria: "Divide",
            variant: "op",
            label: "÷",
            disabled: locked,
          })}
        />

        <div className="col-span-12 lg:col-span-4 flex flex-col justify-center gap-2">
          {confirmClear ? (
            <div
              className="flex flex-wrap items-center gap-3 p-3"
              style={{
                border: thick,
                borderRadius: brand.radius,
                boxShadow: `4px 4px 0 ${accent}`,
                fontFamily: MONO,
              }}
            >
              <span className="text-[11px] uppercase tracking-[0.18em]">
                Delete {history.length} {history.length === 1 ? "entry" : "entries"}?
              </span>
              <button
                type="button"
                data-wf="b-3-4"
                onClick={() => {
                  setHistory([]);
                  setCleared(true);
                  setConfirmClear(false);
                }}
                className="min-h-[44px] px-4 text-xs font-bold uppercase tracking-[0.14em] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--wf-accent)]"
                style={{ border: thick, backgroundColor: ink, color: paper, fontFamily: MONO }}
              >
                <Check aria-hidden="true" className="mr-2 inline h-4 w-4" />
                Yes, clear history
              </button>
            </div>
          ) : (
            <button
              type="button"
              data-wf="b-3-4"
              disabled={history.length === 0}
              onClick={() => setConfirmClear(true)}
              className="wf-key flex min-h-[60px] lg:min-h-[78px] items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.14em] transition-transform duration-100 hover:-translate-x-[1px] hover:-translate-y-[1px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--wf-accent)] disabled:cursor-not-allowed"
              style={{
                border: thick,
                borderRadius: brand.radius,
                backgroundColor: paper,
                color: ink,
                fontFamily: MONO,
                opacity: history.length === 0 ? 0.38 : 1,
                boxShadow: history.length === 0 ? "none" : `4px 4px 0 ${ink}`,
              }}
            >
              <Trash aria-hidden="true" className="h-5 w-5" />
              Clear history
            </button>
          )}
          <p className="text-[11px]" style={{ fontFamily: MONO, color: muted }}>
            {confirmClear
              ? "Press Esc to keep them."
              : history.length === 0
                ? "Nothing stored in this browser right now."
                : "Removes the list from this browser."}
          </p>
        </div>

        {/* ROW 5 */}
        <KeyBtn {...keyProps("7", { wf: "b-4-0", disabled: locked })} />
        <KeyBtn {...keyProps("8", { wf: "b-4-1", disabled: locked })} />
        <KeyBtn {...keyProps("9", { wf: "b-4-2", disabled: locked })} />
        <KeyBtn
          {...keyProps("*", {
            wf: "b-4-3",
            aria: "Multiply",
            variant: "op",
            label: "×",
            disabled: locked,
          })}
        />

        <div
          data-wf="b-4-4"
          role="status"
          aria-live="polite"
          className="col-span-12 lg:col-span-4 flex flex-col justify-center py-3 px-4"
          style={{
            border: isDiv0 ? thick : "none",
            borderLeft: thick,
            borderRadius: brand.radius,
            boxShadow: isDiv0 ? `4px 4px 0 ${accent}` : "none",
            fontFamily: MONO,
          }}
        >
          <span className={labelClass} style={{ color: isDiv0 ? accent : muted }}>
            {isDiv0 ? "Error" : "Error notice"}
          </span>
          <span className="mt-2 flex items-start gap-2 text-sm leading-relaxed">
            {isDiv0 ? (
              <AlertCircle aria-hidden="true" className="mt-[2px] h-4 w-4 shrink-0" />
            ) : null}
            {isDiv0
              ? "Cannot divide by zero — press C and enter a new value."
              : "Clear so far. A division by zero is caught and reported here; the calculator never crashes."}
          </span>
        </div>

        {/* ROW 6 */}
        <KeyBtn {...keyProps("4", { wf: "b-5-0", disabled: locked })} />
        <KeyBtn {...keyProps("5", { wf: "b-5-1", disabled: locked })} />
        <KeyBtn {...keyProps("6", { wf: "b-5-2", disabled: locked })} />
        <KeyBtn
          {...keyProps("-", {
            wf: "b-5-3",
            aria: "Subtract",
            variant: "op",
            label: "−",
            disabled: locked,
          })}
        />

        <p data-wf="b-5-4" className={sideNote} style={noteStyle}>
          <span className={labelClass} style={{ color: muted }}>
            Keyboard
          </span>
          <span className="mt-2 text-sm leading-relaxed">
            Keyboard: 0–9 and . for entry, + − * / for operators, Enter for =, Esc to clear.
          </span>
        </p>

        {/* ROW 7 */}
        <KeyBtn {...keyProps("1", { wf: "b-6-0", disabled: locked })} />
        <KeyBtn {...keyProps("2", { wf: "b-6-1", disabled: locked })} />
        <KeyBtn {...keyProps("3", { wf: "b-6-2", disabled: locked })} />
        <KeyBtn {...keyProps("+", { wf: "b-6-3", aria: "Add", variant: "op", disabled: locked })} />

        <p data-wf="b-6-4" className={sideNote} style={noteStyle}>
          <span className={labelClass} style={{ color: muted }}>
            Access
          </span>
          <span className="mt-2 text-sm leading-relaxed">
            Every control is reachable by Tab, shows a focus outline and is labelled for screen
            readers; the result is announced on change.
          </span>
        </p>

        {/* ROW 8 */}
        <KeyBtn
          {...keyProps("0", { wf: "b-7-0", span: "col-span-6 lg:col-span-4", disabled: locked })}
        />
        <KeyBtn {...keyProps(".", { wf: "b-7-1", aria: "Decimal point", disabled: locked })} />
        <KeyBtn
          {...keyProps("=", {
            wf: "b-7-2",
            aria: "Equals — show the result",
            variant: "equals",
            disabled: locked,
          })}
        />

        <div className="col-span-12 lg:col-span-4 flex items-center">
          <button
            type="button"
            data-wf="b-7-3"
            onClick={() => navigate("privacy-and-accessibility")}
            className="flex min-h-[44px] items-center gap-2 text-left text-sm leading-relaxed underline decoration-2 underline-offset-4 hover:decoration-[3px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--wf-accent)]"
            style={{ fontFamily: MONO, color: accent }}
          >
            No sign-in, no data leaves your browser — read the full statement
            <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
          </button>
        </div>

        {/* ROW 9 */}
        <p
          data-wf="b-8-0"
          className="col-span-12 pt-4 text-[13px] leading-relaxed"
          style={{ borderTop: `1px dashed ${muted}`, fontFamily: MONO, color: muted }}
        >
          Free to use with no account. The page is under 50 KB and all calculations run in your
          browser, so it keeps working on slow connections and adapts to phone, tablet and desktop
          screens.
        </p>
      </div>
    </div>
  );
}
