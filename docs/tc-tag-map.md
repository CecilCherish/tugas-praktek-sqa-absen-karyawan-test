# Pemetaan Tag Test Case (Test Case Tag Mapping) - Revisi

Dokumen ini memetakan seluruh 59 Test Case ID ke metadata pengujian otomatisasi Playwright:
- **Test Tags**: Tag seleksi eksekusi Playwright (`@smoke`, `@regression`, `@role`, `@modul`).
- **Mutating**: Apakah test melakukan aksi yang menulis/mengubah data persisten di backend (`Yes` / `No`). Test dengan status Mutating = Yes **wajib dijalankan secara serial** dan hanya dapat dieksekusi 1 kali per hari per akun.
- **Automatable**: Kelayakan skenario untuk diotomatisasi secara end-to-end via Playwright (`Yes` / `No`).

---

## Tabel Pemetaan Tag Lengkap (59 Test Cases)

| Test Case ID | Test Tags (Playwright) | Mutating | Automatable | Alasan Mutating / Catatan Otomasi |
| :--- | :--- | :---: | :---: | :--- |
| **TC-AUTH-001** | `@smoke`, `@regression`, `@auth`, `@pkwt` | No | Yes | Login valid PKWT ke dashboard |
| **TC-AUTH-002** | `@smoke`, `@regression`, `@auth`, `@mitra` | No | Yes | Login valid Mitra ke dashboard |
| **TC-AUTH-003** | `@regression`, `@auth` | No | Yes | Validasi isian kosong login |
| **TC-AUTH-004** | `@regression`, `@auth` | No | Yes | Validasi format email invalid |
| **TC-AUTH-005** | `@regression`, `@auth` | No | Yes | Validasi email tidak terdaftar |
| **TC-AUTH-006** | `@regression`, `@auth` | No | Yes | Validasi email benar + password salah |
| **TC-AUTH-007** | `@regression`, `@auth` | No | Yes | Interaksi toggle show/hide password |
| **TC-AUTH-008** | `@regression`, `@auth` | No | Yes | Navigasi halaman lupa password |
| **TC-AUTH-009** | `@regression`, `@auth` | No | Yes | Validasi email kosong form reset password |
| **TC-AUTH-010** | `@regression`, `@auth` | No | Yes | Navigasi halaman registrasi akun |
| **TC-AUTH-011** | `@regression`, `@auth` | No | Yes | Interaktivitas tombol tutup banner alert |
| **TC-SEC-001** | `@regression`, `@auth`, `@pkwt` | No | Yes | Route guard URL internal PKWT |
| **TC-SEC-002** | `@regression`, `@auth`, `@mitra` | No | Yes | Route guard URL internal Mitra |
| **TC-SEC-003** | `@regression`, `@auth`, `@mitra` | No | Yes | Cross-role URL guard (Mitra ke PKWT) |
| **TC-SEC-004** | `@regression`, `@auth`, `@pkwt` | No | Yes | Cross-role URL guard (PKWT ke Mitra) |
| **TC-SEC-005** | `@regression`, `@auth` | No | Yes | Akses halaman login saat sesi aktif |
| **TC-SEC-006** | `@regression`, `@auth`, `@pkwt` | No | Yes | Logout sesi Karyawan PKWT |
| **TC-SEC-007** | `@regression`, `@auth`, `@mitra` | No | Yes | Logout sesi Karyawan Mitra |
| **TC-PKWT-DSH-001** | `@smoke`, `@regression`, `@dashboard`, `@pkwt` | No | Yes | Verifikasi elemen beranda PKWT |
| **TC-PKWT-DSH-002** | `@regression`, `@dashboard`, `@pkwt` | No | Yes | Filter bulan ke Oktober 2026 |
| **TC-PKWT-DSH-003** | `@regression`, `@dashboard`, `@pkwt` | No | Yes | Pengecekan rentang tahun 1900-2099 |
| **TC-PKWT-DSH-004** | `@regression`, `@dashboard`, `@pkwt` | No | Yes | Filter periode kosong (nilai metrik 0) |
| **TC-PKWT-DSH-005** | `@regression`, `@dashboard`, `@pkwt` | No | Yes | Interaksi buka/tutup menu samping |
| **TC-PKWT-DSH-006** | `@regression`, `@dashboard`, `@pkwt` | No | Yes | Validasi konsistensi metrik vs history |
| **TC-PKWT-NAV-001** | `@regression`, `@dashboard`, `@pkwt` | No | Yes | Navigasi menu Absensi |
| **TC-PKWT-NAV-002** | `@regression`, `@dashboard`, `@pkwt` | No | Yes | Navigasi menu Koreksi Absen |
| **TC-PKWT-NAV-003** | `@regression`, `@dashboard`, `@pkwt` | No | Yes | Navigasi menu Izin (Terlambat & Pulang Cepat) |
| **TC-PKWT-NAV-004** | `@regression`, `@dashboard`, `@pkwt` | No | Yes | Navigasi menu Lembur |
| **TC-PKWT-NAV-005** | `@regression`, `@dashboard`, `@pkwt` | No | Yes | Navigasi menu Cuti |
| **TC-PKWT-NAV-006** | `@regression`, `@dashboard`, `@pkwt` | No | Yes | Navigasi menu Sakit |
| **TC-PKWT-NAV-007** | `@regression`, `@dashboard`, `@pkwt` | No | Yes | Navigasi menu Download Reports |
| **TC-PKWT-NAV-008** | `@regression`, `@dashboard`, `@pkwt` | No | Yes | Navigasi menu Staff |
| **TC-PKWT-NAV-009** | `@regression`, `@dashboard`, `@pkwt` | No | Yes | Navigasi tautan Selengkapnya riwayat |
| **TC-PKWT-FRM-001** | `@regression`, `@dashboard`, `@pkwt` | No | Yes | Validasi isian kosong form koreksi absen |
| **TC-PKWT-FRM-002** | `@regression`, `@dashboard`, `@pkwt` | No | Yes | Validasi isian kosong form izin terlambat |
| **TC-PKWT-FRM-003** | `@regression`, `@dashboard`, `@pkwt` | No | Yes | Validasi isian kosong form lembur |
| **TC-PKWT-FRM-004** | `@regression`, `@dashboard`, `@pkwt` | No | Yes | Status tombol submit form cuti belum lengkap |
| **TC-PKWT-FRM-005** | `@regression`, `@dashboard`, `@pkwt` | No | Yes | Status tombol submit form sakit belum lengkap |
| **TC-MITRA-DSH-001** | `@smoke`, `@regression`, `@dashboard`, `@mitra` | No | Yes | Verifikasi visual beranda Mitra |
| **TC-MITRA-DSH-002** | `@regression`, `@dashboard`, `@mitra` | No | Yes | Sapaan waktu pagi (mock clock 08:00) |
| **TC-MITRA-DSH-003** | `@regression`, `@dashboard`, `@mitra` | No | Yes | Sapaan waktu siang (mock clock 13:00) |
| **TC-MITRA-DSH-004** | `@regression`, `@dashboard`, `@mitra` | No | Yes | Sapaan waktu sore (mock clock 17:00) |
| **TC-MITRA-DSH-005** | `@regression`, `@dashboard`, `@mitra` | No | Yes | Sapaan waktu malam (mock clock 21:00) |
| **TC-MITRA-BND-001** | `@regression`, `@dashboard`, `@mitra` | No | Yes | Boundary test 02:59 vs 03:00 |
| **TC-MITRA-BND-002** | `@regression`, `@dashboard`, `@mitra` | No | Yes | Boundary test 11:59 vs 12:00 |
| **TC-MITRA-BND-003** | `@regression`, `@dashboard`, `@mitra` | No | Yes | Boundary test 14:59 vs 15:00 |
| **TC-MITRA-BND-004** | `@regression`, `@dashboard`, `@mitra` | No | Yes | Boundary test 18:59 vs 19:00 (bisnis) |
| **TC-MITRA-BND-005** | `@regression`, `@dashboard`, `@mitra` | No | Yes | Boundary test 19:59 vs 20:00 (kode) |
| **TC-MITRA-BND-006** | `@regression`, `@dashboard`, `@mitra` | No | Yes | Boundary test 23:59 vs 00:00 (tengah malam) |
| **TC-MITRA-CLK-001** | `@regression`, `@clock`, `@mitra` | No | Yes | Penolakan geolokasi diblokir |
| **TC-MITRA-CLK-002** | `@regression`, `@clock`, `@mitra` | No | Yes | Penolakan izin kamera diblokir |
| **TC-MITRA-CLK-003** | `@smoke`, `@regression`, `@clock`, `@mitra`, `@mutating` | **Yes** | Yes | Menulis data absen masuk nyata; wajib serial |
| **TC-MITRA-CLK-004** | `@regression`, `@clock`, `@mitra` | No | Yes | Verifikasi status tombol Kegiatan Sore |
| **TC-MITRA-CLK-005** | `@smoke`, `@regression`, `@clock`, `@mitra`, `@mutating` | **Yes** | Yes | Menulis data absen keluar nyata; wajib serial |
| **TC-MITRA-CLK-006** | `@regression`, `@clock`, `@mitra` | No | Yes | Verifikasi tombol presensi dihilangkan |
| **TC-NF-UI-001** | `@regression`, `@visual` | No | Yes | Layout sempit desktop viewport 1366 & 1920 |
| **TC-NF-UI-002** | `@regression`, `@visual` | No | Yes | Stabilitas resize jendela 1024px-1920px |
| **TC-NF-UI-003** | `@regression`, `@visual` | No | Yes | Skalabilitas layout zoom 80%, 100%, 125% |
| **TC-NF-UI-004** | `@regression`, `@visual` | No | Yes | Verifikasi cacat tampilan foto profil 404 |
