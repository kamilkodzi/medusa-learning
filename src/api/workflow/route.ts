// EXECUTE FROM API:
import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import myWorkflow from '../../workflows/hello-world';
import { IWorkflowEngineService } from '@medusajs/framework/types';
import { Modules } from '@medusajs/framework/utils';

// How to Access Workflow Errors ? (https://docs.medusajs.com/learn/fundamentals/workflows/access-workflow-errors#how-to-access-workflow-errors)
// TODO check that capture error also prevent from compensation function to trigger
export async function GET1000(req: MedusaRequest, res: MedusaResponse) {
  const { result, errors } = await myWorkflow(req.scope).run({
    // ...
    throwOnError: false,
  });

  if (errors.length) {
    return res.send({
      errors: errors.map((error) => error.error),
    });
  }

  res.send(result);
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { result, transaction } = await myWorkflow(req.scope).run({
    input: {
      name: ['John', 'Jane', 'Doe'],
      is_active: false,
    },
  });

  // receive workflowEngineService
  const workflowEngineService = req.scope.resolve<IWorkflowEngineService>(
    Modules.WORKFLOW_ENGINE
  );

  // subscribe to workflow hello-world
  const subscriptionOptions = {
    workflowId: 'hello-world',
    transactionId: transaction.transactionId,
    subscriberId: 'hello-world-subscriber',
  };

  await workflowEngineService.subscribe({
    ...subscriptionOptions,
    subscriber: async (data) => {
      if (data.eventType === 'onFinish') {
        console.log('Finished execution', data.result);
        // unsubscribe
        await workflowEngineService.unsubscribe({
          ...subscriptionOptions,
          subscriberOrId: subscriptionOptions.subscriberId,
        });
      } else if (data.eventType === 'onStepFailure') {
        console.log('Workflow failed', data.step);
      }
    },
  });

  res.send(result);
}

// ALSO CAN BE EXECUTED FROM SUBSCRIBER src/subscribers/order-placed.ts
// import {
//   type SubscriberConfig,
//   type SubscriberArgs,
// } from '@medusajs/framework';
// import myWorkflow from '../workflows/hello-world';

// export default async function handleOrderPlaced({
//   event: { data },
//   container,
// }: SubscriberArgs<{ id: string }>) {
//   const { result } = await myWorkflow(container).run({
//     input: {
//       name: 'John',
//     },
//   });

//   console.log(result);
// }

// export const config: SubscriberConfig = {
//   event: 'order.placed',
// };

// ALSO CAN BE EXECUTED FROM SCHEDULED JOB:
// import { MedusaContainer } from "@medusajs/framework/types"
// import myWorkflow from "../workflows/hello-world"

// export default async function myCustomJob(
//   container: MedusaContainer
// ) {
//   const { result } = await myWorkflow(container)
//     .run({
//       input: {
//         name: "John",
//       },
//     })

//   console.log(result.message)
// }

// export const config = {
//   name: "run-once-a-day",
//   schedule: `0 0 * * *`,
// };
