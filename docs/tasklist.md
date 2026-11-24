# Tasklist Proyek SIT & Automation Web Absensi Hadir

Format status:
- `[ ]` Belum dimulai
- `[~]` Sedang berjalan
- `[x]` Selesai
- `[!]` Terblokir

---

## FASE 1: Fondasi SIT

- [x] **Task 1.0 Preflight Check** `(2026-11-23)`
  - *Catatan*: Tool `browsermcp:browser` aktif dan terhubung. Berhasil membuka `https://magang.dikahadir.com/absen/login`, mengidentifikasi title "HADIR", form input Email & Password, show/hide password, link lupa password, tombol Masuk, dan layout mobile mirroring.
- [x] **Task 1.1 Pembuatan Plan & Tasklist** `(2026-11-23)`
  - *Catatan*: Berhasil membuat `docs/plan.md`, `docs/tasklist.md`, `.env.example`, `.env`, dan `.gitignore`.
- [x] **Task 1.2 Analisis Format File XLSX** `(2026-11-23)`
  - *Catatan*: Selesai menganalisis struktur 13 kolom, header Navy Blue (#1B365D), zebra striping (#F8FAFC), data validation (Test Type, Status, Priority), style badges, dan pola penulisan. Dokumen tercatat di `docs/xlsx-format-analysis.md`. Menunggu konfirmasi user.
- [x] **Task 1.3 Eksplorasi Browser: Halaman Login** `(2026-11-23)`
  - *Catatan*: Validasi form login, show/hide password, navigasi reset password & register, serta alert "Akun tidak ditemukan" telah dieksplorasi dan dicatat di `docs/exploration.md` dan `docs/open-questions.md`.
- [x] **Task 1.4 Eksplorasi Browser: Dashboard PKWT (Read-Only)** `(2026-11-24)`
  - *Catatan*: Dashboard PKWT (/apps/absent), filter bulan/tahun, 7 ringkasan metrik, drawer menu & logout, seluruh 8 menu navigasi (Absensi, Koreksi, Izin, Lembur, Cuti, Sakit, Download Reports, Staff), dan History Absensi telah dieksplorasi secara read-only dan dicatat di `docs/exploration.md`.
- [x] **Task 1.5 Eksplorasi Browser: Dashboard Mitra & Geolokasi (Read-Only)** `(2026-11-24)`
  - *Catatan*: Dashboard Mitra (/apps/absent/mitra), sapaan waktu dinamis (Good Morning/Afternoon/Evening/Night), cross-role URL guard, penanganan error izin geolokasi/kamera, dan state machine tombol Kegiatan Pagi -> Kegiatan Sore telah dieksplorasi secara read-only dan dicatat di `docs/exploration.md`.
- [x] **Task 1.6 Penyusunan Draft Test Case SIT & Tag Mapping (Revisi Selesai)** `(2026-11-24)`
  - *Catatan*: 59 test case baru lengkap dengan boundary test, expected result berbasis aturan bisnis, penghapusan istilah teknis, skenario pengajuan modal & cross-role baru, dan penandaan status verifikasi telah direvisi di `docs/sit-draft.md` dan dipetakan di `docs/tc-tag-map.md`.
- [x] **Task 1.7 Penulisan TC Final ke Sheet XLSX Target** `(2026-11-24)`
  - *Catatan*: Backup dibuat di `docs/_backup/`. Seluruh data lama di sheet `SIT - Aplikasi Karyawan` telah dibersihkan dan diisi 59 TC baru. Verifikasi teknis mengonfirmasi 0 sisa teks lama, dan 3 sheet lainnya (`Summary Dashboard`, `SIT - Dashboard Admin`, `Role & Permission Matrix`) terbukti 100% identik dengan file backup.
- [x] **Task 1.8 Review Mandiri & Finalisasi Open Questions (Fase 1 Wrap-up)** `(2026-11-24)`
  - *Catatan*: Review mandiri selesai. Total 59 test case (40 Positive, 19 Negative; 6 Critical, 17 High, 23 Medium, 13 Low) mencakup 8 modul tanpa duplikasi. Seluruh pertanyaan bisnis (Q1-Q8) dan temuan bug visual telah terdokumentasi rapi di `docs/open-questions.md`. Fase 1 resmi selesai.

---

## FASE 2: Setup Project & POM

- [x] **Task 2.1 Inisialisasi Project Node.js & Playwright TypeScript** `(2026-11-24)`
  - *Catatan*: `package.json`, `tsconfig.json`, dependensi Playwright (`@playwright/test`, `dotenv`, `typescript`, `@types/node`), browser Chromium, dan struktur folder (`pages/`, `fixtures/`, `utils/`, `tests/auth/`, `tests/pkwt/`, `tests/mitra/`, `tests/visual/`) berhasil diinisialisasi.
- [x] **Task 2.2 Konfigurasi Playwright & Lingkungan Desktop Chrome** `(2026-11-24)`
  - *Catatan*: File `playwright.config.ts` dan `utils/env.ts` telah dikonfigurasi dengan integrasi `.env`, viewport Desktop Chrome (1280x720), timeout 45s, tracing 'retain-on-failure', screenshot 'only-on-failure', dan HTML reporting. Validasi listing test berjalan sukses.
- [x] **Task 2.3 Perancangan Base Page & Page Object Model (POM)** `(2026-11-24)`
  - *Catatan*: `BasePage`, `LoginPage`, `PkwtDashboardPage`, `MitraDashboardPage`, `ResetPasswordPage`, `RegisterPage`, dan barrel export `pages/index.ts` berhasil diimplementasikan dan tervalidasi 100% lulus kompilasi TypeScript (`npx tsc --noEmit`).
- [x] **Task 2.4 Setup Fixtures (Authentication & Geolocation Context)** `(2026-11-24)`
  - *Catatan*: Fixture `fixtures/testFixtures.ts` selesai dibuat mencakup Page Object injection, `authenticatedPkwtPage`, `authenticatedMitraPage` (dengan preset geolokasi & camera), serta `geoDeniedMitraPage`. Uji smoke Playwright berhasil dieksekusi dengan status 100% Passed. Fase 2 resmi selesai.

---

## FASE 3: Implementasi Test Automation

- [x] **Task 3.1 Implementasi Test Autentikasi (`@auth`, `@security`)** `(2026-11-24)`
  - *Catatan*: 18 automated test case (TC-AUTH-001 s/d 011 dan TC-SEC-001 s/d 007) selesai diimplementasikan di `tests/auth/auth.spec.ts` dan `tests/auth/security.spec.ts`. Hasil eksekusi Playwright menunjukkan 100% Passed (18/18 lolos dalam 18.6s).
- [x] **Task 3.2 Implementasi Test Dashboard & Menu PKWT (`@pkwt`)** `(2026-11-24)`
  - *Catatan*: 20 automated test case (TC-PKWT-DSH-001 s/d 006, TC-PKWT-NAV-001 s/d 009, dan TC-PKWT-FRM-001 s/d 005) selesai diimplementasikan di `tests/pkwt/dashboard.spec.ts`, `tests/pkwt/navigation.spec.ts`, dan `tests/pkwt/submission-forms.spec.ts`. Seluruh 20 test case terbukti 100% Passed (20/20 lolos dalam 32.3s).
- [x] **Task 3.3 Implementasi Test Dashboard & Clock In/Out Mitra (`@mitra`, `@clock`, `@mutating`)** `(2026-11-24)`
  - *Catatan*: 17 automated test case (TC-MITRA-DSH-001 s/d 011 dan TC-MITRA-CLK-001 s/d 006) selesai diimplementasikan di `tests/mitra/dashboard-greetings.spec.ts` dan `tests/mitra/presence-clock.spec.ts`. Seluruh 17 test case terbukti 100% Passed (17/17 lolos dalam 19.9s).
- [x] **Task 3.4 Implementasi Test Non-Fungsional Layout Desktop Column (`@regression`, `@visual`)** `(2026-11-24)`
  - *Catatan*: 4 automated test case (TC-NF-UI-001 s/d 004) selesai diimplementasikan di `tests/visual/layout-desktop.spec.ts`. Seluruh 4 test case lolos 100% Passed (10.4s). Fase 3 resmi selesai.


---

## FASE 4: Eksekusi, Pelaporan & CI/CD

- [x] **Task 4.1 Eksekusi Test Suite Smoke (`@smoke`)** `(2026-11-24)`
  - *Catatan*: 4 skenario inti smoke testing (TC-AUTH-001, TC-AUTH-002, TC-PKWT-DSH-001, TC-MITRA-DSH-001) berhasil dieksekusi via `npm run test:smoke` dengan hasil 100% Passed (4/4 lolos dalam 5.9s).
- [x] **Task 4.2 Eksekusi Test Suite Regression (`@regression`)** `(2026-11-24)`
  - *Catatan*: Seluruh 59 automated test case SIT berhasil dieksekusi via `npx playwright test --grep "@regression" --workers=2` dengan hasil **100% Passed (59/59 lolos dalam 1.1 menit)**. Seluruh skenario Auth, Keamanan, PKWT, Mitra, dan Non-Fungsional berjalan stabil tanpa kegagalan.
- [x] **Task 4.3 Analisis Laporan HTML & Tracing Playwright** `(2026-11-24)`
  - *Catatan*: Analisis laporan HTML (`playwright-report/index.html`) selesai. Seluruh metrik eksekusi (59 passed, 0 failed, 0 flaky, durasi 1.1 menit, 0 failure traces) serta rincian performa per suite telah didokumentasikan di `docs/execution-report.md`.
- [x] **Task 4.4 Finalisasi Dokumentasi Walkthrough & Wrap-up Proyek** `(2026-11-24)`
  - *Catatan*: Dokumentasi teknis komprehensif selesai dibuat di `docs/walkthrough.md`. Dokumen mencakup arsitektur POM, isolasi fixtures, panduan eksekusi CLI, analisis cakupan 59 SIT test case, verifikasi sinkronisasi master Excel (sheet `SIT - Aplikasi Karyawan` dan dynamic formula `Summary Dashboard`), serta dokumentasi temuan defect/anomali. Seluruh 4 fase proyek resmi selesai 100%.
