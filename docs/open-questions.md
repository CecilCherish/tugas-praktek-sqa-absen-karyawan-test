# Open Questions & Catatan Aturan Bisnis

Dokumen ini mencatat hal-hal yang tidak jelas, perilaku yang ambigu, atau pertanyaan aturan bisnis yang ditemukan selama proses pengujian/eksplorasi.

---

## Catatan Klarifikasi Aturan Bisnis (Resmi dari User)

### Q1: Validasi Pesan Error Autentikasi Spesifik
- **Klarifikasi User**: Memang **tidak ada pembedaan pesan** antara "Email atau password salah", "Format email tidak valid", dan "Field tidak boleh kosong". Seluruh kegagalan login menampilkan pesan yang sama yaitu `"Akun tidak ditemukan"`.
- **Dampak pada SIT**: Expected result pengujian negatif autentikasi distandarisasi untuk memverifikasi kemunculan alert `"Akun tidak ditemukan"`.

### Q2: Batasan Perangkat & Deteksi Desktop
- **Klarifikasi User**: Tampilan dirancang dinamis (bisa untuk mobile maupun desktop). Pada desktop, tampilan tampil terpusat dalam kolom sempit (mobile mirroring) dan tetap berfungsi normal.
- **Dampak pada SIT**: Pengujian difokuskan pada browser desktop standar tanpa emulasi mobile khusus.

### Q3: Aturan Geofence & Radius Lokasi
- **Klarifikasi User**: Aturan spesifik geofence radius tidak diketahui dari sisi bisnis, **JANGAN dimasukkan atau dibahas di dokumen SIT**.
- **Dampak pada SIT**: Pengujian lokasi hanya berfokus pada flow umum pembacaan geolokasi berhasil vs izin ditolak/tidak aktif.

### Q4: Batasan Jam Operasional & Transisi Clock-In/Clock-Out
- **Klarifikasi User**:
  1. Clock-in tidak memiliki batasan jam operasional.
  2. Clock-out hanya dapat dilakukan di hari yang sama.
  3. Transisi tombol: Saat belum clock-in, hanya tombol `Clock In` yang tersedia. Setelah clock-in berhasil, tombol digantikan oleh `Clock Out`. Kasus clock-out tanpa clock-in secara UI/desain tidak dapat terjadi.
- **Dampak pada SIT**: Pengujian memvalidasi pergantian state tombol dari Clock In menjadi Clock Out, serta pengujian clock-out di hari yang sama.

### Q5: Definisi & Kriteria "Laporan Kegiatan Pagi/Sore"
- **Klarifikasi User**: Fitur Laporan Kegiatan Pagi/Sore sebenarnya hanya menampilkan rekaman waktu kegiatan pagi (clock-in) dan kegiatan sore (clock-out).
- **Dampak pada SIT**: Expected result pada kartu kegiatan adalah waktu jam pencatatan presensi pagi dan sore.

### Q6: Standar Ekspektasi Aturan Bisnis Sapaan Waktu (Mitra)
- **Sumber Aturan Bisnis**: Ditetapkan secara resmi dan eksplisit oleh user:
  - `00:00 - 11:59`: `"Good Morning"`
  - `12:00 - 14:59`: `"Good Afternoon"`
  - `15:00 - 18:59`: `"Good Evening"`
  - `19:00 - 23:59`: `"Good Night"`
- **Implementasi Kode Frontend Saat Ini (`pages/apps/absent/mitra-*.js`)**:
  - `03:00 - 11:59`: `"Good Morning"`
  - `12:00 - 14:59`: `"Good Afternoon"`
  - `15:00 - 19:59`: `"Good Evening"`
  - `20:00 - 02:59`: `"Good Night"`
- **Catatan & Kandidat Defect**: Terdapat perbedaan logika jam antara aturan bisnis vs implementasi kode (terutama jam 00:00-02:59 yang masih dianggap Good Night, dan jam 19:00-19:59 yang masih Good Evening). Expected result pada SIT diatur mengikuti aturan bisnis resmi, sedangkan selisihnya dicatat sebagai kandidat defect pada kolom Notes.

### Q7: Strategi Pengulangan Data Presensi Mitra (Aturan 1 Kali per Hari per Akun)
- **Konteks**: Berdasarkan aturan bisnis dan state machine tombol presensi mitra, akun mitra hanya dapat melakukan 1 kali Clock In dan 1 kali Clock Out per hari. Setelah kedua aktivitas selesai, tombol hilang (`null`) dan tidak dapat diulang lagi di hari yang sama.
- **Tantangan Test Otomasi**: Jika automated test mutating dijalankan lebih dari satu kali dalam hari yang sama menggunakan akun yang sama, pengujian kedua akan gagal karena tombol sudah hilang (`null`).
- **Strategi Mitigasi**:
  1. Test presensi mutating (`@mutating`) hanya dijalankan secara serial pada lingkungan yang siap atau menggunakan akun khusus pada jadwal eksekusi tertentu.
  2. Gunakan verifikasi non-mutating untuk assertion state tombol (Kegiatan Pagi vs Kegiatan Sore vs Null) sebelum mengeksekusi mutating.
  3. Dibutuhkan reset database atau akun cadangan jika automated regression perlu dijalankan berulang kali dalam satu hari yang sama.

### Q8: Perbedaan Pesan Validasi Kredensial Form Login
- **Hasil Eksplorasi Nyata**:
  - Jika email TIDAK terdaftar (atau format salah / kosong): Banner menampilkan `"Akun tidak ditemukan"`.
  - Jika email TERDAFTAR namun password SALAH: Banner menampilkan `"Email atau password salah"`.
- **Dampak pada SIT**: Dibuat 2 test case terpisah untuk memvalidasi kedua skenario keamanan tersebut secara presisi.

### Catatan Bug UI / Broken Assets (Catatan User):
- **Temuan**: Terdapat bug tampilan di mana aset gambar (seperti foto profil user dan foto check-in) gagal dimuat (HTTP 404 pada network asset), sehingga hanya menampilkan fallback placeholder berupa logo icon foto dan teks nama/alt gambar ("photo user" atau "Photo Check In").
- **Dampak pada SIT**: TC-NF-UI-004 dijadikan sebagai test penanganan defect dengan tipe Negative.
