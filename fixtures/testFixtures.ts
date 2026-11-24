import { test as base, Page, expect } from '@playwright/test';
import {
  LoginPage,
  PkwtDashboardPage,
  MitraDashboardPage,
  ResetPasswordPage,
  RegisterPage,
} from '../pages';
import { config } from '../utils/env';

// Type definitions for our custom fixtures
type CustomFixtures = {
  loginPage: LoginPage;
  pkwtDashboardPage: PkwtDashboardPage;
  mitraDashboardPage: MitraDashboardPage;
  resetPasswordPage: ResetPasswordPage;
  registerPage: RegisterPage;
  authenticatedPkwtPage: Page;
  authenticatedMitraPage: Page;
  geoDeniedMitraPage: Page;
};

export const test = base.extend<CustomFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  pkwtDashboardPage: async ({ page }, use) => {
    const pkwtDashboardPage = new PkwtDashboardPage(page);
    await use(pkwtDashboardPage);
  },

  mitraDashboardPage: async ({ page }, use) => {
    const mitraDashboardPage = new MitraDashboardPage(page);
    await use(mitraDashboardPage);
  },

  resetPasswordPage: async ({ page }, use) => {
    const resetPasswordPage = new ResetPasswordPage(page);
    await use(resetPasswordPage);
  },

  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },

  authenticatedPkwtPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(config.pkwt.email, config.pkwt.password);
    await page.waitForURL(/\/apps\/absent\/?$/, { timeout: 15000 });
    await expect(page.locator('p:has-text("Hai,")')).toBeVisible({ timeout: 10000 });
    await use(page);
  },

  authenticatedMitraPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      permissions: ['geolocation'],
      geolocation: { latitude: -6.2088, longitude: 106.8456 }, // Central Jakarta coordinates
    });
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(config.mitra.email, config.mitra.password);
    await page.waitForURL(/\/apps\/absent\/mitra\/?$/, { timeout: 15000 });
    await expect(page.locator('p:has-text("Hai,")')).toBeVisible({ timeout: 10000 });
    await use(page);
    await context.close();
  },

  geoDeniedMitraPage: async ({ browser }, use) => {
    // Context with geolocation explicitly cleared/denied
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      permissions: [],
    });
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(config.mitra.email, config.mitra.password);
    await page.waitForURL(/\/apps\/absent\/mitra\/?$/, { timeout: 15000 });
    await use(page);
    await context.close();
  },
});

export { expect } from '@playwright/test';
