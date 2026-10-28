// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Table, THead, TBody, TR, TH, TD } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, Clock, ArrowLeft, AlertCircle, CheckCircle } = Icons;

const HOLDINGS = [
  { item: "Accounts, names or email addresses", held: "None", note: "there is no sign-in" },
  { item: "Cookies, local storage, device IDs", held: "None", note: "nothing is written to disk" },
  { item: "Analytics, tracking pixels, third-party scripts", held: "None", note: "no scripts are loaded" },
  { item: "Keystrokes, operands or results", held: "None", note: "the maths runs in your browser" },
  { item: "Payment or billing details", held: "None", note: "the calculator is free" },
  { item: "IP-linked usage profiles", held: "None", note: "no request carries your input" },
];

const CONFORMANCE = [
  {
    id: "i-4-0-0",
    label: "Status",
    text: "Conformant — verified on release candidate 1.0, 28 Oct 2026",
    stamp: "PASS",
  },
  {
    id: "i-4-0-1",
    label: "Keyboard operability",
    text: "Every control reachable and activatable by keyboard",
    stamp: "PASS",
  },
  {
    id: "i-4-0-2",
    label: "Screen readers",
    text: "All buttons named; the running result is announced",
    stamp: "PASS",
  },
  {
    id: "i-4-0-3",
    label: "Colour contrast",
    text: "Meets AA minimums; active, error and focus states are never shown by colour alone",
    stamp: "PASS",
  },
  {
    id: "i-4-0-4",
    label: "Release gate",
    text: "Any open WCAG 2.1 AA failure blocks release",
    stamp: "GATE",
  },
];

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const paper = brand.backgroundColor;
  const accent = brand.accentColor;
  const muted = brand.neutralColor;

  const [openFailures] = React.useState(0);

  const hardBox = {
    border: "3px solid " + ink,
    borderRadius: 0,
    boxShadow: "6px 6px 0 " + ink,
    backgroundColor: paper,
  };

  const monoLabel = {
    fontFamily: brand.fontBody,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontSize: "11px",
    color: muted,
  };

  return (
    <div
      className="w-full"
      style={{
        backgroundColor: paper,
        color: ink,
        fontFamily: brand.fontBody,
        ["--bs-ink"]: ink,
        ["--bs-accent"]: accent,
        ["--bs-paper"]: paper,
      }}
    >
      <style>{`
        .bs-focus:focus-visible {
          outline: 3px solid var(--bs-accent);
          outline-offset: 3px;
        }
        .bs-cta {
          transition: transform 120ms ease, box-shadow 120ms ease;
        }
        .bs-cta:hover { transform: translate(3px, 3px); box-shadow: 3px 3px 0 var(--bs-accent); }
        .bs-cta:active { transform: translate(6px, 6px); box-shadow: 0 0 0 var(--bs-accent); }
        .bs-row { animation: bs-rise 420ms cubic-bezier(.2,.7,.3,1) both; }
        @keyframes bs-rise {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
        .bs-seal { animation: bs-stamp 520ms cubic-bezier(.2,.9,.3,1) both; }
        @keyframes bs-stamp {
          from { opacity: 0; transform: rotate(-9deg) scale(1.18); }
          to { opacity: 1; transform: rotate(-4deg) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bs-row, .bs-seal { animation: none !important; }
          .bs-cta { transition: none; }
          .bs-cta:hover, .bs-cta:active { transform: none; box-shadow: 6px 6px 0 var(--bs-accent); }
        }
      `}</style>

      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">

        {/* ROW 1 — page title */}
        <header data-wf="b-0-0" className="mb-10">
          <div
            className="flex items-center justify-between gap-4 pb-3"
            style={{ borderBottom: "3px solid " + ink }}
          >
            <span style={monoLabel}>§ 01 — Standing statement</span>
            <span style={{ ...monoLabel, fontVariantNumeric: "tabular-nums" }}>
              Doc QRQ-PRIV-04 · 28 Oct 2026
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <h1
              className="max-w-3xl"
              style={{
                fontFamily: brand.fontHeading,
                fontSize: "clamp(2.5rem, 7.5vw, 4.5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.015em",
                fontWeight: 700,
              }}
            >
              Privacy &amp; Accessibility
            </h1>

            <div
              aria-hidden="true"
              className="bs-seal shrink-0 self-start px-4 py-3 text-center sm:self-end"
              style={{
                border: "3px solid " + accent,
                color: accent,
                transform: "rotate(-4deg)",
                lineHeight: 1.15,
              }}
            >
              <div
                style={{
                  fontFamily: brand.fontBody,
                  fontSize: "22px",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                0 BYTES
              </div>
              <div
                style={{
                  fontFamily: brand.fontBody,
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                sent · no data held
              </div>
            </div>
          </div>
        </header>

        {/* ROW 2 — lede */}
        <p
          data-wf="b-1-0"
          className="mb-12 max-w-[68ch]"
          style={{
            fontSize: "clamp(1.05rem, 2.2vw, 1.375rem)",
            lineHeight: 1.5,
            borderLeft: "3px solid " + ink,
            paddingLeft: "16px",
          }}
        >
          This calculator collects no personal data. Nothing you type is transmitted to or stored on a
          server; every calculation runs in your browser.
        </p>

        {/* ROW 3 — two cards */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <section data-wf="b-2-0" style={hardBox}>
            <div
              className="flex items-center justify-between gap-3 px-5 py-3"
              style={{ backgroundColor: ink, color: paper }}
            >
              <h2
                style={{
                  fontFamily: brand.fontHeading,
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: 1.1,
                }}
              >
                Data we hold: none
              </h2>
              <Check aria-hidden="true" className="h-5 w-5 shrink-0" />
            </div>

            <div className="px-5 pb-5 pt-4">
              <p className="mb-4" style={{ fontSize: "13px", lineHeight: 1.6, color: muted }}>
                The full register of what this tool keeps about you. It is short on purpose.
              </p>
              <Table className="w-full" style={{ fontVariantNumeric: "tabular-nums" }}>
                <THead>
                  <TR>
                    <TH
                      className="text-left"
                      style={{ ...monoLabel, color: ink, paddingBottom: "8px" }}
                    >
                      Category
                    </TH>
                    <TH
                      className="text-right"
                      style={{ ...monoLabel, color: ink, paddingBottom: "8px" }}
                    >
                      Held
                    </TH>
                  </TR>
                </THead>
                <TBody>
                  {HOLDINGS.map((row) => (
                    <TR key={row.item} style={{ borderTop: "1px dashed " + muted }}>
                      <TD className="py-3 pr-3 align-top" style={{ fontSize: "13px", lineHeight: 1.5 }}>
                        <span>{row.item}</span>
                        <span className="block" style={{ fontSize: "11px", color: muted }}>
                          {row.note}
                        </span>
                      </TD>
                      <TD className="py-3 text-right align-top">
                        <span
                          className="inline-block px-2 py-1"
                          style={{
                            ...monoLabel,
                            color: ink,
                            border: "2px solid " + ink,
                            letterSpacing: "0.12em",
                          }}
                        >
                          {row.held}
                        </span>
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </div>
          </section>

          <section data-wf="b-2-1" style={hardBox}>
            <div
              className="flex items-start justify-between gap-3 px-5 py-3"
              style={{ backgroundColor: ink, color: paper }}
            >
              <h2
                style={{
                  fontFamily: brand.fontHeading,
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: 1.1,
                }}
              >
                Calculation history: stored in this browser only, cleared when you clear it
              </h2>
            </div>

            <div className="px-5 pb-5 pt-4">
              <p className="max-w-[46ch]" style={{ fontSize: "14px", lineHeight: 1.65 }}>
                If you keep a history of your sums, it lives in this tab&rsquo;s memory and nowhere else.
                It is not uploaded, not backed up and not readable by us. Closing the tab ends it; the
                <span className="whitespace-nowrap"> Clear history </span>
                control on the calculator ends it sooner.
              </p>

              <div className="mt-5 grid grid-cols-2" style={{ borderTop: "3px solid " + ink }}>
                <div className="py-4 pr-4" style={{ borderRight: "1px dashed " + muted }}>
                  <div style={monoLabel}>Entries sent to a server</div>
                  <div
                    style={{
                      fontFamily: brand.fontBody,
                      fontSize: "34px",
                      fontWeight: 700,
                      lineHeight: 1.1,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    0
                  </div>
                  <div style={{ fontSize: "11px", color: muted }}>since launch, by design</div>
                </div>
                <div className="py-4 pl-4">
                  <div style={monoLabel}>Retention off-device</div>
                  <div
                    style={{
                      fontFamily: brand.fontBody,
                      fontSize: "34px",
                      fontWeight: 700,
                      lineHeight: 1.1,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    0d
                  </div>
                  <div style={{ fontSize: "11px", color: muted }}>nothing leaves the browser</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ROW 4 — regulatory note, reversed block */}
        <section
          data-wf="b-3-0"
          className="mb-14 px-6 py-7 sm:px-8 sm:py-9"
          style={{ backgroundColor: ink, color: paper, border: "3px solid " + ink, borderRadius: 0 }}
        >
          <div className="mb-3 flex items-center gap-3">
            <span
              style={{
                ...monoLabel,
                color: paper,
                borderBottom: "2px solid " + accent,
                paddingBottom: "2px",
              }}
            >
              § 02 — Regulatory position
            </span>
          </div>
          <p
            className="max-w-[70ch]"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.125rem)", lineHeight: 1.6 }}
          >
            Because no personal data is processed, India&rsquo;s DPDP Act consent-manager,
            parental-consent and CERT-In reporting obligations are documented as out of material scope.
          </p>
          <p className="mt-4" style={{ fontSize: "12px", lineHeight: 1.6, opacity: 0.78 }}>
            Recorded as an assumption pending legal confirmation. Reviewed 28 Oct 2026 · next review
            28 Apr 2027.
          </p>
        </section>

        {/* ROW 5 — conformance list */}
        <section data-wf="b-4-0" className="mb-14">
          <div
            className="flex flex-wrap items-end justify-between gap-3 pb-3"
            style={{ borderBottom: "3px solid " + ink }}
          >
            <h2
              style={{
                fontFamily: brand.fontHeading,
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 700,
                lineHeight: 1.05,
              }}
            >
              WCAG 2.1 AA conformance position
            </h2>
            <span
              className="inline-flex items-center gap-2"
              style={{ ...monoLabel, color: ink, fontVariantNumeric: "tabular-nums" }}
            >
              <Clock aria-hidden="true" className="h-4 w-4" />
              Audited 28 Oct 2026 · RC 1.0
            </span>
          </div>

          <ol className="mt-2">
            {CONFORMANCE.map((entry, i) => (
              <li
                key={entry.id}
                data-wf={entry.id}
                className="bs-row flex flex-col gap-2 py-5 sm:flex-row sm:items-start sm:gap-6"
                style={{
                  borderBottom: "1px dashed " + muted,
                  animationDelay: i * 60 + "ms",
                }}
              >
                <span
                  className="shrink-0 pt-1"
                  style={{
                    ...monoLabel,
                    color: accent,
                    fontSize: "13px",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0 flex-1">
                  <h3
                    style={{
                      ...monoLabel,
                      color: ink,
                      fontSize: "12px",
                      fontWeight: 700,
                      marginBottom: "4px",
                    }}
                  >
                    {entry.label}
                  </h3>
                  <p className="max-w-[68ch]" style={{ fontSize: "15px", lineHeight: 1.6 }}>
                    {entry.text}
                  </p>
                </div>

                <span
                  className="inline-flex shrink-0 items-center gap-2 self-start px-2 py-1"
                  style={{
                    ...monoLabel,
                    color: ink,
                    border: "2px solid " + ink,
                    letterSpacing: "0.12em",
                  }}
                >
                  {entry.stamp === "GATE" ? (
                    <AlertCircle aria-hidden="true" className="h-4 w-4" />
                  ) : (
                    <CheckCircle aria-hidden="true" className="h-4 w-4" />
                  )}
                  {entry.stamp}
                </span>
              </li>
            ))}
          </ol>

          <p
            className="mt-5 flex items-center gap-2"
            style={{ fontSize: "13px", color: muted, fontVariantNumeric: "tabular-nums" }}
          >
            <Check aria-hidden="true" className="h-4 w-4" />
            {openFailures === 0
              ? "Open WCAG 2.1 AA failures: 0. Release 1.0 is cleared to ship."
              : "Open WCAG 2.1 AA failures: " + openFailures + ". Release is held until they are closed."}
          </p>
        </section>

        {/* ROW 6 — back to calculator */}
        <div className="w-full sm:w-1/3">
          <Button
            data-wf="b-5-0"
            type="button"
            onClick={() => navigate("calculator")}
            className="bs-cta bs-focus inline-flex w-full items-center justify-center gap-3 px-6 py-4"
            style={{
              backgroundColor: ink,
              color: paper,
              border: "3px solid " + ink,
              borderRadius: 0,
              boxShadow: "6px 6px 0 " + accent,
              fontFamily: brand.fontBody,
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              minHeight: "52px",
            }}
          >
            <ArrowLeft aria-hidden="true" className="h-5 w-5" />
            Back to the calculator
          </Button>
        </div>

      </div>
    </div>
  );
}
