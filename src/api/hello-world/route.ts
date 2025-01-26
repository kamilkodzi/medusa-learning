// import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';

// export async function GET(req: MedusaRequest, res: MedusaResponse) {
//   res.json({ message: 'Hello world!' });
// }

// import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';

// export const GET = (req: MedusaRequest, res: MedusaResponse) => {
//   res.json({
//     message: '[GET] Hello world!',
//   });
// };

import type {
  AuthenticatedMedusaRequest,
  MedusaRequest,
  MedusaResponse,
} from '@medusajs/framework/http';
import {
  ICustomerModuleService,
  IUserModuleService,
} from '@medusajs/framework/types';
import { MedusaError, Modules } from '@medusajs/framework/utils';

export const GET3 = async (req: MedusaRequest, res: MedusaResponse) => {
  res.json({
    message: '[GET] Hello world!',
  });
};

// export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
//   res.json({
//     message: '[POST] Hello world!',
//   });
// };

type HelloWorldReq = {
  name: string;
};

export const POST = async (
  req: MedusaRequest<HelloWorldReq>,
  res: MedusaResponse
) => {
  res.json({
    message: `[POST] Hello ${req.body.name}!`,
  });
};

export const GET2 = async (req: MedusaRequest, res: MedusaResponse) => {
  res.status(201).json({
    message: 'Hello, World!',
  });
};

// to get user data if route is protected then use AuthenticatedMedusaRequest instead of MedusaRequest
export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  let customer: any;

  if (req.auth_context?.actor_id) {
    // retrieve customer
    const customerModuleService: IUserModuleService = req.scope.resolve(
      Modules.USER
    );

    customer = await customerModuleService.retrieveUser(
      req.auth_context.actor_id
    );
  }
  // throw new MedusaError(MedusaError.Types.NOT_FOUND, 'Not allowed');

  const interval = setInterval(() => {
    res.write(`Streaming data... for ${JSON.stringify(customer)}\n`);
  }, 3000);

  req.on('end', () => {
    clearInterval(interval);
    res.end();
  });
};
