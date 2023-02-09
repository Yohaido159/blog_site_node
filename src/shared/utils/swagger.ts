import { ROOT_DIR } from "@/config";
import { join } from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';

const specs = swaggerJSDoc({
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
  apis: [join(ROOT_DIR, '/src/main/controllers/user.schema.yml')],
});

export const swaggerMiddleware =  [swaggerUi.serve, swaggerUi.setup(specs)]