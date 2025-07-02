module.exports = {
    src: 'src/tests/**/*.test.js',
    browsers: ['chrome', 'firefox'],
    reporter: {
        name: 'spec',
        output: 'reports/test-results.txt'
    },
    screenshots: {
        path: 'reports/screenshots',
        takeOnFails: true,
        fullPage: true
    },
    video: {
        path: 'reports/videos',
        failedOnly: true
    },
    concurrency: 5,
    quarantineMode: {
        enabled: true,
        attempts: 2
    }
};