declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      DATABASE_URL: string;
      PORT: number;
      TRANSLATION_SERVICE_URL: string;
      TRANSLATION_API_KEY: string;
      CA_CERT: string | undefined;
    }
  }
}

export {};
