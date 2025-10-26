# 🧑‍💻 Panduan Kontribusi (CONTRIBUTING.md)

## Kontribusi ke Proyek WSE — Mini E-Commerce API

Terima kasih sudah tertarik untuk berkontribusi pada proyek ini! 🙌  
Proyek ini dibuat sebagai bagian dari **Modul Praktikum #4 Web Service Engineering (20251)** di bawah bimbingan **Muhayat, M.IT**.  

---

## 👥 Daftar Kontributor

| Nama | NIM | Peran / Kontribusi |
|------|-----|---------------------|
| **M. Kaspul Anwar** | 230104040212 | Developer utama — OpenAPI design, implementasi, dan dokumentasi |
| [Tambahkan nama lain di sini] | [NIM] | [Deskripsi kontribusi, misal: tester, CI integrator, dokumentasi, dsb.] |

---

## 🧭 Cara Berkontribusi

### 1. Buat branch baru untuk fitur atau perbaikanmu
```bash
git checkout -b feature/nama-fitur
```

---

### 2. Ikuti standar proyek

#### Pastikan lint OpenAPI bebas error:
```bash
npx spectral lint openapi/api.yaml
```

#### Pastikan semua test lulus:
```bash
npm test
```

#### Gunakan TypeScript dan middleware sesuai *Definition of Done (DoD)*:
- Validasi dengan **Zod**  
- Logging dengan **Pino**  
- **Rate-limit** dan **Helmet** aktif  
- Error JSON rusak harus **400**, bukan **500**

---

### 3. Commit dengan pesan yang jelas
```bash
git commit -m "feat: tambah validasi produk pada POST /orders"
```

---

### 4. Push ke branch milikmu
```bash
git push origin feature/nama-fitur
```

---

### 5. Buka Pull Request (PR)
- Jelaskan perubahanmu (misalnya: fitur baru, perbaikan bug, atau pembaruan dokumentasi).  
- Tambahkan bukti lint/test (screenshot atau log).  
- Pastikan semua tes dan lint berstatus **hijau** sebelum PR dikirim.

---

## ✅ Standar Kontribusi

| Kategori | Kriteria |
|-----------|-----------|
| **Kualitas Kode** | Tidak ada warning/error lint, format TypeScript benar |
| **Testing** | Semua `npm test` hijau |
| **Dokumentasi** | README dan REPORT.md diperbarui jika perlu |
| **Keamanan** | Header `x-correlation-id`, Helmet, dan rate-limit aktif |
| **Logs** | JSON terstruktur, tanpa bocor data sensitif |

---

## 💬 Kontak

Untuk pertanyaan atau kolaborasi, silakan hubungi:

- **Muhayat, M.IT (Dosen Pengampu)**  
- **M. Kaspul Anwar (Developer Utama)**  
  - GitHub: [@username](https://github.com/username)  
  - Email: [alamat-emailmu@uin-antasari.ac.id](mailto:alamat-emailmu@uin-antasari.ac.id)

---

> 💡 **Catatan:**  
> Setiap kontribusi yang dikirim akan ditinjau terlebih dahulu sebelum digabungkan ke branch utama (`main`).  
> Pastikan seluruh tes dan lint berjalan **hijau** sebelum melakukan *Pull Request*.
