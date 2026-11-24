import { Page } from '@playwright/test';

/**
 * Utility to freeze or fast-forward the browser system time using Playwright's clock API.
 * Useful for testing greeting boundaries (e.g., 02:59 vs 03:00, 11:59 vs 12:00, 14:59 vs 15:00, etc.).
 */
export async function setBrowserTime(page: Page, dateOrTimeString: string | Date) {
  const targetDate = typeof dateOrTimeString === 'string' 
    ? new Date(dateOrTimeString) 
    : dateOrTimeString;
  await page.clock.setFixedTime(targetDate);
}

/**
 * Utility to wait for network idle with safe timeout fallback.
 */
export async function waitForNetworkIdle(page: Page, timeout: number = 5000) {
  try {
    await page.waitForLoadState('networkidle', { timeout });
  } catch {
    // Graceful fallback if long polling or analytics keep network active
  }
}
