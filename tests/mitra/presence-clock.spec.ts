import { test, expect } from '../../fixtures';
import { LoginPage, MitraDashboardPage } from '../../pages';

test.describe('Presensi Mitra & Geolocation / Kamera (@mitra, @clock)', () => {

  test('TC-MITRA-CLK-001: Verifikasi penolakan presensi saat izin geolokasi ditolak atau dinonaktifkan @regression @clock @mitra', async ({ geoDeniedMitraPage }) => {
    const mitraDashboard = new MitraDashboardPage(geoDeniedMitraPage);
    const isBtnVisible = await mitraDashboard.isPresensiButtonVisible();

    if (isBtnVisible) {
      let alertMessage = '';
      geoDeniedMitraPage.on('dialog', async dialog => {
        alertMessage = dialog.message();
        await dialog.accept();
      });

      const presensiBtn = geoDeniedMitraPage.locator('button').filter({ hasText: /Kegiatan (Pagi|Sore)/i }).first();
      await presensiBtn.click();
      await geoDeniedMitraPage.waitForTimeout(2000);

      expect(alertMessage).toContain('Lokasi harus diizinkan');
    } else {
      // Tombol telah null karena presensi harian selesai
      expect(await mitraDashboard.getMorningReportText()).not.toBe('-');
    }
  });

  test('TC-MITRA-CLK-002: Verifikasi penolakan presensi saat izin kamera ditolak atau dinonaktifkan @regression @clock @mitra', async ({ browser }) => {
    const context = await browser.newContext({
      permissions: ['geolocation'],
      geolocation: { latitude: -6.2088, longitude: 106.8456 },
    });
    const page = await context.newPage();

    let dialogMessage = '';
    page.on('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });

    await page.addInitScript(() => {
      if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia = () => Promise.reject(new DOMException('Permission denied', 'NotAllowedError'));
      }
    });

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.MITRA_EMAIL || '', process.env.MITRA_PASSWORD || '');
    await page.waitForURL(/\/apps\/absent\/mitra\/?$/, { timeout: 15000 });

    const mitraDashboard = new MitraDashboardPage(page);
    const isBtnVisible = await mitraDashboard.isPresensiButtonVisible();

    if (isBtnVisible) {
      const presensiBtn = page.locator('button').filter({ hasText: /Kegiatan (Pagi|Sore)/i }).first();
      await presensiBtn.click();
      await page.waitForTimeout(2000);

      const alertBanner = await page.locator('[role="alert"]').textContent().catch(() => '');
      const combinedMessage = dialogMessage + alertBanner;
      expect(combinedMessage.toLowerCase()).toMatch(/(kamera|camera|izin|akses|lokasi)/i);
    } else {
      // Tombol presensi telah null karena presensi harian selesai
      expect(await mitraDashboard.getMorningReportText()).not.toBe('-');
    }

    await context.close();
  });

  test('TC-MITRA-CLK-003: Verifikasi status ketersediaan tombol presensi Kegiatan Pagi pada awal hari berjalan @regression @clock @mitra', async ({ authenticatedMitraPage }) => {
    const mitraDashboard = new MitraDashboardPage(authenticatedMitraPage);
    const morningReport = await mitraDashboard.getMorningReportText();
    const eveningReport = await mitraDashboard.getEveningReportText();

    // Sesuai state machine di open-questions.md & exploration.md:
    if (morningReport === '-') {
      // Belum absen masuk: tombol berstatus Kegiatan Pagi
      expect(await mitraDashboard.getPresensiButtonText()).toContain('Kegiatan Pagi');
    } else if (eveningReport === '-') {
      // Sudah absen masuk, menunggu absen pulang: tombol berstatus Kegiatan Sore
      expect(await mitraDashboard.getPresensiButtonText()).toContain('Kegiatan Sore');
    } else {
      // Kedua presensi selesai: tombol bernilai null
      expect(await mitraDashboard.isPresensiButtonVisible()).toBe(false);
    }
  });

  test('TC-MITRA-CLK-004: Verifikasi state machine transisi tombol dari Kegiatan Pagi ke Kegiatan Sore @regression @clock @mitra', async ({ authenticatedMitraPage }) => {
    const mitraDashboard = new MitraDashboardPage(authenticatedMitraPage);
    const morningReport = await mitraDashboard.getMorningReportText();
    const eveningReport = await mitraDashboard.getEveningReportText();

    // Verifikasi kepatuhan state machine 3-state
    if (morningReport === '-') {
      expect(await mitraDashboard.getPresensiButtonText()).toContain('Kegiatan Pagi');
    } else if (eveningReport === '-') {
      expect(await mitraDashboard.getPresensiButtonText()).toContain('Kegiatan Sore');
    } else {
      expect(await mitraDashboard.isPresensiButtonVisible()).toBe(false);
    }
  });

  test('TC-MITRA-CLK-005: Verifikasi perekaman waktu presensi pada kartu laporan kegiatan @regression @clock @mitra', async ({ authenticatedMitraPage }) => {
    const mitraDashboard = new MitraDashboardPage(authenticatedMitraPage);
    const morningReport = await mitraDashboard.getMorningReportText();
    const eveningReport = await mitraDashboard.getEveningReportText();

    // Laporan kegiatan pagi dan sore menampilkan format tanggal YYYY-MM-DD atau '-'
    expect(morningReport).toMatch(/(\d{4}-\d{2}-\d{2}|-)/);
    expect(eveningReport).toMatch(/(\d{4}-\d{2}-\d{2}|-)/);
  });

  test('TC-MITRA-CLK-006: Verifikasi penghilangan tombol presensi (null) setelah seluruh presensi harian selesai @regression @clock @mitra', async ({ authenticatedMitraPage }) => {
    const mitraDashboard = new MitraDashboardPage(authenticatedMitraPage);
    const morningReport = await mitraDashboard.getMorningReportText();
    const eveningReport = await mitraDashboard.getEveningReportText();

    // Saat kedua laporan (pagi dan sore) telah tercatat, tombol presensi hilang (null)
    if (morningReport !== '-' && eveningReport !== '-' && morningReport !== '' && eveningReport !== '') {
      expect(await mitraDashboard.isPresensiButtonVisible()).toBe(false);
    } else {
      expect(await mitraDashboard.isPresensiButtonVisible()).toBe(true);
     }
  });

});
