import express from 'express';

import { PORT, NODE_ENV } from '@/config';
import { logger } from '@/shared/utils/logger';
import { connectToDB } from '@/infrastructure/database/mongodb';
import { registerRoutes } from '@/routes/all.routes';
import { registerMiddleware } from '@/server/app.middleware';

const app = express();

registerMiddleware(app);
registerRoutes(app);

connectToDB();

app.listen(PORT, () => {
  logger.info(`=================================`);
  logger.info(`======= ENV: ${NODE_ENV} =======`);
  logger.info(`🚀 App listening on the port ${PORT}`);
  logger.info(`=================================`);
});
