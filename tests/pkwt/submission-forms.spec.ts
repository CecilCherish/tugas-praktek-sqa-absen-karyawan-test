import { test, expect } from '../../fixtures';

test.describe('Validasi Form Pengajuan PKWT (Read-Only) (@pkwt)', () => {

  test('TC-PKWT-FRM-001: Verifikasi validasi penolakan form pengajuan koreksi absen saat field jam dikosongkan @regression @pkwt', async ({ authenticatedPkwtPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent/correction');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/correction/, { timeout: 15000 });

    // Buka form Ajukan Koreksi
    await authenticatedPkwtPage.getByRole('button', { name: 'Ajukan Koreksi' }).click();
    const ajukanBtn = authenticatedPkwtPage.getByRole('button', { name: 'Ajukan', exact: true });
    await expect(ajukanBtn).toBeVisible({ timeout: 5000 });

    // Klik tombol Ajukan tanpa mengisi jam masuk/keluar
    await ajukanBtn.click();

    // Verifikasi pesan validasi "Salah satu harus diisi!"
    await expect(authenticatedPkwtPage.locator('text="Salah satu harus diisi!"').first()).toBeVisible({ timeout: 5000 });
  });

  test('TC-PKWT-FRM-002: Verifikasi validasi penolakan form pengajuan izin terlambat saat field wajib dikosongkan @regression @pkwt', async ({ authenticatedPkwtPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent/permit');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/permit/, { timeout: 15000 });

    // Buka form Ajukan Izin Terlambat
    await authenticatedPkwtPage.getByRole('button', { name: 'Ajukan Izin Terlambat' }).click();
    const ajukanBtn = authenticatedPkwtPage.getByRole('button', { name: 'Ajukan', exact: true });
    await expect(ajukanBtn).toBeVisible({ timeout: 5000 });

    // Klik tombol Ajukan saat field kosong
    await ajukanBtn.click();

    // Verifikasi pesan validasi field wajib
    await expect(authenticatedPkwtPage.locator('text="Tanggal Harus diisi!"').first()).toBeVisible({ timeout: 5000 });
    await expect(authenticatedPkwtPage.locator('text="Jam Harus diisi!"').first()).toBeVisible({ timeout: 5000 });
    await expect(authenticatedPkwtPage.locator('text="Keterangan Harus diisi!"').first()).toBeVisible({ timeout: 5000 });
  });

  test('TC-PKWT-FRM-003: Verifikasi validasi penolakan form pengajuan lembur saat field wajib dikosongkan @regression @pkwt', async ({ authenticatedPkwtPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent/overtime-client');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/overtime-client/, { timeout: 15000 });

    // Buka form Ajukan Lembur
    await authenticatedPkwtPage.getByRole('button', { name: 'Ajukan Lembur' }).click();
    const ajukanBtn = authenticatedPkwtPage.getByRole('button', { name: 'Ajukan', exact: true });
    await expect(ajukanBtn).toBeVisible({ timeout: 5000 });

    // Klik tombol Ajukan saat field kosong
    await ajukanBtn.click();

    // Verifikasi pesan validasi inline
    await expect(authenticatedPkwtPage.locator('text="Jam masuk harus di isi!"').first()).toBeVisible({ timeout: 5000 });
    await expect(authenticatedPkwtPage.locator('text="Jam Keluar harus di isi!"').first()).toBeVisible({ timeout: 5000 });
    await expect(authenticatedPkwtPage.locator('text="Masukan minimal 5 karakter"').first()).toBeVisible({ timeout: 5000 });
  });

  test('TC-PKWT-FRM-004: Verifikasi formulir pengajuan Cuti terbuka dan penolakan submit saat data kosong @regression @pkwt', async ({ authenticatedPkwtPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent/leave-client');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/leave-client/, { timeout: 15000 });

    // Buka form Ajukan Cuti
    await authenticatedPkwtPage.getByRole('button', { name: 'Ajukan Cuti' }).click();
    const ajukanBtn = authenticatedPkwtPage.getByRole('button', { name: 'Ajukan', exact: true });
    await expect(ajukanBtn).toBeVisible({ timeout: 5000 });

    // Verifikasi field formulir cuti terbuka
    await expect(authenticatedPkwtPage.locator('text="Ajukan Cuti"').first()).toBeVisible();

    // Klik Ajukan saat kosong menghasilkan penolakan server (alert error / tetap di form)
    await ajukanBtn.click();
    await authenticatedPkwtPage.waitForTimeout(1000);
    // Verifikasi tetap di halaman form dan tidak bermutasi
    await expect(authenticatedPkwtPage).toHaveURL(/\/apps\/absent\/leave-client/);
    await expect(ajukanBtn).toBeVisible();
  });

  test('TC-PKWT-FRM-005: Verifikasi formulir pengajuan Sakit terbuka dan penolakan submit saat data kosong @regression @pkwt', async ({ authenticatedPkwtPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent/sick');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/sick/, { timeout: 15000 });

    // Buka form Ajukan Sakit
    await authenticatedPkwtPage.getByRole('button', { name: 'Ajukan Sakit' }).click();
    const ajukanBtn = authenticatedPkwtPage.getByRole('button', { name: 'Ajukan', exact: true });
    await expect(ajukanBtn).toBeVisible({ timeout: 5000 });

    // Verifikasi formulir sakit terbuka menampilkan tombol Ajukan
    await expect(authenticatedPkwtPage.locator('text="Ajukan Sakit"').first()).toBeVisible();

    // Klik Ajukan saat data belum diisi tetap berada di form tanpa mutasi
    await ajukanBtn.click();
    await authenticatedPkwtPage.waitForTimeout(1000);
    await expect(authenticatedPkwtPage).toHaveURL(/\/apps\/absent\/sick/);
    await expect(ajukanBtn).toBeVisible();
  });

});
