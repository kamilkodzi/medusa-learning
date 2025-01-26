// EXECUTE FROM API:
import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import myWorkflow from '../../workflows/hello-world';

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { result } = await myWorkflow(req.scope).run({
    input: {
      name: ['John', 'Jane', 'Doe'],
      is_active: false,
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
