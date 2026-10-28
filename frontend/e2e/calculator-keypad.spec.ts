import { expect, test, type Page, type Request } from "@playwright/test";

// Same stable data-wf keys as frontend/e2e/calculator-privacy.spec.ts and
// frontend/src/screens/Calculator.test.tsx (see frontend/src/screens/Calculator.tsx).
const KEY = {
  "0": "b-7-0",
  "3": "b-6-2",
  "5": "b-5-1",
  "7": "b-4-0",
  "8": "b-4-1",
  "×": "b-4-3",
  "+": "b-6-3",
  "%": "b-3-2",
  AC: "b-3-0",
  C: "b-3-1",
  "=": "b-7-2",
};

async function click(page: Page, key: keyof typeof KEY) {
  await page.locator(`[data-wf="${KEY[key]}"]`).click();
}

// All on-screen keypad buttons carry a data-wf="b-R-C" attribute; this
// selector gathers every one of them regardless of row/column.
const ALL_KEY_BUTTONS = '[data-wf^="b-"]';

test.describe("US-006-2 calculator — keypad, keyboard entry, mixed input, responsive layout", () => {
  test("[AC-016] mixing on-screen clicks and keyboard keys within one calculation produces a single consistent result", async ({
    page,
  }) => {
    await page.goto("/calculator");

    // 7 (click) * (keyboard) 8 (click) Enter (keyboard) = 56
    await click(page, "7");
    await page.keyboard.press("*");
    await click(page, "8");
    await page.keyboard.press("Enter");
    await expect(page.locator("output")).toContainText("56");

    // Continue chaining: + (click) 5 (keyboard) = (click) -> 61
    await click(page, "+");
    await page.keyboard.press("5");
    await click(page, "=");
    await expect(page.locator("output")).toContainText("61");
  });

  test("[AC-017] at a 375px mobile viewport the display is visible, there is no horizontal scroll and tap targets are at least 44px", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/calculator");

    await expect(page.locator("output")).toBeVisible();

    const scrollInfo = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollInfo.scrollWidth).toBeLessThanOrEqual(scrollInfo.clientWidth + 1);

    const buttons = page.locator(ALL_KEY_BUTTONS);
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const el = buttons.nth(i);
      if (!(await el.isVisible())) continue;
      const tag = await el.evaluate((n) => n.tagName);
      if (tag !== "BUTTON") continue;
      const box = await el.boundingBox();
      expect(box, `button ${i} has no bounding box`).not.toBeNull();
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }

    // A full calculation still works at this viewport.
    await click(page, "7");
    await click(page, "×");
    await click(page, "8");
    await click(page, "=");
    await expect(page.locator("output")).toContainText("56");
  });

  test("[AC-018] at a 1280px desktop viewport the layout adapts and all controls remain usable", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/calculator");

    const scrollInfo = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollInfo.scrollWidth).toBeLessThanOrEqual(scrollInfo.clientWidth + 1);

    await expect(page.locator("output")).toBeVisible();
    await expect(page.locator(`[data-wf="${KEY["7"]}"]`)).toBeVisible();
    await expect(page.locator(`[data-wf="${KEY["="]}"]`)).toBeVisible();

    await click(page, "7");
    await click(page, "×");
    await click(page, "8");
    await click(page, "=");
    await expect(page.locator("output")).toContainText("56");
  });

  test("[AC-020] no network requests are issued while performing calculations after the page has loaded", async ({
    page,
  }) => {
    await page.goto("/calculator");
    await page.waitForLoadState("networkidle");

    const requestsAfterLoad: Request[] = [];
    page.on("request", (req) => requestsAfterLoad.push(req));

    await click(page, "7");
    await click(page, "×");
    await click(page, "8");
    await click(page, "=");
    await click(page, "+");
    await click(page, "3");
    await click(page, "%");
    await click(page, "C");
    await click(page, "AC");

    expect(
      requestsAfterLoad,
      `expected zero requests while calculating; saw: ${requestsAfterLoad.map((r) => r.url()).join(", ")}`,
    ).toHaveLength(0);
  });
});
