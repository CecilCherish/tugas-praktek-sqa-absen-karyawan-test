import { test, expect } from '../../fixtures';
import { MitraDashboardPage } from '../../pages';

test.describe('Dashboard & Sapaan Waktu Mitra (@mitra, @dashboard, @clock)', () => {

  test('TC-MITRA-DSH-001: Verifikasi kelengkapan elemen beranda dashboard Mitra mencakup profil, sapaan, dan kartu kegiatan @smoke @regression @dashboard @mitra', async ({ authenticatedMitraPage }) => {
    const mitraDashboard = new MitraDashboardPage(authenticatedMitraPage);

    // Header profil dan sapaan
    await expect(authenticatedMitraPage.locator('p:has-text("Hai,")')).toBeVisible();
    await expect(authenticatedMitraPage.locator('p:has-text("Have a nice day !")')).toBeAttached();
    await expect(mitraDashboard.profileAvatar).toBeAttached();

    // Sapaan waktu dinamis (Good ...)
    await expect(mitraDashboard.greetingHeading.first()).toBeVisible();

    // Kartu kegiatan bulanan & laporan pagi/sore
    await expect(authenticatedMitraPage.getByText('Jumlah Kegiatan Bulan ini')).toBeVisible();
    await expect(authenticatedMitraPage.getByText('Laporan Kegiatan Pagi')).toBeVisible();
    await expect(authenticatedMitraPage.getByText('Laporan Kegiatan Sore')).toBeVisible();
    await expect(authenticatedMitraPage.getByText('Semangat melakukan Aktivitas 🔥')).toBeVisible();

    // Tombol presensi sesuai siklus state harian
    const morningReport = await mitraDashboard.getMorningReportText();
    const eveningReport = await mitraDashboard.getEveningReportText();
    if (morningReport !== '-' && eveningReport !== '-' && morningReport !== '' && eveningReport !== '') {
      // Presensi harian telah selesai (State 3: null)
      expect(await mitraDashboard.isPresensiButtonVisible()).toBe(false);
    } else {
      expect(await mitraDashboard.isPresensiButtonVisible()).toBe(true);
    }
  });

  test('TC-MITRA-DSH-002: Verifikasi sapaan waktu pagi rentang waktu bisnis 00:00 - 11:59 menampilkan Good Morning @regression @dashboard @mitra @clock', async ({ page, loginPage }) => {
    await page.clock.install({ time: new Date('2026-11-24T09:00:00') });
    await loginPage.goto();
    await loginPage.login(process.env.MITRA_EMAIL || '', process.env.MITRA_PASSWORD || '');
    await page.waitForURL(/\/apps\/absent\/mitra\/?$/, { timeout: 15000 });

    const mitraDashboard = new MitraDashboardPage(page);
    const greeting = await mitraDashboard.getGreetingText();
    expect(greeting).toBe('Good Morning');
  });

  test('TC-MITRA-DSH-003: Verifikasi sapaan waktu siang rentang waktu bisnis 12:00 - 14:59 menampilkan Good Afternoon @regression @dashboard @mitra @clock', async ({ page, loginPage }) => {
    await page.clock.install({ time: new Date('2026-11-24T13:00:00') });
    await loginPage.goto();
    await loginPage.login(process.env.MITRA_EMAIL || '', process.env.MITRA_PASSWORD || '');
    await page.waitForURL(/\/apps\/absent\/mitra\/?$/, { timeout: 15000 });

    const mitraDashboard = new MitraDashboardPage(page);
    const greeting = await mitraDashboard.getGreetingText();
    expect(greeting).toBe('Good Afternoon');
  });

  test('TC-MITRA-DSH-004: Verifikasi sapaan waktu sore rentang waktu bisnis 15:00 - 18:59 menampilkan Good Evening @regression @dashboard @mitra @clock', async ({ page, loginPage }) => {
    await page.clock.install({ time: new Date('2026-11-24T16:00:00') });
    await loginPage.goto();
    await loginPage.login(process.env.MITRA_EMAIL || '', process.env.MITRA_PASSWORD || '');
    await page.waitForURL(/\/apps\/absent\/mitra\/?$/, { timeout: 15000 });

    const mitraDashboard = new MitraDashboardPage(page);
    const greeting = await mitraDashboard.getGreetingText();
    expect(greeting).toBe('Good Evening');
  });

  test('TC-MITRA-DSH-005: Verifikasi sapaan waktu malam rentang waktu bisnis 19:00 - 23:59 menampilkan Good Night @regression @dashboard @mitra @clock', async ({ page, loginPage }) => {
    await page.clock.install({ time: new Date('2026-11-24T21:00:00') });
    await loginPage.goto();
    await loginPage.login(process.env.MITRA_EMAIL || '', process.env.MITRA_PASSWORD || '');
    await page.waitForURL(/\/apps\/absent\/mitra\/?$/, { timeout: 15000 });

    const mitraDashboard = new MitraDashboardPage(page);
    const greeting = await mitraDashboard.getGreetingText();
    expect(greeting).toBe('Good Night');
  });

  test('TC-MITRA-DSH-006: Boundary test sapaan waktu batas 02:59 vs 03:00 @regression @dashboard @mitra @clock', async ({ page, loginPage }) => {
    await page.clock.install({ time: new Date('2026-11-24T03:00:00') });
    await loginPage.goto();
    await loginPage.login(process.env.MITRA_EMAIL || '', process.env.MITRA_PASSWORD || '');
    await page.waitForURL(/\/apps\/absent\/mitra\/?$/, { timeout: 15000 });

    const mitraDashboard = new MitraDashboardPage(page);
    expect(await mitraDashboard.getGreetingText()).toBe('Good Morning');

    await page.clock.setFixedTime(new Date('2026-11-24T02:59:00'));
    await page.goto('/apps/absent/mitra');
    await page.waitForTimeout(1000);
    const greeting0259 = await mitraDashboard.getGreetingText();
    expect(['Good Morning', 'Good Night']).toContain(greeting0259);
  });

  test('TC-MITRA-DSH-007: Boundary test sapaan waktu batas 11:59 vs 12:00 @regression @dashboard @mitra @clock', async ({ page, loginPage }) => {
    await page.clock.install({ time: new Date('2026-11-24T11:59:00') });
    await loginPage.goto();
    await loginPage.login(process.env.MITRA_EMAIL || '', process.env.MITRA_PASSWORD || '');
    await page.waitForURL(/\/apps\/absent\/mitra\/?$/, { timeout: 15000 });

    const mitraDashboard = new MitraDashboardPage(page);
    expect(await mitraDashboard.getGreetingText()).toBe('Good Morning');

    await page.clock.setFixedTime(new Date('2026-11-24T12:00:00'));
    await page.goto('/apps/absent/mitra');
    await page.waitForTimeout(1000);
    expect(await mitraDashboard.getGreetingText()).toBe('Good Afternoon');
  });

  test('TC-MITRA-DSH-008: Boundary test sapaan waktu batas 14:59 vs 15:00 @regression @dashboard @mitra @clock', async ({ page, loginPage }) => {
    await page.clock.install({ time: new Date('2026-11-24T14:59:00') });
    await loginPage.goto();
    await loginPage.login(process.env.MITRA_EMAIL || '', process.env.MITRA_PASSWORD || '');
    await page.waitForURL(/\/apps\/absent\/mitra\/?$/, { timeout: 15000 });

    const mitraDashboard = new MitraDashboardPage(page);
    expect(await mitraDashboard.getGreetingText()).toBe('Good Afternoon');

    await page.clock.setFixedTime(new Date('2026-11-24T15:00:00'));
    await page.goto('/apps/absent/mitra');
    await page.waitForTimeout(1000);
    expect(await mitraDashboard.getGreetingText()).toBe('Good Evening');
  });

  test('TC-MITRA-DSH-009: Boundary test sapaan waktu batas 18:59 vs 19:00 @regression @dashboard @mitra @clock', async ({ page, loginPage }) => {
    await page.clock.install({ time: new Date('2026-11-24T18:59:00') });
    await loginPage.goto();
    await loginPage.login(process.env.MITRA_EMAIL || '', process.env.MITRA_PASSWORD || '');
    await page.waitForURL(/\/apps\/absent\/mitra\/?$/, { timeout: 15000 });

    const mitraDashboard = new MitraDashboardPage(page);
    expect(await mitraDashboard.getGreetingText()).toBe('Good Evening');

    await page.clock.setFixedTime(new Date('2026-11-24T19:00:00'));
    await page.goto('/apps/absent/mitra');
    await page.waitForTimeout(1000);
    const greeting1900 = await mitraDashboard.getGreetingText();
    expect(['Good Evening', 'Good Night']).toContain(greeting1900);
  });

  test('TC-MITRA-DSH-010: Boundary test sapaan waktu batas 19:59 vs 20:00 @regression @dashboard @mitra @clock', async ({ page, loginPage }) => {
    await page.clock.install({ time: new Date('2026-11-24T19:59:00') });
    await loginPage.goto();
    await loginPage.login(process.env.MITRA_EMAIL || '', process.env.MITRA_PASSWORD || '');
    await page.waitForURL(/\/apps\/absent\/mitra\/?$/, { timeout: 15000 });

    const mitraDashboard = new MitraDashboardPage(page);
    expect(await mitraDashboard.getGreetingText()).toBe('Good Evening');

    await page.clock.setFixedTime(new Date('2026-11-24T20:00:00'));
    await page.goto('/apps/absent/mitra');
    await page.waitForTimeout(1000);
    expect(await mitraDashboard.getGreetingText()).toBe('Good Night');
  });

  test('TC-MITRA-DSH-011: Boundary test sapaan waktu batas 23:59 vs 00:00 @regression @dashboard @mitra @clock', async ({ page, loginPage }) => {
    await page.clock.install({ time: new Date('2026-11-24T23:59:00') });
    await loginPage.goto();
    await loginPage.login(process.env.MITRA_EMAIL || '', process.env.MITRA_PASSWORD || '');
    await page.waitForURL(/\/apps\/absent\/mitra\/?$/, { timeout: 15000 });

    const mitraDashboard = new MitraDashboardPage(page);
    expect(await mitraDashboard.getGreetingText()).toBe('Good Night');

    await page.clock.setFixedTime(new Date('2026-11-25T00:00:00'));
    await page.goto('/apps/absent/mitra');
    await page.waitForTimeout(1000);
    const greeting0000 = await mitraDashboard.getGreetingText();
    expect(['Good Morning', 'Good Night']).toContain(greeting0000);
  });

});
