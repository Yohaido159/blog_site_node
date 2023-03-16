import { dump } from 'js-yaml';

// Helper functions for creating schemas
function createObjectType(properties: Record<string, any>): Record<string, any> {
  return {
    type: 'object',
    properties,
  };
}

function createStringType(format?: string): Record<string, any> {
  return format ? { type: 'string', format } : { type: 'string' };
}

function createIntegerType(format?: string): Record<string, any> {
  return format ? { type: 'integer', format } : { type: 'integer' };
}

// Helper functions for creating content
function createContent(schema: Record<string, any>): Record<string, any> {
  return {
    'application/json': {
      schema,
    },
  };
}

// Helper functions for creating request body and responses
function createRequestBody(required: boolean, schema: Record<string, any>): Record<string, any> {
  return {
    required,
    content: createContent(schema),
  };
}

function createResponse(statusCode: number, description: string, schema?: Record<string, any>): Record<string, any> {
  return {
    [statusCode]: {
      description,
      content: schema ? createContent(schema) : undefined,
    },
  };
}

// Helper functions for creating paths
function createPathItem(
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  summary: string,
  requestBody?: ReturnType<typeof createRequestBody>,
  responses?: ReturnType<typeof createResponse>,
): Record<string, any> {
  return {
    [method]: {
      summary,
      requestBody,
      responses,
    },
  };
}

// Helper functions for creating components
function createComponents(schemas: Record<string, any>): Record<string, any> {
  return {
    components: {
      schemas,
    },
  };
}

// Function to generate OpenAPI schema
function generateOpenApiSchema(info: { title: string; version: string }, paths: Record<string, any>, components: Record<string, any>): string {
  const openApiSchema = {
    openapi: '3.0.0',
    info,
    paths,
    ...components,
  };

  return dump(openApiSchema);
}

// Define User schema
const User = createObjectType({
  id: createIntegerType('int64'),
  name: createStringType(),
  email: createStringType('email'),
  password: createStringType(),
});

const UserWithTokens = createObjectType({
  user: { $ref: '#/components/schemas/User' },
  tokens: createObjectType({
    accessToken: createStringType(),
    refreshToken: createStringType(),
  }),
});
  

const ErrorSchema = createObjectType({
    code: createIntegerType(),
    message: createStringType(),
  });

// Define paths
const paths = {
  '/signup': {
    ...createPathItem('post', 'Create a new user', createRequestBody(true, { $ref: '#/components/schemas/User' }), {
      ...createResponse(200, 'Successfully created user', UserWithTokens),
      ...createResponse(400, 'Bad Request', ErrorSchema),
      ...createResponse(409, 'User already exists', ErrorSchema),
    }),
  },
  '/signin': {
    ...createPathItem(
      'post',
      'Sign in a user',
      createRequestBody(true, createObjectType({ email: createStringType('email'), password: createStringType() })),
      {
        ...createResponse(200, 'Successfully signed in user', UserWithTokens),
        ...createResponse(400, 'Bad Request', ErrorSchema),
        ...createResponse(404, 'User not found', ErrorSchema),
      },
    ),
  },
  '/me': {
    ...createPathItem(
      'get',
      'Get user information',
      undefined,
      createResponse(200, 'Successfully retrieved user information', { $ref: '#/components/schemas/User' }),
    ),
  },
  '/refresh': {
    ...createPathItem(
      'post',
      "Refresh user's token",
      undefined,
      createResponse(200, "Successfully refreshed user's token", { $ref: '#/components/schemas/User' }),
    ),
  },
};

// Define components
const components = createComponents({
  User,
});

const openApiYaml = generateOpenApiSchema({ title: 'User API', version: '1.0.0' }, paths, components);

console.log(openApiYaml);
