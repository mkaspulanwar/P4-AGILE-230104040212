# Laporan Praktikum #4 - Web Service Development Methodologies (AGILE)

| Item | Detail |
| :--- | :--- |
| **Nama/NIM** | M. Kaspul Anwar - 230104040212 |
| **Kelas** | TI 23 A |
| **Repo/Zip** | https://github.com/mkaspulanwar/P4-AGILE-230104040212|
| **Tanggal** | 2025-10-26 |

---

## 1. Tujuan

Mendemonstrasikan siklus **Agile (Mini-Sprint)** untuk layanan web:
Design-First $\rightarrow$ Mock-First (OpenAPI + Prism) $\rightarrow$ Test-First (Jest + Supertest) $\rightarrow$ Implementasi (GREEN) $\rightarrow$ CI (lint+typecheck+test) $\rightarrow$ Hardening (observability & security).

## 2. Ringkasan Arsitektur

* **Services**: `order-service`, `notification-service`
* **Kontrak**: `openapi/api.yaml` (Lint 0 error)
* **Testing**: Jest + Supertest
* **CI/CD**: GitHub Actions (`.github/workflows/ci.yml`)
* **Observability**: Pino (JSON), `x-correlation-id`
* **Security**: Auth Bearer (dummy), Helmet, Rate-Limit, Validasi (Zod)

## 3. Hasil Utama

* **Lint OpenAPI**: LULUS ([lihat](docs/spectral_pass.png))
* **Unit test**: `2 passed, 5 tests` ([lihat](docs/npm_test_pass.png))
* **CI/CD**: Hijau ([lihat](docs/ci_pass.png))
* **Mock-First bukti**: lihat `mock_logs/...`
* **Hardening bukti**: lihat `hardening_logs/...`

## 4. Bukti Eksekusi (tautan cepat)

### 4.1 Mock-First

| Status Code | Deskripsi | Bukti Log |
| :--- | :--- | :--- |
| **201 Created** | `order-service` | [📄 mock_logs/20251025_183021_201_orders.txt](./mock_logs/20251025_183021_201_orders.txt) |
| **200 OK** | `notification-service` | [📄 mock_logs/20251025_183021_200_notifications.txt](./mock_logs/20251025_183021_200_notifications.txt) |
| **401 Unauthorized** | `notification-service` | [📄 mock_logs/20251025_183021_401_notifications.txt](./mock_logs/20251025_183021_401_notifications.txt) |
| **400 Bad Request** | `order-service` | [📄 mock_logs/20251025_183021_400_orders.txt](./mock_logs/20251025_183021_400_orders.txt) |

### 4.2 Hardening (Runtime)

| Status Code | Deskripsi | Bukti Log |
| :--- | :--- | :--- |
| **201 Created** | (orders) | [📄 hardening_logs/20251026_112154_201_orders.txt](./hardening_logs/20251026_112154_201_orders.txt) |
| **200 OK** | (notifications) | [📄 hardening_logs/20251026_112154_200_notifications.txt](./hardening_logs/20251026_112154_200_notifications.txt) |
| **401 Unauthorized** | (orders, tanpa bearer) | [📄 hardening_logs/20251026_113400_401_orders.txt](./hardening_logs/20251026_113400_401_orders.txt) |
| **400 ValidationError** | (orders) | [📄 hardening_logs/20251026_113400_400_orders_validation.txt](./hardening_logs/20251026_113400_400_orders_validation.txt) |
| **400 Bad JSON** | (opsional) | [📄 hardening_logs/20251026_132057_400_orders_badjson.txt](./hardening_logs/20251026_132057_400_orders_badjson.txt) |

* **Cek header**: `x-correlation-id` muncul di response.  
* **Helmet headers** (CSP, X-Frame-Options, X-Content-Type-Options, dll.) muncul di 200/201.

---

## 5. Penjelasan Hardening

* **Logging**: Pino (JSON). Field sensitif (`authorization`, `cookie`) **[REDACTED]**.
* **Tracing**: `x-correlation-id` disisipkan lebih awal $\rightarrow$ konsisten di log & response.
* **Error Safety**:
    * JSON rusak $\rightarrow$ **400 BAD\_JSON** (bukan 500).
    * Validasi bisnis gagal $\rightarrow$ **400 ValidationError**.
    * Tanpa bearer $\rightarrow$ **401 UNAUTH**.
* **Rate-Limit**: 60/min (orders), 120/min (notif).
* **Security Headers**: via Helmet (CSP, X-Frame-Options, HSTS, dsb).

---

## 6. Cara Reproduksi (singkat)

Berikut adalah perintah singkat untuk menjalankan proyek (gunakan `npm ci` terlebih dahulu untuk instalasi dependensi).

```bash
npm ci
npm run dev:orders  # :5002
npm run dev:notif   # :5003
# gunakan curl.exe (windows) sesuai lampiran perintah uji