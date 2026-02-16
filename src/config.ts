interface PylonConfig {
  pylon: {
    apiToken: string;
    baseUrl: string;
  };
}

const config: PylonConfig = {
  pylon: {
    apiToken: process.env.PYLON_API_TOKEN || '',
    baseUrl: process.env.PYLON_BASE_URL || 'https://api.usepylon.com',
  },
};

export function validateConfig(): PylonConfig {
  const { apiToken } = config.pylon;

  if (!apiToken) {
    throw new Error('Missing required environment variable: PYLON_API_TOKEN');
  }

  return config;
}

export function getAuthHeader(): string {
  return `Bearer ${config.pylon.apiToken}`;
}

export default config;
