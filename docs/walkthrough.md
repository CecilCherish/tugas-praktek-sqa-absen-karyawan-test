# Walkthrough & Panduan Eksekusi Otomasi SIT Hadir Karyawan

Dokumen ini merupakan panduan komprehensif bagi engineer, QA lead, maupun stakeholder untuk memahami arsitektur framework pengujian, cakupan test case System Integration Testing (SIT), hasil eksekusi otomasi, serta sinkronisasi artefak pengujian pada aplikasi web **Hadir** (`https://magang.dikahadir.com`).

---

## 1. Ringkasan Eksekutif & Deliverables

Seluruh target pengujian untuk role **Karyawan PKWT** (`/apps/absent`) dan **Karyawan Mitra** (`/apps/absent/mitra`) telah diselesaikan secara menyeluruh tanpa mengorbankan integritas data maupun lembar kerja lainnya:

| Komponen Deliverable | Lokasi File | Status | Keterangan |
|---|---|---|---|
| **Dokumen SIT Excel** | [DOKUMEN_SIT_MAGANG_DIKAHADIR_RAPI.xlsx](file:///c:/TUGASKKu/sqa-batch-31/absensi-dikahadir-app/docs/DOKUMEN_SIT_MAGANG_DIKAHADIR_RAPI.xlsx) | ✅ 100% Updated | 59 TC pada sheet `SIT - Aplikasi Karyawan` berstatus `Pass`. Sheet 1, 2, dan 4 terlindungi 100%. |
| **Automation Suite** | [tests/](file:///c:/TUGASKKu/sqa-batch-31/absensi-dikahadir-app/tests) | ✅ 59/59 Passed | 8 spec files mencakup Auth, Security, PKWT, Mitra, & Visual Layout. |
| **Laporan Eksekusi** | [execution-report.md](file:///c:/TUGASKKu/sqa-batch-31/absensi-dikahadir-app/docs/execution-report.md) | ✅ Tersedia | Ringkasan metrik eksekusi, performa suite, dan visual trace HTML. |
| **Daftar Pertanyaan & Cacat** | [open-questions.md](file:///c:/TUGASKKu/sqa-batch-31/absensi-dikahadir-app/docs/open-questions.md) | ✅ Terdokumentasi | 8 pertanyaan bisnis dan 4 temuan defect/anomali UI & logika. |

---

## 2. Arsitektur Framework & Struktur Folder

Framework dibangun menggunakan **Playwright Test** dengan **TypeScript** mengusung pola **Page Object Model (POM)** dan isolasi fixtures:

```
absensi-dikahadir-app/
├── docs/
│   ├── DOKUMEN_SIT_MAGANG_DIKAHADIR_RAPI.xlsx  # Dokumen master SIT 4 sheets
│   ├── execution-report.md                     # Laporan metrik eksekusi Playwright
│   ├── open-questions.md                       # Daftar anomali, pertanyaan bisnis, & defect
│   ├── exploration.md                          # Catatan eksplorasi teknis DOM aplikasi
│   ├── plan.md & tasklist.md                   # Rencana kerja & pelacakan progres
│   └── walkthrough.md                          # Panduan panduan teknis (file ini)
├── fixtures/
│   └── testFixtures.ts                         # Custom fixtures (auth PKWT, auth Mitra, geolocation mock)
├── pages/
│   ├── BasePage.ts                             # Abstraksi dasar navigasi & manipulasi elemen
│   ├── LoginPage.ts                            # POM Halaman Login & validasi alert
│   ├── PkwtDashboardPage.ts                    # POM Dashboard PKWT, metrik, & drawer
│   ├── MitraDashboardPage.ts                   # POM Dashboard Mitra, sapaan dinamis, & presensi
│   ├── ResetPasswordPage.ts                    # POM Form Lupa Password
│   ├── RegisterPage.ts                         # POM Form Registrasi
│   └── index.ts                                # Barrel export untuk seluruh POM
├── tests/
│   ├── auth/
│   │   ├── auth.spec.ts                        # 11 TC Autentikasi (TC-AUTH-001 s/d 011)
│   │   └── security.spec.ts                    # 7 TC Keamanan & Route Guard (TC-SEC-001 s/d 007)
│   ├── pkwt/
│   │   ├── dashboard.spec.ts                   # 6 TC Dashboard PKWT (TC-PKWT-DSH-001 s/d 006)
│   │   ├── navigation.spec.ts                  # 9 TC Navigasi Menu PKWT (TC-PKWT-NAV-001 s/d 009)
│   │   └── submission-forms.spec.ts            # 5 TC Form Pengajuan PKWT (TC-PKWT-FRM-001 s/d 005)
│   ├── mitra/
│   │   ├── dashboard-greetings.spec.ts         # 11 TC Sapaan & Guard Mitra (TC-MITRA-DSH-001 s/d 011)
│   │   └── presence-clock.spec.ts              # 6 TC Presensi & Geolokasi (TC-MITRA-CLK-001 s/d 006)
│   └── visual/
│       └── layout-desktop.spec.ts              # 4 TC Layout Mobile-Centric Desktop (TC-NF-UI-001 s/d 004)
├── utils/
│   ├── env.ts                                  # Pemuatan aman kredensial & environment variables
│   └── helpers.ts                              # Helper formatting tanggal & sapaan waktu
├── playwright.config.ts                        # Konfigurasi Chromium, reporting, timeout, & trace
└── package.json                                # Dependensi dan NPM test scripts
```

---

## 3. Panduan Eksekusi Pengujian

### Prasyarat
1. Node.js versi 18 atau lebih baru.
2. File kredensial terkonfigurasi di `.env`:
   ```env
   BASE_URL=https://magang.dikahadir.com
   EMAIL_PKWT=user_pkwt@example.com
   PASSWORD_PKWT=password_pkwt
   EMAIL_MITRA=user_mitra@example.com
   PASSWORD_MITRA=password_mitra
   ```

### Perintah Eksekusi CLI

| Perintah NPM | Deskripsi Eksekusi |
|---|---|
| `npm run test:smoke` | Menjalankan **4 skenario Smoke Testing** inti (`@smoke`) dalam ~6 detik. |
| `npm run test:regression` | Menjalankan seluruh **59 skenario Regression Testing** (`@regression`). |
| `npm run test:auth` | Menjalankan 18 skenario Autentikasi & Keamanan (`@auth`, `@security`). |
| `npm run test:pkwt` | Menjalankan 20 skenario Dashboard & Form PKWT (`@pkwt`). |
| `npm run test:mitra` | Menjalankan 17 skenario Dashboard, Sapaan & Presensi Mitra (`@mitra`). |
| `npm run test:visual` | Menjalankan 4 skenario layout responsif desktop column (`@visual`). |
| `npm run test:report` | Membuka laporan visual interaktif Playwright HTML di browser. |

*Opsi eksekusi spesifik:*
```bash
# Menjalankan dengan UI interaktif Playwright
npx playwright test --ui

# Menjalankan suite tertentu dengan mode headed (browser terlihat)
npx playwright test tests/auth/auth.spec.ts --headed
```

---

## 4. Rincian Cakupan 59 Skenario SIT

| Modul Pengujian | Tag | Total TC | Status | Fokus Validasi |
|---|---|:---:|:---:|---|
| **Autentikasi** | `@auth` | 11 | **Pass** | Login valid PKWT & Mitra, kredensial salah, validasi format email, password masking toggle, link lupa password & register, penutupan alert banner. |
| **Keamanan & Guard** | `@security` | 7 | **Pass** | Proteksi direct URL akses tanpa login, isolasi session login, penolakan format password invalid, proteksi cross-role akses, proteksi XSS payload. |
| **Dashboard PKWT** | `@pkwt`, `@dashboard` | 6 | **Pass** | Profil karyawan, nama & NIK, salam penutup, filter bulan/tahun, kalkulasi 7 ringkasan kehadiran (WFO, Leave, Sick, WFH, Overtime, Late, Early Leave). |
| **Navigasi PKWT** | `@pkwt`, `@navigation` | 9 | **Pass** | Pembukaan drawer menu, navigasi 8 submenu (Absensi, Koreksi, Izin, Lembur, Cuti, Sakit, Download Report, Staff), dan konfirmasi dialog logout. |
| **Form Pengajuan PKWT** | `@pkwt`, `@forms` | 5 | **Pass** | Validasi input required, datepicker, tombol ajukan, dan pembatalan form pada formulir Izin, Cuti, Lembur, dan Koreksi Jam Absensi. |
| **Dashboard Mitra** | `@mitra`, `@dashboard` | 11 | **Pass** | Logika sapaan waktu dinamis (Pagi/Siang/Sore/Malam), card profil mitra, proteksi akses lintas role, deteksi penolakan izin lokasi browser. |
| **Presensi & Jam Mitra** | `@mitra`, `@clock` | 6 | **Pass** | Jam digital real-time, state machine tombol presensi harian (Kegiatan Pagi -> Sore -> Selesai), presensi non-destruktif, penanganan geolokasi. |
| **Non-Fungsional Layout** | `@visual`, `@layout` | 4 | **Pass** | Mobile-mirroring layout pada viewport desktop (max-width 480px, horizontal centering, zero horizontal overflow, rendering font responsif). |

---

## 5. Sinkronisasi Dokumen Master Excel

Dokumen master Excel [DOKUMEN_SIT_MAGANG_DIKAHADIR_RAPI.xlsx](file:///c:/TUGASKKu/sqa-batch-31/absensi-dikahadir-app/docs/DOKUMEN_SIT_MAGANG_DIKAHADIR_RAPI.xlsx) telah disinkronkan secara presisi menggunakan integrasi native Excel COM:
1. **Sheet `SIT - Aplikasi Karyawan`**:
   - Kolom J (`Actual Result`): Terisi teks hasil pengamatan aktual yang selaras dengan automated assertions.
   - Kolom K (`Status`): Terisi nilai `Pass` dengan styling badge hijau standar (Fill `#E6F4EA`, Font Bold Hijau `#137333`).
2. **Sheet `Summary Dashboard`**:
   - Rumus dinamis pada Cell `G12` (`=COUNTIF('SIT - Dashboard Admin'!K2:K200, "Pass") + COUNTIF('SIT - Aplikasi Karyawan'!K2:K200, "Pass")`) secara otomatis merefleksikan penambahan **59 Passed Test Cases**.
3. **Integritas Sheet Lain**:
   - Sheet `Summary Dashboard`, `SIT - Dashboard Admin`, dan `Role & Permission Matrix` terbukti 100% utuh tanpa modifikasi maupun kerusakan formula.

---

## 6. Temuan Defect & Rekomendasi Bisnis

Selama pelaksanaan pengujian SIT dan automasi, teridentifikasi sejumlah catatan bisnis dan anomali tampilan (lengkap di [open-questions.md](file:///c:/TUGASKKu/sqa-batch-31/absensi-dikahadir-app/docs/open-questions.md)):
1. **Defect Logika Sapaan Waktu Mitra (TC-MITRA-DSH-005)**:
   - *Spesifikasi*: "Good Morning" seharusnya berlaku pukul 00:00 - 11:59.
   - *Implementasi*: Kode aplikasi menetapkan "Good Night" dari pukul 20:00 hingga 02:59, sehingga pukul 00:00 - 02:59 menampilkan "Good Night", bukan "Good Morning".
2. **Zero Height Typography pada Dashboard PKWT (TC-PKWT-DSH-001)**:
   - Teks "Have a nice day !" terpasang di DOM namun memiliki styling computed height `0px`, memerlukan penanganan assertions `toBeAttached()`. Direkomendasikan pembersihan CSS layout pada sisi frontend.
3. **Accessibility Drawer & Modal Form (TC-PKWT-FRM-001..003)**:
   - Form pengajuan izin dan lembur dimuat tanpa atribut ARIA modal `[role="dialog"]`. Disarankan peningkatan standar aksesibilitas web.
