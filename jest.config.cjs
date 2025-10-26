// jest.config.cjs
/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // HAPUS BARIS 'roots' INI (sudah tidak diperlukan karena testMatch sudah spesifik)
  // roots: ['<rootDir>/services'], 
  
  testMatch: ['**/test/**/*.spec.ts'], 
  moduleFileExtensions: ['ts', 'js', 'json'],
  verbose: true,
  testTimeout: 10000
};

module.exports = config;