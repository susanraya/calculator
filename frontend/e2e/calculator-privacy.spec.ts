import { expect, test, type Page, type Request } from "@playwright/test";

// Digit/operator buttons are identified by the stable data-wf attribute the
// screen renders them with (see frontend/src/screens/Calculator.tsx), since
// several keys (7, 8, =, %) are not otherwise uniquely selectable by text.
const KEY = {
  "7": "b-4-0",
  "8": "b-4-1",
  "×": "b-4-3",
  "%": "b-3-2",
  AC: "b-3-0",
  C: "b-3-1",
  "=": "b-7-2",
};

async function press(page: Page, key: keyof typeof KEY) {
  await page.locator(`[data-wf="${KEY[key]}"]`).click();
}

const LOGIN_PATTERN = /log\s*in|log\s*out|sign\s*in|sign\s*up|register|account|password|username/i;
const PAYMENT_PATTERN =
  /pay(ment)?|subscri(be|ption)|billing|checkout|credit card|invoice|price|\$\d/i;

test.describe("US-010-2 calculator — no login, no payment, browser-only", () => {
  test("[AC-021] loading the calculator shows a usable keypad with no login, registration or account prompt", async ({
    page,
  }) => {
    await page.goto("/calculator");

    await expect(page.locator(`[data-wf="${KEY["7"]}"]`)).toBeVisible();
    await expect(page.locator(`[data-wf="${KEY["="]}"]`)).toBeVisible();

    const bodyText = await page.locator("body").innerText();
    expect(bodyText).not.toMatch(LOGIN_PATTERN);
    await expect(page.getByRole("textbox", { name: /email|password|username/i })).toHaveCount(0);
  });

  test("[AC-022] completing a full calculation surfaces no payment, subscription or billing prompt", async ({
    page,
  }) => {
    await page.goto("/calculator");

    await press(page, "7");
    await press(page, "×");
    await press(page, "8");
    await press(page, "=");

    await expect(page.locator("output")).toContainText("56");

    const bodyText = await page.locator("body").innerText();
    expect(bodyText).not.toMatch(PAYMENT_PATTERN);
  });

  test("[AC-023][NFR-002][NFR-004] after load, entry/arithmetic/percentage/clear raise no outbound requests beyond static assets and leave storage empty", async ({
    page,
  }) => {
    await page.goto("/calculator");
    // Let any late-arriving document/static-asset requests from the initial
    // navigation settle before the baseline is taken.
    await page.waitForLoadState("networkidle");

    const requestsAfterLoad: Request[] = [];
    page.on("request", (req) => requestsAfterLoad.push(req));

    await press(page, "7");
    await press(page, "×");
    await press(page, "8");
    await press(page, "=");
    await press(page, "7");
    await press(page, "%");
    await press(page, "AC");

    expect(
      requestsAfterLoad,
      `expected zero requests after load; saw: ${requestsAfterLoad.map((r) => r.url()).join(", ")}`,
    ).toHaveLength(0);

    const storage = await page.evaluate(() => ({
      localStorage: window.localStorage.length,
      sessionStorage: window.sessionStorage.length,
      cookies: document.cookie,
    }));
    expect(storage.localStorage).toBe(0);
    expect(storage.sessionStorage).toBe(0);
    expect(storage.cookies).toBe("");
  });

  test("[AC-024] the privacy statement records no personal data processed and DPDP/CERT-In scope position, cross-referenced to this e2e evidence", async ({
    page,
  }) => {
    await page.goto("/privacy-and-accessibility");

    const bodyText = await page.locator("body").innerText();
    expect(bodyText).toMatch(/collects no personal data/i);
    expect(bodyText).toMatch(/DPDP Act consent-manager/i);
    expect(bodyText).toMatch(/parental-consent/i);
    expect(bodyText).toMatch(/CERT-In reporting/i);
    expect(bodyText).toMatch(/out of material\s*scope/i);
    expect(bodyText).toMatch(/assumption pending legal confirmation/i);

    // Cross-reference: the same no-network/no-storage guarantee this page
    // claims is independently proven by the AC-023/NFR-002/NFR-004 test above
    // against the live calculator screen, not merely asserted here in prose.
  });
});
