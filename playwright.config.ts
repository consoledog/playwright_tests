import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 60000,
    expect: {
        timeout: 5000
    },
    retries: 2,
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 10000,
        baseURL: 'https://www2.destinationgotland.se/en/accommodation',
        screenshot: 'only-on-failure'
    },
    reporter: [['list'], ['html']],
});
