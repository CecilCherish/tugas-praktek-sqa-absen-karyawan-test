import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ResetPasswordPage extends BasePage {
  readonly emailInput: Locator;
  readonly submitBtn: Locator;
  readonly backToLoginBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('input[type="email"], #email');
    this.submitBtn = page.getByRole('button', { name: 'Submit' });
    this.backToLoginBtn = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await super.goto('/absen/reset-password-request');
    await this.submitBtn.waitFor({ state: 'visible', timeout: 15000 });
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async clickSubmit() {
    await this.submitBtn.click();
  }

  async clickBackToLogin() {
    await this.backToLoginBtn.click();
  }
}
