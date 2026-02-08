const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    baseURL: 'http://saucedemo.com',
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
});