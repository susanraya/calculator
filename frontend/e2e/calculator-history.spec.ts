import { expect, test, type Page, type Request } from "@playwright/test";

// Same stable data-wf keys as the sibling calculator specs (see
// frontend/src/screens/Calculator.tsx).
const KEY = {
  "3": "b-6-2",
  "5": "b-5-1",
  "7": "b-4-0",
  "8": "b-4-1",
  "×": "b-4-3",
  "+": "b-6-3",
  "=": "b-7-2",
};

async function press(page: Page, key: keyof typeof KEY) {
  await page.locator(`[data-wf="${KEY[key]}"]`).click();
}

const historyEntry = (page: Page, index: number) => page.locator(`[data-wf="i-2-1-${index}"]`);
const clearHistoryButton = (page: Page) => page.locator('[data-wf="b-3-4"]');

test.describe("US-012-2 calculator — client-side-only calculation history", () => {
  test("[AC-025] completing calculations lists them in the history panel in order", async ({
    page,
  }) => {
    await page.goto("/calculator");

    // No entries yet -> empty state, no history items rendered.
    await expect(historyEntry(page, 0)).toHaveCount(0);

    // First calculation: 7 x 8 = 56
    await press(page, "7");
    await press(page, "×");
    await press(page, "8");
    await press(page, "=");
    await expect(historyEntry(page, 0)).toContainText("56");

    // Second calculation: 3 + 5 = 8
    await press(page, "3");
    await press(page, "+");
    await press(page, "5");
    await press(page, "=");

    // Newest calculation is listed first, previous one pushed below it.
    await expect(historyEntry(page, 0)).toContainText("8");
    await expect(historyEntry(page, 1)).toContainText("56");
  });

  test("[AC-026] no request carrying calculation or history data is sent to the server, and nothing is persisted server-side", async ({
    page,
  }) => {
    await page.goto("/calculator");
    await page.waitForLoadState("networkidle");

    const requestsAfterLoad: Request[] = [];
    page.on("request", (req) => requestsAfterLoad.push(req));

    // Produce several history entries, then clear them -- neither action may
    // reach the network.
    await press(page, "7");
    await press(page, "×");
    await press(page, "8");
    await press(page, "=");
    await press(page, "3");
    await press(page, "+");
    await press(page, "5");
    await press(page, "=");
    await clearHistoryButton(page).click();
    await clearHistoryButton(page).click(); // confirm

    expect(
      requestsAfterLoad,
      `expected zero requests while using history; saw: ${requestsAfterLoad.map((r) => r.url()).join(", ")}`,
    ).toHaveLength(0);

    // A fresh load of the app proves nothing was persisted server-side: the
    // history panel starts empty again, with no entries surviving a reload.
    await page.reload();
    await expect(historyEntry(page, 0)).toHaveCount(0);
  });

  test("[AC-027] clearing history removes all entries and shows the empty state", async ({
    page,
  }) => {
    await page.goto("/calculator");

    await press(page, "7");
    await press(page, "×");
    await press(page, "8");
    await press(page, "=");
    await expect(historyEntry(page, 0)).toContainText("56");

    await clearHistoryButton(page).click(); // opens the confirm step
    await clearHistoryButton(page).click(); // confirms the clear

    await expect(historyEntry(page, 0)).toHaveCount(0);
    await expect(page.getByText(/history cleared/i)).toBeVisible();
    await expect(page.getByText(/nothing was ever sent anywhere/i)).toBeVisible();
  });
});
