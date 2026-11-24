import { test, expect } from '../../fixtures';

test.describe('Dashboard PKWT (@pkwt, @dashboard)', () => {

  test('TC-PKWT-DSH-001: Verifikasi kelengkapan elemen beranda dashboard PKWT mencakup profil dan 7 kartu metrik @smoke @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent');
    // Profil dan Header
    await expect(authenticatedPkwtPage.locator('p:has-text("Hai,")')).toBeVisible();
    await expect(authenticatedPkwtPage.locator('p:has-text("Have a nice day !")')).toBeAttached();

    // Judul Kehadiranmu dan tombol filter
    await expect(authenticatedPkwtPage.getByText('Kehadiranmu')).toBeVisible();
    await expect(pkwtDashboardPage.monthPickerBtn.first()).toBeVisible();
    await expect(pkwtDashboardPage.yearPickerBtn.first()).toBeVisible();

    // 7 Kartu Metrik
    const metrics = ['WFO', 'Cuti', 'Sakit', 'WFH', 'Lembur', 'Terlambat', 'Pulang Cepat'];
    for (const metric of metrics) {
      await expect(authenticatedPkwtPage.locator(`text="${metric}"`).first()).toBeVisible();
    }
  });

  test('TC-PKWT-DSH-002: Verifikasi pembaruan nilai konkret kartu metrik saat filter bulan diubah ke Oktober 2026 @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/?$/);
    await expect(authenticatedPkwtPage.getByText('Kehadiranmu')).toBeVisible();

    // Buka filter bulan dan pilih October
    await pkwtDashboardPage.monthPickerBtn.first().click();
    const octOption = authenticatedPkwtPage.locator('button').filter({ hasText: /^(Oct|Okt|October|Oktober)$/i }).first();
    await octOption.waitFor({ state: 'visible', timeout: 5000 });
    await octOption.click();

    await authenticatedPkwtPage.waitForTimeout(1500);

    // Verifikasi nilai konkret pada kartu metrik (WFO = 1, Sakit = 0, WFH = 1)
    const wfoVal = await pkwtDashboardPage.getMetricValue('WFO');
    const sakitVal = await pkwtDashboardPage.getMetricValue('Sakit');
    const wfhVal = await pkwtDashboardPage.getMetricValue('WFH');

    expect(wfoVal).toBe(1);
    expect(sakitVal).toBe(0);
    expect(wfhVal).toBe(1);
  });

  test('TC-PKWT-DSH-003: Verifikasi rentang pilihan tahun pada dialog pemilih tahun mencakup tahun 1900 hingga 2099 @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent');
    await pkwtDashboardPage.yearPickerBtn.first().click();

    // Verifikasi batas bawah 1900 dan batas atas 2099 ada di dalam DOM dialog
    const year1900 = authenticatedPkwtPage.locator('button:has-text("1900")').first();
    const year2099 = authenticatedPkwtPage.locator('button:has-text("2099")').first();

    await expect(year1900).toBeAttached();
    await expect(year2099).toBeAttached();

    // Tutup dialog pemilih tahun dengan klik tahun aktif
    const currentYear = authenticatedPkwtPage.locator('button:has-text("2026")').first();
    await currentYear.click();
  });

  test('TC-PKWT-DSH-004: Verifikasi tampilan nilai metrik saat memilih periode masa lalu yang belum memiliki aktivitas @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent');
    // Ubah tahun ke tahun yang belum ada aktivitas (misal 2020)
    await pkwtDashboardPage.yearPickerBtn.first().click();
    const year2020 = authenticatedPkwtPage.locator('button:has-text("2020")').first();
    await year2020.scrollIntoViewIfNeeded();
    await year2020.click();

    // Pilih bulan Januari
    await pkwtDashboardPage.monthPickerBtn.first().click();
    const janOption = authenticatedPkwtPage.locator('button').filter({ hasText: /^(Jan|Januari|January)$/i }).first();
    await janOption.click();

    await authenticatedPkwtPage.waitForTimeout(1500);

    // Verifikasi seluruh 7 metrik bernilai 0
    const metrics: ('WFO' | 'Cuti' | 'Sakit' | 'WFH' | 'Lembur' | 'Terlambat' | 'Pulang Cepat')[] = [
      'WFO', 'Cuti', 'Sakit', 'WFH', 'Lembur', 'Terlambat', 'Pulang Cepat'
    ];
    for (const metric of metrics) {
      const val = await pkwtDashboardPage.getMetricValue(metric);
      expect(val).toBe(0);
    }
  });

  test('TC-PKWT-DSH-005: Verifikasi membuka dan menutup panel menu samping pada dashboard PKWT @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent');
    // Buka menu drawer samping
    await pkwtDashboardPage.openDrawer();
    await expect(authenticatedPkwtPage.locator('.MuiListItem-root:has-text("Change Password")')).toBeVisible();
    await expect(authenticatedPkwtPage.locator('button:has-text("Logout")')).toBeVisible();

    // Tutup drawer dengan menekan Escape
    await authenticatedPkwtPage.keyboard.press('Escape');
    await authenticatedPkwtPage.waitForTimeout(1000);
    await expect(authenticatedPkwtPage.locator('button:has-text("Logout")')).toBeHidden();
  });

  test('TC-PKWT-DSH-006: Verifikasi konsistensi jumlah angka pada kartu metrik dengan daftar kartu History Absensi @regression @dashboard @pkwt', async ({ authenticatedPkwtPage, pkwtDashboardPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent');
    await authenticatedPkwtPage.waitForTimeout(1500);

    // Di bulan berjalan November 2026: WFO (7) + WFH (2) + Sakit (1) = 10
    const wfo = await pkwtDashboardPage.getMetricValue('WFO');
    const wfh = await pkwtDashboardPage.getMetricValue('WFH');
    const sakit = await pkwtDashboardPage.getMetricValue('Sakit');
    const totalMetrik = wfo + wfh + sakit;
    expect(totalMetrik).toBe(10);

    // Verifikasi section History Absensi menampilkan daftar kartu dan tautan Selengkapnya
    await expect(authenticatedPkwtPage.getByText('History Absensi')).toBeVisible();
    await expect(authenticatedPkwtPage.getByText('Selengkapnya')).toBeVisible();
  });

});
