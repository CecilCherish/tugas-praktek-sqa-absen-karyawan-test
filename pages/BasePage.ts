import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly drawerMenuBtn: Locator;
  readonly drawerContainer: Locator;
  readonly changePasswordLink: Locator;
  readonly logoutBtn: Locator;
  readonly alertBanner: Locator;
  readonly alertCloseBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.drawerMenuBtn = page.locator('button:has(img[alt="menu"])');
    this.drawerContainer = page.locator('.MuiDrawer-paper, [role="presentation"]');
    this.changePasswordLink = page.locator('.MuiListItem-root:has-text("Change Password")');
    this.logoutBtn = page.locator('button:has-text("Logout")');
    this.alertBanner = page.locator('div[role="alert"]');
    this.alertCloseBtn = page.locator('div[role="alert"] button[aria-label="close"]');
  }

  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  async waitForUrl(urlOrRegex: string | RegExp) {
    await this.page.waitForURL(urlOrRegex, { timeout: 15000 });
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async openDrawer() {
    await this.drawerMenuBtn.click();
    await this.logoutBtn.waitFor({ state: 'visible', timeout: 5000 });
  }

  async logout() {
    await this.openDrawer();
    await this.logoutBtn.click();
    await this.page.waitForURL(/\/absen\/login/, { timeout: 15000 });
  }

  async getAlertMessage(): Promise<string> {
    await this.alertBanner.waitFor({ state: 'visible', timeout: 7000 });
    return (await this.alertBanner.textContent()) || '';
  }

  async closeAlert() {
    await this.alertCloseBtn.click();
    await this.alertBanner.waitFor({ state: 'hidden', timeout: 5000 });
  }

  async isAlertVisible(): Promise<boolean> {
    return await this.alertBanner.isVisible();
  }
}
