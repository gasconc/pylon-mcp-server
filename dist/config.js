const config = {
    pylon: {
        apiToken: process.env.PYLON_API_TOKEN || '',
        baseUrl: process.env.PYLON_BASE_URL || 'https://api.usepylon.com',
    },
};
export function validateConfig() {
    const { apiToken } = config.pylon;
    if (!apiToken) {
        throw new Error('Missing required environment variable: PYLON_API_TOKEN');
    }
    return config;
}
export function getAuthHeader() {
    return `Bearer ${config.pylon.apiToken}`;
}
export default config;
//# sourceMappingURL=config.js.map