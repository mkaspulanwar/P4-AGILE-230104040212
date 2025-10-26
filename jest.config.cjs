// jest.config.cjs

/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Hapus atau ganti baris 'roots' ini
  // roots: ['<rootDir>/services'], 
  // Jika dihilangkan, Jest akan mencari dari root.
  // Jika dipertahankan, harus benar-benar di dalam folder services
  
  testMatch: ['**/test/**/*.spec.ts'], // Path ini terlihat sudah benar
  moduleFileExtensions: ['ts', 'js', 'json'],
  verbose: true,
  testTimeout: 10000
};

module.exports = config;