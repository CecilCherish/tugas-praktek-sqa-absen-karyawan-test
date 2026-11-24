import { test, expect } from '../../fixtures';

test.describe('Navigasi 8 Menu PKWT (@pkwt, @navigation)', () => {

  test('TC-PKWT-NAV-001: Verifikasi navigasi menu Absensi membuka halaman riwayat presensi lengkap @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent');
    await pkwtDashboardPage.clickMenu('Absensi');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/activity/, { timeout: 15000 });
    await expect(authenticatedPkwtPage).toHaveURL(/\/apps\/absent\/activity/);
    await expect(authenticatedPkwtPage.locator('text="History Absensi"').first()).toBeVisible();

    // Kembali ke dashboard
    await authenticatedPkwtPage.locator('button:has(svg)').first().click();
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/?$/, { timeout: 15000 });
  });

  test('TC-PKWT-NAV-002: Verifikasi navigasi menu Koreksi Absen membuka halaman daftar koreksi presensi @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent');
    await pkwtDashboardPage.clickMenu('Koreksi Absen');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/correction/, { timeout: 15000 });
    await expect(authenticatedPkwtPage).toHaveURL(/\/apps\/absent\/correction/);
    await expect(authenticatedPkwtPage.locator('text="Halaman Koreksi"').first()).toBeVisible();
    await expect(authenticatedPkwtPage.getByRole('button', { name: 'Ajukan Koreksi' })).toBeVisible();

    // Kembali
    await authenticatedPkwtPage.locator('button:has(svg)').first().click();
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/?$/, { timeout: 15000 });
  });

  test('TC-PKWT-NAV-003: Verifikasi navigasi menu Izin dan fungsionalitas pergantian tab Terlambat vs Pulang Cepat @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent');
    await pkwtDashboardPage.clickMenu('Izin');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/permit/, { timeout: 15000 });
    await expect(authenticatedPkwtPage).toHaveURL(/\/apps\/absent\/permit/);
    await expect(authenticatedPkwtPage.locator('text="Halaman Izin"').first()).toBeVisible();

    // Verifikasi tab Terlambat aktif
    await expect(authenticatedPkwtPage.getByRole('button', { name: 'Ajukan Izin Terlambat' })).toBeVisible();

    // Pindah ke tab Pulang Cepat
    const pulangCepatTab = authenticatedPkwtPage.locator('button[role="tab"]:has-text("Pulang Cepat"), [role="tab"]:has-text("Pulang Cepat")').first();
    await pulangCepatTab.click();
    await expect(authenticatedPkwtPage.getByRole('button', { name: /Ajukan (Izin )?Pulang Cepat/ })).toBeVisible();

    // Kembali
    await authenticatedPkwtPage.locator('button:has(svg)').first().click();
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/?$/, { timeout: 15000 });
  });

  test('TC-PKWT-NAV-004: Verifikasi navigasi menu Lembur membuka halaman daftar dan pengajuan lembur @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent');
    await pkwtDashboardPage.clickMenu('Lembur');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/overtime-client/, { timeout: 15000 });
    await expect(authenticatedPkwtPage).toHaveURL(/\/apps\/absent\/overtime-client/);
    await expect(authenticatedPkwtPage.locator('text="Halaman Lembur"').first()).toBeVisible();
    await expect(authenticatedPkwtPage.getByRole('button', { name: 'Ajukan Lembur' })).toBeVisible();

    // Kembali
    await authenticatedPkwtPage.locator('button:has(svg)').first().click();
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/?$/, { timeout: 15000 });
  });

  test('TC-PKWT-NAV-005: Verifikasi navigasi menu Cuti membuka halaman daftar dan pengajuan cuti @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent');
    await pkwtDashboardPage.clickMenu('Cuti');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/leave-client/, { timeout: 15000 });
    await expect(authenticatedPkwtPage).toHaveURL(/\/apps\/absent\/leave-client/);
    await expect(authenticatedPkwtPage.locator('text="Halaman Cuti"').first()).toBeVisible();
    await expect(authenticatedPkwtPage.getByRole('button', { name: 'Ajukan Cuti' })).toBeVisible();

    // Kembali
    await authenticatedPkwtPage.locator('button:has(svg)').first().click();
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/?$/, { timeout: 15000 });
  });

  test('TC-PKWT-NAV-006: Verifikasi navigasi menu Sakit membuka halaman permohonan izin sakit @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent');
    await pkwtDashboardPage.clickMenu('Sakit');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/sick/, { timeout: 15000 });
    await expect(authenticatedPkwtPage).toHaveURL(/\/apps\/absent\/sick/);
    await expect(authenticatedPkwtPage.locator('text="Halaman Sakit"').first()).toBeVisible();
    await expect(authenticatedPkwtPage.getByRole('button', { name: 'Ajukan Sakit' })).toBeVisible();

    // Kembali
    await authenticatedPkwtPage.locator('button:has(svg)').first().click();
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/?$/, { timeout: 15000 });
  });

  test('TC-PKWT-NAV-007: Verifikasi navigasi menu Download Reports dan verifikasi dropdown pilihan tipe report @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent');
    await pkwtDashboardPage.clickMenu('Download Reports');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/reports\/share_report/, { timeout: 15000 });
    await expect(authenticatedPkwtPage).toHaveURL(/\/apps\/absent\/reports\/share_report/);
    await expect(authenticatedPkwtPage.locator('text="Halaman Download Report"').first()).toBeVisible();

    // Buka dropdown pilihan tipe report
    const dropdown = authenticatedPkwtPage.locator('#demo-simple-select, [role="combobox"]').first();
    await dropdown.click();

    // Verifikasi pilihan Harian, Mingguan, Bulanan
    await expect(authenticatedPkwtPage.locator('li[role="option"]:has-text("Harian")')).toBeVisible();
    await expect(authenticatedPkwtPage.locator('li[role="option"]:has-text("Mingguan")')).toBeVisible();
    await expect(authenticatedPkwtPage.locator('li[role="option"]:has-text("Bulanan")')).toBeVisible();

    // Tutup dropdown
    await authenticatedPkwtPage.keyboard.press('Escape');

    // Kembali
    await authenticatedPkwtPage.locator('button:has(svg)').first().click();
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/?$/, { timeout: 15000 });
  });

  test('TC-PKWT-NAV-008: Verifikasi navigasi menu Staff membuka halaman daftar rekan staf @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent');
    await pkwtDashboardPage.clickMenu('Staff');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/staff/, { timeout: 15000 });
    await expect(authenticatedPkwtPage).toHaveURL(/\/apps\/absent\/staff/);
    await expect(authenticatedPkwtPage.locator('text="View Staff"').first()).toBeVisible();

    // Kembali
    await authenticatedPkwtPage.locator('button:has(svg)').first().click();
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/?$/, { timeout: 15000 });
  });

  test('TC-PKWT-NAV-009: Verifikasi tautan Selengkapnya pada section History Absensi membuka riwayat lengkap @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent');
    await expect(pkwtDashboardPage.seeAllHistoryLink).toBeVisible();
    await pkwtDashboardPage.seeAllHistoryLink.click();
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/activity/, { timeout: 15000 });
    await expect(authenticatedPkwtPage).toHaveURL(/\/apps\/absent\/activity/);
    await expect(authenticatedPkwtPage.locator('text="History Absensi"').first()).toBeVisible();
  });

});
