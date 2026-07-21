// Config Jest dedicada para o código em api/ (Vercel Functions).
// Separada do `react-scripts test` (que só varre src/) porque api/ roda em
// Node puro, sem DOM/jsdom, e não deve ser incluída no bundle do frontend.
module.exports = {
  rootDir: __dirname,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/api/**/*.test.js'],
};