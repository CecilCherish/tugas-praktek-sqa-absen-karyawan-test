import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordToggleBtn: Locator;
  readonly submitBtn: Locator;
  readonly forgotPasswordLink: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    // MUI InputAdornment button adjacent to password input
    this.passwordToggleBtn = page.locator('#password').locator('..').locator('button');
    this.submitBtn = page.locator('button[type="submit"]');
    this.forgotPasswordLink = page.getByRole('button', { name: 'Lupa password ?' });
    this.registerLink = page.getByRole('button', { name: 'disini' });
  }

  async goto() {
    await super.goto('/absen/login');
    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async togglePasswordVisibility() {
    await this.passwordToggleBtn.click();
  }

  async getPasswordInputType(): Promise<string | null> {
    return await this.passwordInput.getAttribute('type');
  }

  async clickSubmit() {
    await this.submitBtn.click();
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSubmit();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  async clickRegister() {
    await this.registerLink.click();
  }
}
