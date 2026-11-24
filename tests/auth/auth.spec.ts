import { test, expect } from '../../fixtures';
import { config } from '../../utils/env';

test.describe('Modul Autentikasi (@auth)', () => {

  test('TC-AUTH-001: Verifikasi login berhasil menggunakan kredensial Karyawan PKWT valid @smoke @regression @auth @pkwt', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(config.pkwt.email, config.pkwt.password);
    await page.waitForURL(/\/apps\/absent\/?$/, { timeout: 15000 });
    await expect(page).toHaveURL(/\/apps\/absent\/?$/);
    await expect(page.locator('p:has-text("Hai,")')).toBeVisible({ timeout: 10000 });
  });

  test('TC-AUTH-002: Verifikasi login berhasil menggunakan kredensial Karyawan Mitra valid @smoke @regression @auth @mitra', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(config.mitra.email, config.mitra.password);
    await page.waitForURL(/\/apps\/absent\/mitra\/?$/, { timeout: 15000 });
    await expect(page).toHaveURL(/\/apps\/absent\/mitra\/?$/);
    await expect(page.locator('p:has-text("Hai,")')).toBeVisible({ timeout: 10000 });
  });

  test('TC-AUTH-003: Verifikasi penolakan login saat field email dan kata sandi dikosongkan @regression @auth', async ({ loginPage }) => {
    await loginPage.goto();
    // Bypass browser native HTML5 validation by submitting directly
    await loginPage.emailInput.evaluate((el: HTMLInputElement) => el.form?.setAttribute('novalidate', 'true'));
    await loginPage.clickSubmit();
    const alertMsg = await loginPage.getAlertMessage();
    expect(alertMsg).toContain('Akun tidak ditemukan');
  });

  test('TC-AUTH-004: Verifikasi penolakan login saat memasukkan format email tidak valid tanpa karakter @ @regression @auth', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.fillEmail('emailtanpaformat');
    await loginPage.fillPassword('sembarangKataSandi123');
    // Disable native constraint validation to simulate client-server submission
    await loginPage.emailInput.evaluate((el: HTMLInputElement) => el.form?.setAttribute('novalidate', 'true'));
    await loginPage.clickSubmit();
    const alertMsg = await loginPage.getAlertMessage();
    expect(alertMsg).toContain('Akun tidak ditemukan');
  });

  test('TC-AUTH-005: Verifikasi penolakan login saat memasukkan email yang tidak terdaftar di sistem @regression @auth', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('user_tidak_terdaftar_999@corp.com', 'SalahPassword123!');
    const alertMsg = await loginPage.getAlertMessage();
    expect(alertMsg).toContain('Akun tidak ditemukan');
  });

  test('TC-AUTH-006: Verifikasi penolakan login saat memasukkan email terdaftar dengan kata sandi yang salah @regression @auth', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(config.pkwt.email, 'SalahKataSandi999!');
    const alertMsg = await loginPage.getAlertMessage();
    expect(alertMsg).toContain('Email atau password salah');
  });

  test('TC-AUTH-007: Verifikasi fungsi tombol toggle untuk melihat dan menyembunyikan karakter kata sandi @regression @auth', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.fillPassword('RahasiaSandi123');
    expect(await loginPage.getPasswordInputType()).toBe('password');

    // Click toggle to reveal password
    await loginPage.togglePasswordVisibility();
    expect(await loginPage.getPasswordInputType()).toBe('text');

    // Click toggle to disguise password again
    await loginPage.togglePasswordVisibility();
    expect(await loginPage.getPasswordInputType()).toBe('password');
  });

  test('TC-AUTH-008: Verifikasi tautan Lupa password membuka halaman permohonan reset kata sandi @regression @auth', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.clickForgotPassword();
    await page.waitForURL(/\/absen\/reset-password-request/, { timeout: 10000 });
    await expect(page).toHaveURL(/\/absen\/reset-password-request/);
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  });

  test('TC-AUTH-009: Verifikasi penolakan form reset password saat email dikosongkan @regression @auth', async ({ resetPasswordPage, page }) => {
    await resetPasswordPage.goto();
    // Allow empty submission
    await resetPasswordPage.emailInput.evaluate((el: HTMLInputElement) => el.form?.setAttribute('novalidate', 'true'));
    await resetPasswordPage.clickSubmit();
    const alertMsg = await resetPasswordPage.getAlertMessage();
    expect(alertMsg).toContain('User not found.');
  });

  test('TC-AUTH-010: Verifikasi tautan pendaftaran disini membuka halaman formulir pendaftaran akun @regression @auth', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.clickRegister();
    await page.waitForURL(/\/absen\/register/, { timeout: 10000 });
    await expect(page).toHaveURL(/\/absen\/register/);
    await expect(page.getByRole('button', { name: 'Daftar' })).toBeVisible();
  });

  test('TC-AUTH-011: Verifikasi banner alert pesan error dapat ditutup secara interaktif menggunakan tombol silang @regression @auth', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('user_tidak_terdaftar_999@corp.com', 'SalahPassword123!');
    await expect(loginPage.alertBanner).toBeVisible({ timeout: 10000 });

    // Close the alert
    await loginPage.closeAlert();
    await expect(loginPage.alertBanner).toBeHidden({ timeout: 5000 });
  });

});
