# Master Plan: Automation Testing & SIT Web Absensi Hadir

## 1. Tujuan Proyek
Membuat rancangan System Integration Testing (SIT) yang akurat dan suite pengujian otomatis (Automation Testing) end-to-end berbasis Node.js, Playwright, dan TypeScript untuk aplikasi web "Hadir" (`https://magang.dikahadir.com/absen/login`).
Proses pengujian mencakup 2 role utama: **Karyawan PKWT** dan **Karyawan Mitra**.

---

## 2. Ruang Lingkup (Scope & Out-of-Scope)

### In-Scope:
- **Eksplorasi Web**: Verifikasi halaman login, dashboard PKWT beserta seluruh fiturnya, dan dashboard Mitra beserta pembacaan lokasi.
- **Dokumentasi SIT**:
  - Penulisan ulang lembar `SIT - Aplikasi Karyawan` pada file `docs/DOKUMEN_SIT_MAGANG_DIKAHADIR_RAPI.xlsx` menggunakan format, styling, struktur kolom, dan validasi asli tanpa merusak sheet lain.
  - Pemetaan tag test case ke file pendukung `docs/tc-tag-map.md`.
  - Pelacakan pertanyaan terbuka dan aturan bisnis di `docs/open-questions.md`.
- **Pengujian Fungsional**:
  - Modul Autentikasi (login valid/invalid/kosong, show/hide password, lupa password, direct URL guard/session).
  - Modul Karyawan PKWT (dashboard ringkasan, filter bulan/tahun, menu Absensi, Koreksi Absen, Izin, Lembur, Cuti, Sakit, Download Reports, Staff, History Absensi).
  - Modul Karyawan Mitra (dashboard sapaan, jumlah kegiatan, pembacaan geolokasi, clock in/out, skenario error geolokasi/izin ditolak).
- **Pengujian Non-Fungsional**:
  - Validasi UI desktop column mirroring (layout sempit di tengah, responsive desktop resize 1366x768 & 1920x1080, tidak ada horizontal scroll, zoom 80%/100%/125%, penanganan broken assets).
- **Automation Suite**:
  - Desain arsitektur Page Object Model (POM) yang scalable, maintainable, dan modular.
  - Tagging komprehensif (`@smoke`, `@regression`, `@positive`, `@negative`, `@pkwt`, `@mitra`, `@auth`, `@dashboard`, `@clock`, `@mutating`).

### Out-of-Scope:
- Pengujian pada mobile browser fisik atau emulasi mobile (`isMobile: true`, touch emulation) karena aplikasi adalah Desktop Web dengan layout kolom sempit ("mobile mirroring").
- Mengubah, menghapus, atau memformat sheet lain selain `SIT - Aplikasi Karyawan` pada file spreadsheet.
- Aksi pengujian yang merusak data produksi tanpa izin (eksplorasi hanya read-only; aksi mutating dilakukan secara terisolasi dan serial).

---

## 3. Strategi Pengujian (Test Strategy)
1. **Pendekatan Faktual**:
   - Tidak ada asumsi terhadap selector atau business rules. Semua pengujian didasarkan pada catatan observasi nyata di `docs/exploration.md`.
2. **Viewport & Device**:
   - Google Chrome Stable (`channel: 'chrome'`), mode default headless.
   - Viewport desktop standar (1366x768 dan 1920x1080), interaksi berbasis klik mouse standar.
3. **Penanganan Lokasi (Geolocation)**:
   - Pengaturan izin lokasi (`geolocation`, `permissions`) dikelola via Playwright Browser Context fixtures, bukan hardcoded pada skrip test.
4. **Strategi Eksekusi Test**:
   - Test non-mutating (read-only, auth validation, filter, navigation) dijalankan secara paralel untuk kecepatan.
   - Test mutating (`@mutating`) seperti clock in/out dan submit pengajuan wajib dijalankan secara **serial** untuk menjaga integritas status akun.
5. **Kredensial & Keamanan**:
   - Kredensial tidak pernah di-hardcode. Seluruh akun disimpan pada `.env` lokal (termasuk dalam `.gitignore`).

---

## 4. Struktur Proyek
```text
absensi-dikahadir-app/
├── .env.example
├── .env                      # Disiapkan user (diabaikan git)
├── .gitignore
├── package.json
├── tsconfig.json
├── playwright.config.ts
├── docs/
│   ├── plan.md               # Master plan (dokumen ini)
│   ├── tasklist.md           # Pelacak checklist pengerjaan
│   ├── exploration.md        # Catatan detail hasil eksplorasi browser
│   ├── open-questions.md     # Pertanyaan terbuka / aturan bisnis
│   ├── xlsx-format-analysis.md # Analisis format target sheet XLSX
│   ├── sit-draft.md          # Draft test case sebelum commit ke Excel
│   ├── tc-tag-map.md         # Pemetaan tag dan atribut test
│   ├── _backup/              # Direktori backup file XLSX sebelum modifikasi
│   └── DOKUMEN_SIT_MAGANG_DIKAHADIR_RAPI.xlsx
├── src/
│   ├── config/               # Environment & global configs
│   ├── fixtures/             # Custom test fixtures (auth, geolocation context)
│   ├── pages/                # Page Object Model (POM)
│   │   ├── base.page.ts
│   │   ├── login.page.ts
│   │   ├── pkwt-dashboard.page.ts
│   │   └── mitra-dashboard.page.ts
│   ├── data/                 # Test data & constants
│   └── utils/                # Helper functions & custom assertions
└── tests/
    ├── auth/                 # Test suite autentikasi
    ├── pkwt/                 # Test suite role PKWT
    ├── mitra/                # Test suite role Mitra
    └── visual/               # Test layout mobile-mirroring & responsivitas desktop
```

---

## 5. Daftar Fase Proyek

### Fase 1: Fondasi SIT (Fase Aktif)
- **Task 1.0**: Preflight check verifikasi tool browser/MCP dan akses halaman login (Selesai).
- **Task 1.1**: Penyusunan `docs/plan.md`, `docs/tasklist.md`, serta konfigurasi environment `.env` (Sedang berjalan).
- **Task 1.2**: Analisis struktur format, metadata, dan styling spreadsheet ke `docs/xlsx-format-analysis.md`.
- **Task 1.3**: Eksplorasi browser pada halaman login (validasi form, hide/show password, link bantuan).
- **Task 1.4**: Eksplorasi browser pada dashboard dan menu Karyawan PKWT (read-only).
- **Task 1.5**: Eksplorasi browser pada dashboard Karyawan Mitra dan alur izin geolokasi (read-only).
- **Task 1.6**: Penyusunan draft test case SIT lengkap dan pemetaan tag pada `docs/sit-draft.md` & `docs/tc-tag-map.md`.
- **Task 1.7**: Backup spreadsheet, pembersihan isi lama, penulisan test case baru, dan verifikasi integritas file.
- **Task 1.8**: Self-review cakupan test case, identifikasi duplikasi, dan finalisasi `docs/open-questions.md`.

### Fase 2: Setup Project & Page Object Model (POM)
- Inisialisasi dependensi: Node.js, `@playwright/test`, `typescript`, `@types/node`, `dotenv`.
- Konfigurasi `playwright.config.ts` (desktop Chrome, reporter, timeout, tracing).
- Pembuatan base Page Object Model dan halaman turunan (`LoginPage`, `PkwtDashboardPage`, `MitraDashboardPage`).
- Pembuatan fixtures untuk context geolocation dan session handling.

### Fase 3: Implementasi Test Automation
- Pembuatan automated test skenario Auth (`tests/auth/`).
- Pembuatan automated test skenario PKWT (`tests/pkwt/`).
- Pembuatan automated test skenario Mitra (`tests/mitra/`).
- Pembuatan automated test non-fungsional / layout desktop column (`tests/visual/`).

### Fase 4: Eksekusi, Pelaporan, & Dokumentasi Akhir
- Eksekusi menyeluruh smoke test (`@smoke`) dan regression test (`@regression`).
- Verifikasi eksekusi serial untuk skenario `@mutating`.
- Analisis laporan hasil uji (Playwright HTML Report / trace viewer).
- Penyusunan dokumen walkthrough dan serah terima automation.

---

## 6. Manajemen Risiko & Asumsi
| Risiko | Dampak | Mitigasi |
| :--- | :--- | :--- |
| Kerusakan format pada sheet lain di file XLSX | Tinggi | Backup mandiri sebelum edit; analisis byte/cell; verifikasi diff sheet lain pasca-tulis. |
| Perubahan data absensi nyata pada akun testing | Tinggi | Tandai test dengan `@mutating`; jalankan serial; eksplorasi awal murni read-only. |
| Flakiness karena pembacaan geolokasi | Sedang | Gunakan context override Playwright untuk mengunci koordinat lat-long secara deterministik. |
| Sapaan waktu Mitra berubah sesuai jam sistem | Rendah | Kendalikan waktu browser (`page.clock`) pada Playwright untuk menguji sapaan pagi/siang/sore. |
