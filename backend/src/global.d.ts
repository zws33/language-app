declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT: number;
            USER: string;
            PASSWORD: string;
            HOST: string;
            DB_PORT: number;
            DATABASE: string;
            SSLMODE: string;
            TRANSLATION_SERVICE_URL: string;
        }
    }
}

export { };