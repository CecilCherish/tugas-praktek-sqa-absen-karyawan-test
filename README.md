# SQA SIT & Automation Testing - Aplikasi Web Absensi Hadir

[![Playwright Tests](https://img.shields.io/badge/Playwright-100%25%20Passed%20(59%2F59)-brightgreen)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)](https://www.typescriptlang.org/)
[![Target](https://img.shields.io/badge/App-Magang%20DikaHadir-orange)](https://magang.dikahadir.com/)

Repositori ini berisi pengujian **System Integration Testing (SIT)** dan **Automated Testing Suite** untuk aplikasi web **Hadir** (`https://magang.dikahadir.com`) berbasis **Playwright Test** dengan bahasa pemrograman **TypeScript** dan arsitektur **Page Object Model (POM)**.

---

## 🎯 Cakupan Pengujian

Pengujian mencakup 2 role utama karyawan:
1. **Karyawan PKWT** (`/apps/absent`):
   - Profil, 7 ringkasan metrik absensi harian (WFO, Leave, Sick, WFH, Overtime, Late, Early Leave).
   - Filter tanggal & history absensi.
   - Navigasi drawer & submenu (Absensi, Koreksi, Izin, Lembur, Cuti, Sakit, Download Report, Staff).
   - Form pengajuan izin, cuti, lembur, dan koreksi jam.
2. **Karyawan Mitra** (`/apps/absent/mitra`):
   - Sapaan waktu dinamis (*Good Morning/Afternoon/Evening/Night*).
   - Jam digital real-time & state machine tombol presensi harian (Kegiatan Pagi -> Kegiatan Sore -> Selesai).
   - Proteksi cross-role akses & handling perizinan browser (Geolokasi & Kamera).
3. **Autentikasi & Keamanan**:
   - Login valid/invalid, format email, password masking toggle, reset password, register link, route guards, XSS payload.
4. **Non-Fungsional Layout**:
   - Responsive mobile-mirroring centering pada desktop viewport (max-width 480px, zero horizontal overflow).

---

## 📊 Hasil Pengujian

| Metrik | Hasil |
|---|---|
| **Total Test Cases** | **59 Test Cases** |
| **Status Kelulusan** | **59 Passed / 0 Failed (100% Pass Rate)** |
| **Durasi Eksekusi** | ~1.1 Menit (Parallel 2 Workers) |
| **Dokumen SIT Master** | `docs/DOKUMEN_SIT_MAGANG_DIKAHADIR_RAPI.xlsx` (*Sheet "SIT - Aplikasi Karyawan"*) |

---

## 🏗️ Struktur Proyek

```
absensi-dikahadir-app/
├── docs/
│   ├── DOKUMEN_SIT_MAGANG_DIKAHADIR_RAPI.xlsx  # Dokumen master SIT Excel
│   ├── execution-report.md                     # Laporan metrik eksekusi Playwright
│   ├── walkthrough.md                          # Panduan teknis lengkap & arsitektur
│   ├── open-questions.md                       # Daftar defect & rekomendasi bisnis
│   ├── exploration.md                          # Dokumentasi eksplorasi DOM & state
│   ├── plan.md                                 # Perencanaan proyek
│   └── tasklist.md                             # Tracking status pengerjaan
├── fixtures/
│   └── testFixtures.ts                         # Custom fixtures (Auth & Geolocation)
├── pages/
│   ├── BasePage.ts                             # Base POM class
│   ├── LoginPage.ts                            # Login page POM
│   ├── PkwtDashboardPage.ts                    # PKWT Dashboard POM
│   ├── MitraDashboardPage.ts                   # Mitra Dashboard POM
│   ├── ResetPasswordPage.ts                    # Reset password POM
│   ├── RegisterPage.ts                         # Register POM
│   └── index.ts                                # Barrel export POM
├── tests/
│   ├── auth/                                   # Skenario login & route security
│   ├── pkwt/                                   # Skenario dashboard, menu, & form PKWT
│   ├── mitra/                                  # Skenario dashboard & presensi Mitra
│   └── visual/                                 # Skenario responsivitas & layout desktop
├── utils/
│   ├── env.ts                                  # Env loader
│   └── helpers.ts                              # Date & time helpers
├── playwright.config.ts                        # Konfigurasi Playwright
└── package.json                                # Scripts & dependencies
```

---

## 🚀 Panduan Menjalankan Pengujian

### 1. Setup Awal
```bash
# Clone repository
git clone https://github.com/CecilCherish/tugas-praktek-sqa-absen-karyawan.git
cd tugas-praktek-sqa-absen-karyawan

# Install dependencies
npm install

# Buat file konfigurasi .env dari template
cp .env.example .env
```
Isi konfigurasi `.env` dengan kredensial akun yang valid:
```env
BASE_URL=https://magang.dikahadir.com
EMAIL_PKWT=your_email_pkwt@example.com
PASSWORD_PKWT=your_password
EMAIL_MITRA=your_email_mitra@example.com
PASSWORD_MITRA=your_password
```

### 2. Eksekusi Test Suite

* **Mode UI Interaktif (Direkomendasikan)**:
  ```bash
  npx playwright test --ui
  ```
* **Smoke Testing (~6 Detik)**:
  ```bash
  npm run test:smoke
  ```
* **Full Regression Testing (59 Test Cases)**:
  ```bash
  npm run test:regression
  ```
* **Pengujian per Modul**:
  ```bash
  npm run test:auth      # Autentikasi & Keamanan (18 TC)
  npm run test:pkwt      # Dashboard & Form PKWT (20 TC)
  npm run test:mitra     # Dashboard & Presensi Mitra (17 TC)
  npm run test:visual    # Layout Responsif Desktop (4 TC)
  ```
* **Mode Browser Terlihat (Headed Mode)**:
  ```bash
  npx playwright test tests/auth/auth.spec.ts --headed
  ```
* **Buka Laporan Hasil Pengujian (HTML Report)**:
  ```bash
  npm run test:report
  ```

---

## 📄 Dokumentasi Terkait
- [Panduan Walkthrough Lengkap](docs/walkthrough.md)
- [Laporan Eksekusi Pengujian](docs/execution-report.md)
- [Catatan Defect & Open Questions](docs/open-questions.md)
