declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            DATABASE_URL: string;
            TRANSLATION_SERVICE_URL: string;
            CA_CERT: string | undefined;
        }
    }
}

export { };