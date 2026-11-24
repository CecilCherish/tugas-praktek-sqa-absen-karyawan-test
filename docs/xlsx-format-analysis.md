# Analisis Format Dokumen SIT Spreadsheet (`DOKUMEN_SIT_MAGANG_DIKAHADIR_RAPI.xlsx`)

Dokumen ini mendokumentasikan hasil analisis struktur, format teknis, styling, dan konvensi penulisan pada file spreadsheet pengujian tanpa mengutip atau mengadaptasi isi data test case lama.

---

## 1. Ikhtisar Lembar Kerja (Sheets Overview)
Workbook terdiri dari 4 sheet:
1. `Summary Dashboard` (Sheet 1): Ringkasan metrik eksekutif, informasi proyek, dan status agregat (berisi merge cell dan formula metrik).
2. `SIT - Dashboard Admin` (Sheet 2): Sheet pengujian modul web admin (digunakan sebagai sheet pembanding).
3. `SIT - Aplikasi Karyawan` (Sheet 3): **Target sheet** yang akan diisi ulang dengan test case baru hasil eksplorasi aktual.
4. `Role & Permission Matrix` (Sheet 4): Matriks hak akses per rute URL untuk berbagai tingkatan role.

---

## 2. Struktur Kolom Sheet Target (`SIT - Aplikasi Karyawan`) & Pembanding
Kedua sheet SIT (`SIT - Aplikasi Karyawan` dan `SIT - Dashboard Admin`) memiliki struktur kolom yang **100% identik** sebanyak 13 kolom (Kolom A s/d M):

| No. | Kolom Excel | Nama Header | Lebar Kolom (Width) | Tipe Data / Format | Horizontal Align |
| :---: | :---: | :--- | :---: | :--- | :---: |
| 1 | `A` | `Test Case ID` | 18 | Teks (Kode Unik) | Center |
| 2 | `B` | `Menu Utama` | 24 | Teks | Left |
| 3 | `C` | `Sub-Menu / Fitur` | 30 | Teks | Left |
| 4 | `D` | `Test Scenario Description` | 42 | Teks | Left |
| 5 | `E` | `Test Type` | 14 | Dropdown List | Center |
| 6 | `F` | `Pre-Conditions` | 32 | Teks Multiline | Left |
| 7 | `G` | `Test Steps` | 44 | Teks Multiline Bernomor | Left |
| 8 | `H` | `Test Data / Input` | 34 | Teks Multiline Key-Value | Left |
| 9 | `I` | `Expected Result` | 46 | Teks Multiline | Left |
| 10 | `J` | `Actual Result` | 20 | Teks (Kosong saat test design) | Left |
| 11 | `K` | `Status` | 14 | Dropdown List | Center |
| 12 | `L` | `Priority` | 14 | Dropdown List | Center |
| 13 | `M` | `Notes` | 32 | Teks | Left |

---

## 3. Baris Header & Penggabungan Sel (Merge Cells)
- **Baris Header**: Berada tepat pada **Row 1**.
- **Merge Cells**:
  - Pada sheet `SIT - Aplikasi Karyawan`: **Tidak ada merge cell** (0 merge cell).
  - Pada sheet `SIT - Dashboard Admin`: **Tidak ada merge cell** (0 merge cell).
  - Seluruh data bersifat flat tabular row-by-row, memudahkan sorting dan filtering.

---

## 4. Konvensi Penomoran Test Case ID
- Pola penomoran: `TC-<SCOPE/ROLE>-<MODUL>-<NOMOR_URUT_3_DIGIT>`
  - Format kode pembanding admin: `TC-ADM-<MODUL>-001` (misal: `TC-ADM-AUTH-001`).
  - Format kode aplikasi karyawan: `TC-ESS-<MODUL>-001` (ESS = Employee Self Service, misal `TC-ESS-AUTH-001`, `TC-ESS-ABS-001`, `TC-ESS-HST-001`).
- Untuk test case baru yang mencakup 2 role spesifik (PKWT & Mitra), konvensi tetap konsisten menggunakan prefix `TC-PKWT-<MODUL>-<XXX>` dan `TC-MITRA-<MODUL>-<XXX>` atau `TC-ESS-<ROLE>-<XXX>` agar rapi dan terelasi dengan peran pengguna.

---

## 5. Validasi Data (Dropdown List)
Terdapat 3 kolom dengan aturan Data Validation (list picker):
1. **Kolom E (`Test Type`)**:
   - Rentang: Baris 2 s/d baris akhir data.
   - Pilihan: `"Positive,Negative"`
2. **Kolom K (`Status`)**:
   - Rentang: Baris 2 s/d baris akhir data.
   - Pilihan: `"Pass,Fail,Pending,Blocked"`
   - Nilai default awal: `Pending`
3. **Kolom L (`Priority`)**:
   - Rentang: Baris 2 s/d baris akhir data.
   - Pilihan: `"Critical,High,Medium,Low"`

---

## 6. Tata Gaya & Warna (Styling)

### A. Header Row (Row 1):
- **Font**: Segoe UI, ukuran `10pt`, Bold, warna teks `#FFFFFF` (Putih).
- **Background Fill**: Solid `#1B365D` (Dark Navy Blue).
- **Border**: Thin line (`#D9D9D9` / grey) di keempat sisi (top, bottom, left, right).
- **Alignment**: Center (horizontal), Center (vertical), Wrap Text = `True`.

### B. Data Rows (Row 2 ke bawah) - Pola Zebra Striping:
- **Baris Genap (Row 2, 4, 6, ...)**:
  - Background fill: `None` (Putih polos).
  - Font: Segoe UI, ukuran `9pt`, Regular, warna teks `#2D3748` (Slate / Dark Charcoal).
  - Border: Thin di keempat sisi.
- **Baris Ganjil (Row 3, 5, 7, ...)**:
  - Background fill: Solid `#F8FAFC` (Soft light grey/blue).
  - Font: Segoe UI, ukuran `9pt`, Regular, warna teks `#2D3748`.
  - Border: Thin di keempat sisi.

### C. Styling Khusus Kolom E (`Test Type` Badges):
- Jika `Positive`: Font Segoe UI `9pt`, Bold, warna teks `#137333` (Hijau Tua), Background fill `#E6F4EA` (Hijau Muda Lembut).
- Jika `Negative`: Font Segoe UI `9pt`, Bold, warna teks `#C5221F` (Merah Tua), Background fill `#FCE8E6` (Merah Muda Lembut).

### D. Alignment Data:
- Kolom `A` (ID), `K` (Status), `L` (Priority): Horizontal `Center`, Vertical `Center`, Wrap Text = `True`.
- Kolom `E` (Test Type): Horizontal `Center`, Vertical `Center`, Wrap Text = `True`.
- Kolom `B`, `C`, `D`, `F`, `G`, `H`, `I`, `J`, `M`: Horizontal `Left`, Vertical `Center`, Wrap Text = `True`.

---

## 7. Baris Ringkasan / Footer
- Pada sheet `SIT - Aplikasi Karyawan` dan `SIT - Dashboard Admin`, **TIDAK ADA baris footer/summary** di bagian bawah baris data. Baris data langsung berhenti pada record terakhir.
- Ringkasan total pengujian dikelola secara terpusat pada sheet `Summary Dashboard`.

---

## 8. Pola & Gaya Penulisan Konten Kolom
Analisis terhadap gaya penyampaian (bukan menyalin substansi):
- **Pre-Conditions**: Frasa deklaratif singkat tentang prasyarat sistem atau status awal user (misal: kondisi halaman URL aktif, status sesi pengguna, atau kesiapan izin device).
- **Test Steps**: Ditulis berurutan menggunakan format penomoran eksplisit dengan pemisah baris baru (`\n`):
  ```text
  1. [Langkah aksi pertama]
  2. [Langkah aksi pengisian / pemilihan data]
  3. [Langkah aksi pemicu / klik tombol submit]
  ```
- **Test Data / Input**: Ditulis dalam format key-value terstruktur per baris (`\n`):
  ```text
  Field1: Value1
  Field2: Value2
  ```
- **Expected Result**: Pernyataan hasil yang komprehensif mencakup respon sistem, pesan visual (alert / notifikasi), dan status sesi atau perpindahan halaman yang dapat diamati secara objektif.
- **Notes**: Catatan tujuan pengujian atau konteks khusus (misal: happy path, edge case validasi keamanan, boundary check).
