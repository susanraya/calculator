// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, X, Trash, ArrowRight, AlertCircle } = Icons;

const PRODUCT = "calculator";
const SCREEN = "Calculator";
const MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';

const SEED_HISTORY = [
  { id: 4, expr: "7 × 8", result: "56" },
  { id: 3, expr: "120 ÷ 4", result: "30" },
  { id: 2, expr: "240 × 50%", result: "120" },
  { id: 1, expr: "12.75 + 3.5", result: "16.25" },
];

const OPS = {
  "+": (a, b) => a + b,
  "−": (a, b) => a - b,
  "×": (a, b) => a * b,
  "÷": (a, b) => a / b,
};

const OP_NAMES = { "+": "Add", "−": "Subtract", "×": "Multiply", "÷": "Divide" };

const fmtNum = (n) => {
  if (!isFinite(n) || isNaN(n)) return "0";
  const r = parseFloat(n.toPrecision(12));
  if (r !== 0 && (Math.abs(r) >= 1e12 || Math.abs(r) < 1e-9)) return r.toExponential(6);
  return String(r);
};

const group = (s) => {
  if (s === "" || /e/i.test(s)) return s;
  const neg = s.charAt(0) === "-";
  const body = neg ? s.slice(1) : s;
  const dot = body.indexOf(".");
  const int = dot === -1 ? body : body.slice(0, dot);
  const rest = dot === -1 ? "" : body.slice(dot);
  return (neg ? "-" : "") + int.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + rest;
};

const KeyBtn = ({ wf, label, aria, onPress, variant = "digit", span, pressed, disabled }) => {
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
        span +
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

  const [calc, setCalc] = React.useState({
    entry: "1234.56",
    acc: null,
    op: null,
    overwrite: true,
    tape: "120 ÷ 4 =",
    error: null,
    label: null,
  });
  const [history, setHistory] = React.useState(SEED_HISTORY);
  const [cleared, setCleared] = React.useState(false);
  const [confirmClear, setConfirmClear] = React.useState(false);
  const [flash, setFlash] = React.useState(null);

  const calcRef = React.useRef(calc);
  calcRef.current = calc;
  const confirmRef = React.useRef(confirmClear);
  confirmRef.current = confirmClear;
  const idRef = React.useRef(100);
  const flashRef = React.useRef(0);

  React.useEffect(() => {
    if (!flash) return undefined;
    const t = setTimeout(() => setFlash(null), 150);
    return () => clearTimeout(t);
  }, [flash]);

  const commit = (next) => {
    calcRef.current = next;
    setCalc(next);
  };

  const pushHistory = (expr, result) => {
    idRef.current += 1;
    const id = idRef.current;
    setHistory((h) => [{ id, expr, result }, ...h].slice(0, 20));
    setCleared(false);
  };

  const act = (key) => {
    const c = calcRef.current;

    if (key === "AC") {
      return commit({ entry: "0", acc: null, op: null, overwrite: true, tape: "", error: null, label: null });
    }
    if (key === "C") {
      return commit({ ...c, entry: "0", overwrite: true, error: null, label: null });
    }
    if (c.error) return undefined;

    if (/^[0-9]$/.test(key)) {
      const base = c.overwrite || c.entry === "0" ? "" : c.entry;
      if (base.replace(/[-.]/g, "").length >= 12) return undefined;
      return commit({ ...c, entry: base + key, overwrite: false, label: null });
    }
    if (key === ".") {
      if (c.overwrite) return commit({ ...c, entry: "0.", overwrite: false, label: null });
      if (c.entry.indexOf(".") !== -1) return undefined;
      return commit({ ...c, entry: c.entry + ".", label: null });
    }
    if (key === "%") {
      const n = Number(c.entry) || 0;
      const mark = group(c.entry) + "%";
      if (c.acc !== null && c.op) {
        return commit({ ...c, entry: fmtNum((c.acc * n) / 100), overwrite: false, label: mark });
      }
      return commit({ ...c, entry: fmtNum(n / 100), overwrite: false, label: mark });
    }
    if (OPS[key]) {
      const n = Number(c.entry) || 0;
      if (c.acc !== null && c.op && !c.overwrite) {
        if (c.op === "÷" && n === 0) {
          return commit({ ...c, error: "divzero", tape: `${group(fmtNum(c.acc))} ÷ ${group(c.entry)} =` });
        }
        const value = OPS[c.op](c.acc, n);
        return commit({
          entry: fmtNum(value),
          acc: value,
          op: key,
          overwrite: true,
          tape: `${group(fmtNum(value))} ${key}`,
          error: null,
          label: null,
        });
      }
      return commit({ ...c, acc: n, op: key, overwrite: true, tape: `${group(fmtNum(n))} ${key}`, label: null });
    }
    if (key === "=") {
      const n = Number(c.entry) || 0;
      if (c.acc === null || !c.op) {
        return commit({ ...c, tape: `${group(fmtNum(n))} =`, overwrite: true });
      }
      if (c.op === "÷" && n === 0) {
        return commit({ ...c, error: "divzero", tape: `${group(fmtNum(c.acc))} ÷ ${group(c.entry)} =` });
      }
      const value = OPS[c.op](c.acc, n);
      const expr = `${group(fmtNum(c.acc))} ${c.op} ${c.label || group(c.entry)}`;
      pushHistory(expr, group(fmtNum(value)));
      return commit({
        entry: fmtNum(value),
        acc: null,
        op: null,
        overwrite: true,
        tape: `${expr} =`,
        error: null,
        label: null,
      });
    }
    return undefined;
  };

  const press = (key) => {
    flashRef.current += 1;
    setFlash({ key, n: flashRef.current });
    act(key);
  };

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (k === "Escape" && confirmRef.current) {
        e.preventDefault();
        setConfirmClear(false);
        return;
      }
      let mapped = null;
      if (/^[0-9]$/.test(k)) mapped = k;
      else if (k === "." || k === ",") mapped = ".";
      else if (k === "+") mapped = "+";
      else if (k === "-") mapped = "−";
      else if (k === "*" || k === "x" || k === "X") mapped = "×";
      else if (k === "/") mapped = "÷";
      else if (k === "%") mapped = "%";
      else if (k === "Enter" || k === "=") mapped = "=";
      else if (k === "Escape") mapped = "C";
      else if (k === "Delete") mapped = "AC";
      if (!mapped) return;
      const t = e.target;
      if (k === "Enter" && t && (t.tagName === "BUTTON" || t.tagName === "A")) return;
      e.preventDefault();
      press(mapped);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const pressedKey = flash ? flash.key : null;
  const isDiv0 = calc.error === "divzero";
  const locked = isDiv0;
  const shown = group(calc.entry);

  const keyProps = (key, opts) => ({
    wf: opts.wf,
    label: opts.label || key,
    aria: opts.aria,
    variant: opts.variant,
    span: opts.span || "col-span-3 lg:col-span-2",
    pressed: pressedKey === key,
    disabled: opts.disabled,
    onPress: () => press(key),
  });

  const sideNote = "col-span-12 lg:col-span-4 flex flex-col justify-center py-2 pl-4";
  const noteStyle = { borderLeft: thick, fontFamily: MONO };
  const label = "text-[11px] uppercase tracking-[0.18em]";

  return (
    <div
      style={{
        color: ink,
        fontFamily: brand.fontBody,
        ["--wf-accent"]: accent,
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
            <p className={label} style={{ fontFamily: MONO }}>
              {PRODUCT} / Keypad · no account · runs in your browser
            </p>
            <h1 className="mt-2 text-6xl sm:text-7xl font-bold leading-none tracking-tight" style={{ fontFamily: brand.fontHeading }}>
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
            <span className={label}>in this session</span>
          </p>
        </header>

        {/* ROW 2 */}
        <section
          data-wf="b-1-0"
          className="col-span-12 lg:col-span-8 p-5 lg:p-7"
          style={{ border: thick, borderRadius: brand.radius, backgroundColor: paper, boxShadow: `6px 6px 0 ${isDiv0 ? accent : ink}` }}
        >
          <div className="flex items-center justify-between gap-3" style={{ fontFamily: MONO }}>
            <span className={label}>Display</span>
            <span className={label} style={{ color: muted }}>
              {isDiv0
                ? "Error held"
                : calc.op
                ? `Operator ${calc.op} held — ${OP_NAMES[calc.op]}`
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
            {isDiv0 ? "Cannot divide by zero" : shown}
          </output>
          <p className="mt-4 text-[11px]" style={{ fontFamily: MONO, color: muted }}>
            {isDiv0
              ? `Your entry is kept: ${shown}. Press C to re-enter the divisor.`
              : "Results are rounded to 12 significant figures, so decimals stay exact on screen."}
          </p>
        </section>

        <p data-wf="b-1-1" className={sideNote} style={noteStyle}>
          <span className={label} style={{ color: muted }}>
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
          style={{ border: thick, borderRadius: brand.radius, backgroundColor: paper, boxShadow: `6px 6px 0 ${ink}` }}
        >
          <h2 className={label} style={{ fontFamily: MONO }}>
            01 / Running tape
          </h2>
          <p
            className="mt-4 overflow-x-auto whitespace-nowrap text-2xl sm:text-3xl font-bold"
            style={{ fontFamily: MONO, fontVariantNumeric: "tabular-nums", color: calc.tape ? ink : muted }}
          >
            {calc.tape || "Nothing on the tape — press a digit to start."}
          </p>
          <p className="mt-4 text-[11px] leading-relaxed" style={{ fontFamily: MONO, color: muted }}>
            Chain as long as you like: each result carries straight into the next operator. Press = again to hold the
            running result.
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
                      <span className="sr-only">equals</span> <strong className="font-bold">{h.result}</strong>
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>

        <h2 className="sr-only">Keypad</h2>

        {/* ROW 4 */}
        <KeyBtn {...keyProps("AC", { wf: "b-3-0", aria: "All clear — reset the whole calculation", variant: "util" })} />
        <KeyBtn {...keyProps("C", { wf: "b-3-1", aria: "Clear the current entry", variant: "util" })} />
        <KeyBtn {...keyProps("%", { wf: "b-3-2", aria: "Percentage", variant: "util", disabled: locked })} />
        <KeyBtn {...keyProps("÷", { wf: "b-3-3", aria: "Divide", variant: "op", disabled: locked })} />

        <div className="col-span-12 lg:col-span-4 flex flex-col justify-center gap-2">
          {confirmClear ? (
            <div
              className="flex flex-wrap items-center gap-3 p-3"
              style={{ border: thick, borderRadius: brand.radius, boxShadow: `4px 4px 0 ${accent}`, fontFamily: MONO }}
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
        <KeyBtn {...keyProps("×", { wf: "b-4-3", aria: "Multiply", variant: "op", disabled: locked })} />

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
          <span className={label} style={{ color: isDiv0 ? accent : muted }}>
            {isDiv0 ? "Error" : "Error notice"}
          </span>
          <span className="mt-2 flex items-start gap-2 text-sm leading-relaxed">
            {isDiv0 ? <AlertCircle aria-hidden="true" className="mt-[2px] h-4 w-4 shrink-0" /> : null}
            {isDiv0
              ? "Cannot divide by zero — press C and enter a new value."
              : "Clear so far. A division by zero is caught and reported here; the calculator never crashes."}
          </span>
        </div>

        {/* ROW 6 */}
        <KeyBtn {...keyProps("4", { wf: "b-5-0", disabled: locked })} />
        <KeyBtn {...keyProps("5", { wf: "b-5-1", disabled: locked })} />
        <KeyBtn {...keyProps("6", { wf: "b-5-2", disabled: locked })} />
        <KeyBtn {...keyProps("−", { wf: "b-5-3", aria: "Subtract", variant: "op", disabled: locked })} />

        <p data-wf="b-5-4" className={sideNote} style={noteStyle}>
          <span className={label} style={{ color: muted }}>
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
          <span className={label} style={{ color: muted }}>
            Access
          </span>
          <span className="mt-2 text-sm leading-relaxed">
            Every control is reachable by Tab, shows a focus outline and is labelled for screen readers; the result is
            announced on change.
          </span>
        </p>

        {/* ROW 8 */}
        <KeyBtn {...keyProps("0", { wf: "b-7-0", span: "col-span-6 lg:col-span-4", disabled: locked })} />
        <KeyBtn {...keyProps(".", { wf: "b-7-1", aria: "Decimal point", disabled: locked })} />
        <KeyBtn {...keyProps("=", { wf: "b-7-2", aria: "Equals — show the result", variant: "equals", disabled: locked })} />

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
          Free to use with no account. The page is under 50 KB and all calculations run in your browser, so it keeps
          working on slow connections and adapts to phone, tablet and desktop screens.
        </p>
      </div>
    </div>
  );
}
