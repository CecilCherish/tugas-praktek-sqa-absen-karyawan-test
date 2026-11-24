import { test, expect } from '../../fixtures';
import { config } from '../../utils/env';

test.describe('Keamanan Sesi & Route Guard (@auth, @security)', () => {

  test('TC-SEC-001: Verifikasi pembatasan akses langsung ke alamat dashboard PKWT tanpa login aktif @regression @auth @pkwt', async ({ page }) => {
    await page.goto('/apps/absent');
    await page.waitForURL(/\/absen\/login/, { timeout: 15000 });
    await expect(page).toHaveURL(/\/absen\/login/);
    await expect(page.locator('#email')).toBeVisible();
  });

  test('TC-SEC-002: Verifikasi pembatasan akses langsung ke alamat dashboard Mitra tanpa login aktif @regression @auth @mitra', async ({ page }) => {
    await page.goto('/apps/absent/mitra');
    await page.waitForURL(/\/absen\/login/, { timeout: 15000 });
    await expect(page).toHaveURL(/\/absen\/login/);
    await expect(page.locator('#email')).toBeVisible();
  });

  test('TC-SEC-003: Verifikasi perlindungan hak akses saat Karyawan Mitra membuka alamat dashboard PKWT @regression @auth @mitra', async ({ authenticatedMitraPage }) => {
    // Navigate Mitra user to PKWT dashboard
    await authenticatedMitraPage.goto('/apps/absent');
    await authenticatedMitraPage.waitForURL(/\/apps\/absent\/mitra/, { timeout: 15000 });
    await expect(authenticatedMitraPage).toHaveURL(/\/apps\/absent\/mitra/);
    await expect(authenticatedMitraPage.locator('p:has-text("Hai,")')).toBeVisible();
  });

  test('TC-SEC-004: Verifikasi perlindungan hak akses saat Karyawan PKWT membuka alamat dashboard Mitra @regression @auth @pkwt', async ({ authenticatedPkwtPage }) => {
    // Navigate PKWT user to Mitra dashboard
    await authenticatedPkwtPage.goto('/apps/absent/mitra');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/?$/, { timeout: 15000 });
    await expect(authenticatedPkwtPage).toHaveURL(/\/apps\/absent\/?$/);
    await expect(authenticatedPkwtPage.locator('p:has-text("Hai,")')).toBeVisible();
  });

  test('TC-SEC-005: Verifikasi sistem saat pengguna yang telah login mengakses kembali alamat halaman login @regression @auth', async ({ authenticatedPkwtPage }) => {
    await authenticatedPkwtPage.goto('/absen/login');
    await expect(authenticatedPkwtPage).toHaveURL(/\/absen\/login/);
    await expect(authenticatedPkwtPage.locator('#email')).toBeVisible();
  });

  test('TC-SEC-006: Verifikasi fungsi Logout pada akun Karyawan PKWT mengakhiri sesi pengguna @regression @auth @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    // Open drawer and click Logout
    await authenticatedPkwtPage.locator('button:has(img[alt="menu"])').click();
    await authenticatedPkwtPage.locator('button:has-text("Logout")').waitFor({ state: 'visible', timeout: 5000 });
    await authenticatedPkwtPage.locator('button:has-text("Logout")').click();
    await authenticatedPkwtPage.waitForURL(/\/absen\/login/, { timeout: 15000 });
    await expect(authenticatedPkwtPage).toHaveURL(/\/absen\/login/);

    // Verify navigating back does not restore protected session
    await authenticatedPkwtPage.goBack();
    await authenticatedPkwtPage.waitForTimeout(2000);
    // Should still stay on login or redirect to login
    await expect(authenticatedPkwtPage).toHaveURL(/\/absen\/login/);
  });

  test('TC-SEC-007: Verifikasi fungsi Logout pada akun Karyawan Mitra mengakhiri sesi pengguna @regression @auth @mitra', async ({ authenticatedMitraPage }) => {
    // Open drawer and click Logout
    await authenticatedMitraPage.locator('button:has(img[alt="menu"])').click();
    await authenticatedMitraPage.locator('button:has-text("Logout")').waitFor({ state: 'visible', timeout: 5000 });
    await authenticatedMitraPage.locator('button:has-text("Logout")').click();
    await authenticatedMitraPage.waitForURL(/\/absen\/login/, { timeout: 15000 });
    await expect(authenticatedMitraPage).toHaveURL(/\/absen\/login/);
  });

});
