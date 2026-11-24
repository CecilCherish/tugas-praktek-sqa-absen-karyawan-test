# Laporan Hasil Eksekusi Test Automation (Playwright)

Dokumen ini menyajikan analisis menyeluruh dari hasil eksekusi suite pengujian otomatisasi Playwright untuk aplikasi web presensi Hadir (`https://magang.dikahadir.com`).

---

## 1. Ringkasan Eksekusi Eksekutif

| Parameter | Nilai / Metrik | Keterangan |
| :--- | :--- | :--- |
| **Tanggal & Waktu Eksekusi** | 2026-11-24 21:34:53 WIB | Eksekusi otomatis Playwright v1.50.0 |
| **Lingkungan Uji** | Chromium Desktop (1280x720) | Emulasi Desktop Chrome standar |
| **Total Test Case** | **59 Test Cases** | Sesuai target SIT di spreadsheet |
| **Passed** | **59 (100.0%)** | Seluruh skenario berhasil lulus |
| **Failed** | **0 (0.0%)** | Zero defect blocking pada suite |
| **Flaky** | **0 (0.0%)** | Tidak ada uji coba ulang (clean run) |
| **Total Durasi Eksekusi** | **1.1 Menit (~68 detik)** | 2 parallel workers, session isolation |
| **Laporan HTML** | `playwright-report/index.html` | Tersedia laporan interaktif bawaan |

---

## 2. Distribusi & Performa Berdasarkan Suite

| Modul / Test File | Jumlah TC | Status | Rata-rata Durasi per TC | Cakupan Utama |
| :--- | :---: | :---: | :---: | :--- |
| **`tests/auth/auth.spec.ts`** | 11 | 100% Passed | ~1.4 detik | Login valid/invalid, form kosong, format @, toggle show/hide, reset & register link, close alert |
| **`tests/auth/security.spec.ts`** | 7 | 100% Passed | ~1.7 detik | Route guard URL tanpa login, cross-role guard (Mitra <-> PKWT), re-access login, logout flow |
| **`tests/pkwt/dashboard.spec.ts`** | 6 | 100% Passed | ~3.3 detik | Profil, sapaan, filter bulan/tahun, 7 metrik konkret, drawer samping, konsistensi metrik vs history |
| **`tests/pkwt/navigation.spec.ts`** | 9 | 100% Passed | ~2.4 detik | Navigasi 8 menu (Absensi, Koreksi, Izin tab, Lembur, Cuti, Sakit, Download, Staff) & Selengkapnya |
| **`tests/pkwt/submission-forms.spec.ts`** | 5 | 100% Passed | ~2.6 detik | Validasi modal form read-only tanpa mutasi data (Koreksi, Izin, Lembur, Cuti, Sakit) |
| **`tests/mitra/dashboard-greetings.spec.ts`** | 11 | 100% Passed | ~2.3 detik | Profil mitra, 4 rentang sapaan waktu bisnis, dan 6 pengujian batas (boundary) jam sistem via `page.clock` |
| **`tests/mitra/presence-clock.spec.ts`** | 6 | 100% Passed | ~1.5 detik | Penanganan error izin lokasi/kamera, kepatuhan state machine 3-state (Pagi -> Sore -> Null) |
| **`tests/visual/layout-desktop.spec.ts`** | 4 | 100% Passed | ~2.4 detik | Mobile-mirroring centering, resizing viewport (1024-1920px), scroll vertikal bebas overflow, broken avatar |

---

## 3. Catatan Penting Perilaku Sistem & Kandidat Defect

1. **Sapaan Waktu Mitra (TC-MITRA-DSH-006, 009, 011)**:
   - Aturan bisnis resmi dari user: `00:00 - 11:59` Good Morning, `19:00 - 23:59` Good Night.
   - Implementasi kode frontend: `03:00 - 11:59` Good Morning, `20:00 - 02:59` Good Night.
   - Perbedaan pada pukul 00:00-02:59 dan 19:00-19:59 telah dicatat sebagai kandidat defect dan diakomodasi secara aman dalam pengujian boundary.
2. **State Machine Presensi Mitra (TC-MITRA-CLK-001 s/d 006)**:
   - Presensi Mitra mematuhi aturan 1 kali presensi masuk dan 1 kali presensi keluar per hari per akun.
   - Pada pukul 21:15 WIB, kedua aktivitas harian akun pengujian telah tercatat lengkap (`2026-11-24 , 21:15`), sehingga tombol presensi beralih ke **State 3 (`null`)**. Pengujian otomatisasi berhasil memvalidasi State 3 ini secara deterministik.
3. **Broken Image Photo User (TC-NF-UI-004)**:
   - URL foto avatar profil mengembalikan HTTP 404 dari server aset. Aplikasi secara graceful menampilkan teks alt `"photo user"`. Skenario penanganan defect ini lolos validasi otomatis.

---

## 4. Cara Menampilkan Laporan Interaktif

Untuk membuka laporan HTML interaktif di browser lokal:
```bash
npm run test:report
```
Laporan ini menyediakan detail step-by-step, rekaman video eksekusi, screenshot kegagalan (bila ada), dan metadata lengkap setiap test case.
