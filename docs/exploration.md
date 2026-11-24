# Catatan Hasil Eksplorasi Browser Nyata

Dokumen ini mencatat seluruh temuan faktual (halaman, elemen DOM, selector, dan perilaku interaksi) yang diobservasi secara langsung melalui browser. **Tidak ada asumsi.**

---

## 1. Modul Autentikasi: Halaman Login (`/absen/login`)

- **URL**: `https://magang.dikahadir.com/absen/login`
- **Page Title**: `HADIR`
- **Layout Architecture**: Desktop web dengan kontainer kolom sempit di tengah viewport (`mobile mirroring`, lebar kontainer utama ~300px, responsive terhadap desktop resizing tanpa horizontal scroll).

### Elemen & Selector Form Login:
| Elemen | Selector Teruji | Tipe / Atribut | Keterangan / Perilaku |
| :--- | :--- | :--- | :--- |
| **Email Field** | `#email` atau `input[placeholder="Masukan Email kamu disini"]` | `<input type="email" id="email" name="email">` | Menerima input email, placeholder: "Masukan Email kamu disini". |
| **Password Field** | `#password` atau `input[placeholder="Masukan password kamu disini"]` | `<input type="password" id="password">` | Tipe default `password`. |
| **Toggle Show/Hide Password** | `button:has(svg)` di samping `#password` (adornment button) | `<button type="button">` (MUI IconButton) | Klik pertama mengubah `type="password"` menjadi `type="text"`. Klik kedua mengembalikan ke `type="password"`. |
| **Tombol Masuk** | `button[type="submit"]` / `getByRole('button', { name: 'Masuk' })` | `<button type="submit">` (MUI Contained Button) | Memicu submit kredensial ke API backend. |
| **Link Lupa Password** | `getByRole('button', { name: 'Lupa password ?' })` | `<button type="button">` | Membuka halaman `/absen/reset-password-request`. |
| **Link Buat Akun** | `getByRole('button', { name: 'disini' })` | `<button type="button">` | Di samping teks "Belum punya akun ? buat". Membuka `/absen/register`. |
| **Alert Error Banner** | `div[role="alert"]` | Alert Component (MUI Alert) | Menampilkan pesan error saat login gagal (misal: "Akun tidak ditemukan"). |
| **Tombol Tutup Alert** | `div[role="alert"] button[aria-label="close"]` | `<button aria-label="close">` | Menutup alert banner error. |

---

### Perilaku Pengujian Validasi & Interaksi:
1. **Submit Form Kosong (Email & Password Kosong)**:
   - Form tidak memblokir submit di sisi client secara native.
   - Request dikirim ke endpoint backend yang merespon status HTTP 500.
   - Muncul banner error: `[role="alert"]` dengan teks `"Akun tidak ditemukan"`.
2. **Submit Format Email Tidak Valid (tanpa `@`)**:
   - Properti DOM `validity.valid` pada input email bernilai `false` dengan pesan browser standard `"Please include an '@' in the email address..."`.
   - Submit form tetap menghasilkan banner alert `"Akun tidak ditemukan"`.
3. **Submit Kredensial Salah / Tidak Terdaftar**:
   - Mengisi email yang tidak terdaftar (contoh: `unreg_user_999@corp.com` / `WrongPass999!`).
   - Sistem memunculkan banner alert `"Akun tidak ditemukan"`.
   - Banner alert berhasil ditutup secara interaktif melalui tombol close (`aria-label="close"`).
4. **Submit Email Terdaftar dengan Password Salah**:
   - Mengisi email terdaftar aktif (`hadirsqa1@gmail.com`) dengan password salah (`SalahPassword123!`).
   - Sistem merespon secara spesifik dengan memunculkan banner alert `"Email atau password salah"`.
5. **Fungsi Show / Hide Password**:
   - Sebelum klik toggle: atribut `type` bernilai `"password"`.
   - Klik 1 kali: atribut `type` berganti menjadi `"text"` (karakter password terlihat).
   - Klik ke-2 kali: atribut `type` kembali menjadi `"password"` (karakter tersamarkan kembali).
6. **Navigasi Lupa Password & Validasi Negatif**:
   - Mengklik tombol `"Lupa password ?"` mengarahkan browser ke URL `https://magang.dikahadir.com/absen/reset-password-request`.
   - Halaman berisi: Field `Email`, tombol `Submit`, dan tombol `Login` ("Kembali ke halaman Login").
   - Klik tombol `Submit` saat email kosong memunculkan banner alert `"User not found."`.
   - Klik tombol `Login` berhasil mengembalikan browser ke `/absen/login`.
7. **Navigasi Buat Akun (Register)**:
   - Mengklik tombol `"disini"` mengarahkan browser ke URL `https://magang.dikahadir.com/absen/register`.
   - Halaman register berisi: Field NIK, Nama Lengkap, Email, Password, Upload Selfie, tombol `Daftar`, dan tombol `disini` untuk kembali ke Login.
8. **Akses Halaman Login saat Sesi Sudah Aktif**:
   - Saat pengguna sudah login dan berada di dashboard, memasukkan kembali URL `/absen/login` pada browser tetap memuat halaman login (tidak dialihkan secara otomatis ke dashboard).

---

## 2. Modul Karyawan PKWT: Dashboard & Seluruh Menu (`/apps/absent`)

- **URL Dashboard Utama**: `https://magang.dikahadir.com/apps/absent`
- **Page Title**: `HADIR`
- **Proteksi Akses (Route Guard)**: Mengakses URL `/apps/absent` secara langsung tanpa login aktif langsung dialihkan (*redirect*) kembali ke `/absen/login`.

### A. Profil & Navigasi Header
| Elemen | Selector Teruji | Keterangan / Perilaku |
| :--- | :--- | :--- |
| **Foto Profil** | `img[alt="photo user"]` | Menampilkan avatar profil user. |
| **Sapaan Header** | `p:has-text("Hai,")` | Menampilkan nama akun (`Hai, Hadir SQA Testing 1`) dan subteks `Have a nice day !`. |
| **Tombol Drawer Menu** | `button:has(img[alt="menu"])` | Membuka drawer panel samping dari sisi kanan. |
| **Menu Change Password** | `.MuiListItem-root:has-text("Change Password")` | Tautan ubah kata sandi di dalam drawer menu. |
| **Tombol Logout** | `button:has-text("Logout")` | Mengakhiri sesi akun, menghapus token/cookie otentikasi, dan mengarahkan kembali ke `/absen/login`. |

### B. Filter Kehadiran & Ringkasan Metrik
| Elemen | Selector Teruji | Keterangan / Perilaku |
| :--- | :--- | :--- |
| **Filter Bulan** | Tombol bertuliskan nama bulan (misal `November`) di samping judul `Kehadiranmu` | Membuka modal dialog picker 12 bulan (`Jan` s/d `Dec`). Memilih bulan (misal: October) terbukti langsung memicu pembaruan angka metrik kehadiran. |
| **Filter Tahun** | Tombol bertuliskan tahun (misal `2026`) | Membuka modal dialog picker tahun scrollable (`1900` - `2099`). |
| **Kartu Metrik (7 Jenis)** | Masing-masing kontainer metrik memiliki icon dan counter angka | Menampilkan: **WFO**, **Cuti**, **Sakit**, **WFH**, **Lembur**, **Terlambat**, dan **Pulang Cepat**. |

### C. Pemetaan 8 Menu Navigasi PKWT
Seluruh 8 menu dieksplorasi secara read-only tanpa melakukan submit aksi pengubahan data:
1. **Absensi**:
   - Selector: `img[alt="Absensi"]` atau item grid "Absensi".
   - Rute Tujuan: `https://magang.dikahadir.com/apps/absent/activity`.
   - Komponen: Tombol kembali (`button`), judul `History Absensi`, daftar histori check-in bertingkat dengan pagination/infinite scroll (`Loading...`).
2. **Koreksi Absen**:
   - Selector: `img[alt="Koreksi Absen"]`.
   - Rute Tujuan: `https://magang.dikahadir.com/apps/absent/correction`.
   - Komponen: Header `Halaman Koreksi`, tombol `Kembali`, kartu `List Koreksi` (menampilkan Jam masuk/keluar, Tipe kerja, status approval, Dibuat tanggal), dan tombol `Ajukan Koreksi`.
3. **Izin**:
   - Selector: `img[alt="Izin"]`.
   - Rute Tujuan: `https://magang.dikahadir.com/apps/absent/permit`.
   - Komponen: Header `Halaman Izin`, tombol `Kembali`, 2 Tab navigasi (`Terlambat` & `Pulang Cepat`). Tab Terlambat memiliki `List Izin Terlambat` & tombol `Ajukan Izin Terlambat`. Tab Pulang Cepat memiliki `List Izin Pulang Cepat` & tombol `Ajukan Izin Pulang Cepat`.
4. **Lembur**:
   - Selector: `img[alt="Lembur"]`.
   - Rute Tujuan: `https://magang.dikahadir.com/apps/absent/overtime-client`.
   - Komponen: Header `Halaman Lembur`, tombol `Kembali`, daftar `List Overtime` (Jam Masuk, Jam Keluar, Status, Notes, Reject Notes, Tanggal Pengajuan), dan tombol `Ajukan Lembur`.
5. **Cuti**:
   - Selector: `img[alt="Cuti"]`.
   - Rute Tujuan: `https://magang.dikahadir.com/apps/absent/leave-client`.
   - Komponen: Header `Halaman Cuti`, tombol `Kembali`, daftar `List Request Cuti` (Dari/Sampai Tanggal, Status: Menunggu Approval/Dibatalkan, Tipe Cuti, Notes, Reject Notes), dan tombol `Ajukan Cuti`.
6. **Sakit**:
   - Selector: `img[alt="Sakit"]`.
   - Rute Tujuan: `https://magang.dikahadir.com/apps/absent/sick`.
   - Komponen: Header `Halaman Sakit`, tombol `Kembali`, daftar `List Request Sakit` (thumbnail `Bukti surat sakit`, rentang tanggal sakit, tanggal pengajuan), dan tombol `Ajukan Sakit`.
7. **Download Reports**:
   - Selector: `img[alt="Download Reports"]`.
   - Rute Tujuan: `https://magang.dikahadir.com/apps/absent/reports/share_report`.
   - Komponen: Header `Halaman Download Report`, tombol `Kembali`, combobox dropdown `Pilih tipe report` dengan pilihan: **Harian**, **Mingguan**, **Bulanan**, serta tombol aksi `Download Report`.
8. **Staff**:
   - Selector: `img[alt="Staff"]`.
   - Rute Tujuan: `https://magang.dikahadir.com/apps/absent/staff`.
   - Komponen: Tombol kembali, header `View Staff`, status daftar staff (`Tidak ada lagi data`).

### D. Validasi Form Pengajuan Menu PKWT (Read-Only Tanpa Mutasi Data)
Observasi interaksi form modal pengajuan saat data kosong:
1. **Koreksi Absen**: Mengklik "Ajukan Koreksi" membuka modal. Klik "Ajukan" saat jam kosong memunculkan pesan validasi: `"Salah satu harus diisi!"`.
2. **Izin Terlambat**: Mengklik "Ajukan Izin Terlambat" membuka modal. Klik "Ajukan" saat field kosong memunculkan validasi inline: `"Tanggal Harus diisi!"`, `"Jam Harus diisi!"`, `"Keterangan Harus diisi!"`.
3. **Lembur**: Mengklik "Ajukan Lembur" membuka modal. Klik "Ajukan" saat field kosong memunculkan validasi inline: `"Jam masuk harus di isi!"`, `"Jam Keluar harus di isi!"`, `"Masukan minimal 5 karakter"`.
4. **Cuti**: Mengklik "Ajukan Cuti" membuka modal form. Tombol "Ajukan" berstatus disabled/loading sebelum seluruh data wajib dilengkapi.
5. **Sakit**: Mengklik "Ajukan Sakit" membuka modal form. Tombol "Ajukan" berstatus disabled/loading sebelum tanggal dan bukti surat sakit diunggah.

### E. Riwayat Absensi (History Absensi) & Konsistensi Data
- Tautan **"Selengkapnya"** pada section History Absensi: Mengarahkan ke rute yang sama dengan menu Absensi (`https://magang.dikahadir.com/apps/absent/activity`).
- **Konsistensi Metrik vs Riwayat**: Total angka pada kartu ringkasan kehadiran bulan berjalan (misal: November WFO 7 + WFH 2 + Sakit 1 = 10) konsisten dan sesuai dengan jumlah 10 kartu riwayat absensi yang terdaftar pada bulan tersebut.
- Tombol aksi utama di bagian paling bawah dashboard: Tombol `Absen Masuk`.

---

## 3. Modul Karyawan Mitra: Dashboard & Presensi Berbasis Lokasi (`/apps/absent/mitra`)

- **URL Dashboard**: `https://magang.dikahadir.com/apps/absent/mitra`
- **Page Title**: `HADIR`
- **Proteksi Hak Akses (Cross-Role URL Guard)**:
  - Role Mitra membuka `/apps/absent` (dashboard PKWT): Dialihkan (*redirect*) kembali ke `/apps/absent/mitra`.
  - Role PKWT membuka `/apps/absent/mitra` (dashboard Mitra): Dialihkan (*redirect*) kembali ke `/apps/absent`.
  - Tanpa login: Seluruh rute dialihkan ke `/absen/login`.

### A. Layout & Header Mitra
| Elemen | Selector Teruji | Keterangan / Perilaku |
| :--- | :--- | :--- |
| **Foto Profil User** | `img[alt="photo user"]` | Mengalami kendala broken image 404 (kandidat defect tampilan: menampilkan logo icon dan teks alt `photo user`). |
| **Sapaan Header** | `p:has-text("Hai, Cecill Cheris2")` | Menampilkan nama akun mitra yang login dan subteks `Have a nice day !`. |
| **Drawer Navigasi Mitra** | `button:has(img[alt="menu"])` | Membuka drawer yang berisi menu `Change Password` dan tombol `Logout`. |
| **Tombol Logout Mitra** | `button:has-text("Logout")` | Berhasil mengakhiri sesi Mitra dan mengembalikan ke `/absen/login`. |

### B. Komponen Sapaan Waktu Dinamis (Greeting)
Observasi kode sumber frontend (`pages/apps/absent/mitra-*.js`):
- `03:00 - 11:59`: `"Good Morning"`
- `12:00 - 14:59`: `"Good Afternoon"`
- `15:00 - 19:59`: `"Good Evening"`
- `20:00 - 02:59`: `"Good Night"`
*Catatan Perbandingan Aturan Bisnis*: Penguji/User menetapkan batas waktu bisnis resmi adalah: 00:00-11:59 Good Morning, 12:00-14:59 Good Afternoon, 15:00-18:59 Good Evening, 19:00-23:59 Good Night. Terdapat selisih perilaku pada jam 00:00-02:59 dan jam 19:00-19:59 yang dicatat sebagai kandidat defect.

### C. Kartu Aktivitas & Laporan Kegiatan
- **Jumlah Kegiatan Bulan ini**: Menampilkan akumulasi angka kegiatan presensi mitra di bulan berjalan.
- **Laporan Kegiatan Pagi**: Menampilkan label dan waktu presensi masuk format `YYYY-MM-DD , HH:mm` (atau `-` jika belum absen masuk).
- **Laporan Kegiatan Sore**: Menampilkan label dan waktu presensi keluar format `YYYY-MM-DD , HH:mm` (atau `-` jika belum absen keluar).
- **Subteks**: `Semangat melakukan Aktivitas 🔥`.

### D. Alur Lokasi, Kamera & State Machine Tombol Presensi
> [!IMPORTANT]
> **Status Verifikasi Lapangan**: Alur mutasi presensi di bawah ini **BELUM DIVERIFIKASI SECARA EKSEKUSI NYATA (Belum Diverifikasi)** untuk menjaga integritas akun dan mematuhi aturan pengujian read-only. Uraian berikut ditelusuri dari analisis statis kode komponen frontend (`pages/apps/absent/mitra-*.js`).

1. **State 1: Belum Absen Masuk Hari Ini**
   - Tampil tombol hijau bertuliskan **`Kegiatan Pagi`** (`palette.success.main`).
   - Memicu pengecekan kamera (`requiredSelfie`) dan geolokasi (`navigator.geolocation.getCurrentPosition`).
   - **Penanganan Error Izin Lokasi**: Jika izin lokasi ditolak / geolocation error, browser memunculkan alert:
     `"Lokasi harus diizinkan, jika sudah diizinkan harap reload / refresh halaman web"`.
   - **Penanganan Error Izin Kamera**: Jika kamera ditolak, muncul alert:
     `"Akses Kamera Harus dizinkan"`.
   - **Kondisi Sukses (Belum Diverifikasi)**: Mengambil foto selfie wajah, membaca koordinat GPS, dan mengirim aksi `check-in`.
2. **State 2: Sudah Absen Masuk Hari Ini (Menunggu Jam Pulang) (Belum Diverifikasi)**
   - Tombol berubah menjadi oranye bertuliskan **`Kegiatan Sore`** (`palette.warning.main`).
   - Memicu aksi payload `check-out`.
3. **State 3: Sudah Absen Keluar Hari Ini (Belum Diverifikasi)**
   - Tombol kegiatan dihilangkan sepenuhnya dari tampilan (`null`) karena presensi hari tersebut telah selesai. Mencegah presensi ganda di hari yang sama.

