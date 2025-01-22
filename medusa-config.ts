import { loadEnv, defineConfig } from '@medusajs/framework/utils';

loadEnv(process.env.NODE_ENV || 'development', process.cwd());

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || 'supersecret',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
    },
  },
  modules: [
    {
      resolve: './src/modules/cms',
      options: {
        apiKey: process.env.CMS_API_KEY,
      },
    },
    {
      resolve: './src/modules/blog',
    },
    {
      resolve: './src/modules/hello',
      options: {
        capitalize: true,
      },
    },
    {
      resolve: './src/modules/brand',
    },
    {
      resolve: './src/modules/mongo',
      options: {
        connection_url: process.env.MONGO_CONNECTION_URL,
        db_name: process.env.MONGO_DB_NAME,
      },
    },
  ],
});
