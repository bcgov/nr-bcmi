module.exports = {
    testTimeout: 9000, // Set global timeout to 30 seconds
    preset: 'jest-preset-angular',
    collectCoverage: true, 
    coverageDirectory: './coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    moduleNameMapper: {
      "@oshc(.*)": "<rootDir>/src/app/modules/oshc/$1",
      "@shared(.*)": "<rootDir>/src/app/@shared/$1",
      "@app(.*)": "<rootDir>/src/app/$1",
      "@models(.*)": "<rootDir>/src/app/models/$1",
      "@map(.*)": "<rootDir>/src/app/map/$1",
      "@assets(.*)": "<rootDir>/src/assets/$1",
      "@pipes(.*)": "<rootDir>/src/app/pipes/$1",
      "@projects(.*)": "<rootDir>/src/app/projects/$1",
      "@services(.*)": "<rootDir>/src/app/services/$1",
      "@shared(.*)": "<rootDir>/src/app/shared/$1"
    }
  };