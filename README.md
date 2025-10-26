# P4-AGILE-230104040212: Praktikum Web Service Engineering #4

[![ci](https://github.com/mkaspulanwar/P4-AGILE-230104040212/actions/workflows/ci.yml/badge.svg)](https://github.com/mkaspulanwar/P4-AGILE-230104040212/actions/workflows/ci.yml)

## 📄 Laporan Praktikum (REPORT)

Proyek ini adalah implementasi dari Mini-Sprint AGILE penuh. Detail lengkap tentang siklus, hasil pengujian, dan bukti *hardening* tersedia dalam laporan berikut:

<p align="center">
  <a href="./REPORT.md">
    <img src="https://img.shields.io/badge/Laporan%20Praktikum-REPORT.md-blue?style=for-the-badge&logo=markdown" alt="Lihat Laporan Praktikum Lengkap (REPORT.md)">
  </a>
</p>

---

## 🚀 Ringkasan Proyek

Repositori ini berisi implementasi *Web Service* yang dikembangkan menggunakan metodologi **Design-First** (OpenAPI) dan **Test-First**, diakhiri dengan tahap **Hardening** (Observability & Security).

### Arsitektur Service

| Service | Deskripsi | Port |
| :--- | :--- | :--- |
| **`order-service`** | Menerima dan memproses permintaan pesanan. | `5002` |
| **`notification-service`** | Menangani logika pengiriman notifikasi setelah pesanan berhasil. | `5003` |

### 🛠️ Tech Stack & Hardening Implemented

| Kategori | Tool/Library | Fungsi Utama (Sesuai Modul) |
| :--- | :--- | :--- |
| **Kontrak** | OpenAPI, Spectral | Design-First & linting spesifikasi API. |
| **Bahasa** | TypeScript, Zod | JavaScript + tipe data (membuat kode lebih aman) dan validasi skema data. |
| **Pengujian** | Jest, Supertest | Unit & Integration Testing (Test-First, RED $\rightarrow$ GREEN). |
| **Web Server** | Express | Kerangka kerja web minimalis (Routing & Middleware). |
| **Observability** | Pino / pino-http | Logging JSON terstruktur yang cepat, termasuk `x-correlation-id` untuk *tracing*. |
| **Security** | Helmet, `express-rate-limit` | Menambahkan *security headers* (CSP, HSTS) dan membatasi frekuensi *request* per IP. |
| **Integrasi** | GitHub Actions | Otomatisasi CI (*lint* + *typecheck* + *test*) setelah *commit*. |

---
## 📁 Project Directory
Berikut struktur lengkap proyek agar mudah dipahami konteks tiap komponen:
```bash
P4-AGILE-230104040212/
├── .github/
│ └── workflows/
│ └── ci.yml
│
├── contracts/
│ └── docs/
│ ├── Backlog.md
│ ├── DoD.md
│ └── ProductGoal.md
│
├── hardening_logs/
│ ├── 20251026_112154_200_notifications.txt
│ ├── 20251026_112154_201_orders.txt
│ ├── 20251026_113400_400_orders_validation.txt
│ ├── 20251026_132057_400_orders_badjson.txt
│ └── LogDir/
│
├── mock_logs/
│ ├── 20251025_183021_200_notifications.txt
│ ├── 20251025_183021_201_orders.txt
│ ├── 20251025_183021_400_orders.txt
│ └── 20251025_183021_401_notifications.txt
│
├── openapi/
│ └── api.yaml
│
├── services/
│ ├── notification-service/
│ │ ├── src/
│ │ │ ├── index.ts
│ │ │ └── server.ts
│ │ └── test/
│ │ └── notification.spec.ts
│ │
│ └── order-service/
│ ├── src/
│ │ ├── index.ts
│ │ └── server.ts
│ └── test/
│ └── order.spec.ts
│
├── .gitignore
├── .spectral.yaml
├── CONTRIBUTING.md
├── jest.config.cjs
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── REPORT.md
├── req_201.json
├── req_400.json
├── req_invalid_business.json
├── req_ok.json
├── tsconfig.json
└── utils.ts
```

## ▶️ Run & Test

Berikut adalah panduan singkat untuk menjalankan *service* dan melakukan pengujian.

### Prasyarat

* Node.js 18+ & npm
* Git

### Cara Menjalankan

1.  **Instalasi Dependensi & CI (Setup Awal):**
    ```bash
    npm ci
    ```

2.  **Jalankan Service:** Buka dua *terminal* terpisah untuk menjalankan kedua *service* secara simultan:
    ```bash
    # Terminal 1: Order Service
    npm run dev:orders  # [http://127.0.0.1:5002](http://127.0.0.1:5002)

    # Terminal 2: Notification Service
    npm run dev:notif   # [http://127.0.0.1:5003](http://127.0.0.1:5003)
    ```
    *(Gunakan `curl.exe` atau Postman sesuai lampiran perintah uji untuk berinteraksi dengan API)*

### Pengujian Otomatis & Linting

Untuk menjalankan tes unit/integrasi dan memeriksa spesifikasi OpenAPI:

```bash
# Menjalankan semua tes (Target: 2 passed, 5 tests)
npm test

# Linting spesifikasi OpenAPI (Target: 0 error)
npx spectral lint openapi/api.yaml