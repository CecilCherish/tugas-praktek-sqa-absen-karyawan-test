import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
  readonly nikInput: Locator;
  readonly namaInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitBtn: Locator;
  readonly backToLoginBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.nikInput = page.locator('input[name="nik"], #nik');
    this.namaInput = page.locator('input[name="nama"], #nama');
    this.emailInput = page.locator('input[type="email"], #email');
    this.passwordInput = page.locator('input[type="password"], #password');
    this.submitBtn = page.getByRole('button', { name: 'Daftar' });
    this.backToLoginBtn = page.getByRole('button', { name: 'disini' });
  }

  async goto() {
    await super.goto('/absen/register');
    await this.submitBtn.waitFor({ state: 'visible', timeout: 15000 });
  }

  async clickBackToLogin() {
    await this.backToLoginBtn.click();
  }
}
