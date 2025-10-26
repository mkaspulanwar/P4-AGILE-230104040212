[![ci](https://github.com/mkaspulanwar/P4-AGILE-230104040212/actions/workflows/ci.yml/badge.svg)](https://github.com/mkaspulanwar/P4-AGILE-230104040212/actions/workflows/ci.yml)

# README ringkas (opsional, tapi dianjurkan)
Tambahkan di `README.md` bagian **Run & Test** untuk panduan testing:

## Run & Test

```bash
npm ci
npm run dev:orders  # [http://127.0.0.1:5002](http://127.0.0.1:5002)
npm run dev:notif   # [http://127.0.0.1:5003](http://127.0.0.1:5003)
npm test            # 2 passed, 5 tests
npx spectral lint openapi/api.yaml