import { PORT, NODE_ENV } from '@/config';
import app from './server/app';
import { logger } from './shared/utils/logger';

app.listen(PORT, () => {
  logger.info(`=================================`);
  logger.info(`======= ENV: ${NODE_ENV} =======`);
  logger.info(`🚀 App listening on the port ${PORT}`);
  logger.info(`=================================`);
});
