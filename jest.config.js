export default {
    testEnvironment: 'jsdom',
    transform: { '^.+\\.[jt]sx?$': 'babel-jest' },
    moduleNameMapper: {
        // Ignore imported style files
        '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
