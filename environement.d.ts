declare global {
    namespace NodeJS {
        interface ProcessEnv {
             NODE_ENV: 'development' | 'production' | 'test';
             PUBLIC_URL: string;
            PORT: string;
            JWT_SECRET: string;
        }
    }
}
export {};
