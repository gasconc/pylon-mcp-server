interface PylonConfig {
    pylon: {
        apiToken: string;
        baseUrl: string;
    };
}
declare const config: PylonConfig;
export declare function validateConfig(): PylonConfig;
export declare function getAuthHeader(): string;
export default config;
//# sourceMappingURL=config.d.ts.map