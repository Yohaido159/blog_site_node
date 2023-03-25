import { ROOT_DIR } from '@/config';
import { join } from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const specs = swaggerJSDoc({
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
      description: 'API',
    },
    servers: [
      {
        url: 'http://localhost:8000/api',
      },
    ],
  },
  apis: ['/app/src/main/controllers/user.schema.yml'],
});

export const swaggerMiddleware = ['/api-docs', swaggerUi.serve, swaggerUi.setup(specs)] as const;
