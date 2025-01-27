import {
  ContainerRegistrationKeys,
  Modules,
  promiseAll,
  TransactionHandlerType,
} from '@medusajs/framework/utils';
import {
  createStep,
  createWorkflow,
  parallelize,
  StepResponse,
  transform,
  when,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';

type SetStepSuccessStepInput = {
  transactionId: string;
};
type SetStepFailureStepInput = {
  transactionId: string;
};

export const setStepSuccessStep = createStep(
  'set-step-success-step',
  async function ({ transactionId }: SetStepSuccessStepInput, { container }) {
    const workflowEngineService = container.resolve(Modules.WORKFLOW_ENGINE);

    await workflowEngineService.setStepSuccess({
      idempotencyKey: {
        action: TransactionHandlerType.INVOKE,
        transactionId,
        stepId: 'step-async',
        workflowId: 'hello-world',
      },
      stepResponse: new StepResponse('Done!'),
      options: {
        container,
      },
    });
  }
);

export const setStepFailureStep = createStep(
  'set-step-failed-step',
  async function ({ transactionId }: SetStepFailureStepInput, { container }) {
    const workflowEngineService = container.resolve(Modules.WORKFLOW_ENGINE);

    await workflowEngineService.setStepFailure({
      idempotencyKey: {
        action: TransactionHandlerType.INVOKE,
        transactionId,
        stepId: 'step-async',
        workflowId: 'hello-world',
      },
      stepResponse: new StepResponse('Failed!'),
      options: {
        container,
      },
    });
  }
);

const step1 = createStep(
  // STEPS with parameters like retry
  { name: 'step-1', maxRetries: 2, retryInterval: 2, timeout: 2 },
  async () => {
    return new StepResponse(`Hello from step one!`);
  }
);

// ASYNC + not returning STEPResponse affect to create Long-Running Workflow (https://docs.medusajs.com/learn/fundamentals/workflows/long-running-workflow#configure-long-running-workflows)
// A workflow is also considered long-running if one of its steps has their retryInterval
const stepAsync = createStep(
  {
    name: 'step-async',
    async: true,
  },
  async () => {
    console.log('Waiting to be successful...');
  }
);

type WorkflowInput = {
  name: string[];
  is_active: boolean;
};

const step2 = createStep('step-2', async ({ name }: WorkflowInput) => {
  return new StepResponse(`Hello from step two! ${name}`);
});

const step5 = createStep('step-5', async () => {
  return new StepResponse(`Hello from step five!`);
});

const finalStep = createStep('final-step', async () => {
  console.log('Hello from final step!');
  return new StepResponse(`Hello from final step!`);
});

const step3 = createStep(
  'step-3',
  async () => {
    return new StepResponse(`Hello from step two! ${name}`, {
      message: 'Rolling back what goes wrong',
    });
  },
  async ({ message }: { message: string }, { container }) => {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

    logger.info(message);
    console.log(message);
  }
);

const step4 = createStep('step-4', async () => {
  // throw new Error('Throwing an error');
  // Handling errors in loops (https://docs.medusajs.com/learn/fundamentals/workflows/compensation-function#handle-errors-in-loops)
  // try {
  // await promiseAll(
  //     ids.map(async (id) => {
  //       const data = await erpModuleService.retrieve(id)
  //       await erpModuleService.delete(id)
  //       prevData.push(id)
  //     })
  //   )
  // } catch (e) {
  //   return StepResponse.permanentFailure(
  //     `An error occurred: ${e}`,
  //     prevData
  //   )
  // }
});

export const myWorkflow = createWorkflow(
  { name: 'hello-world', retentionTime: 99999, store: true },
  (input: WorkflowInput) => {
    // This is evaluated just once - when workflow is created on system startup, not every time when executed
    const constant_date = new Date();
    // This is evaluated every time when workflow is executed
    const today = transform({}, () => new Date());

    const str2 = step2(input);

    // use if like this :
    const result = when(input, (input) => {
      return input.is_active;
    }).then(() => {
      const str1 = step1();
      return str1;
    });

    // use if-else like creating another when -then with negation returned !input.is_active;

    const str3 = transform(
      { result, str2 },
      (data) => `${data.result}${data.str2}`
    );

    const ids = transform({ input }, (data) =>
      data.input.name.map((item) => 'test')
    );

    // additionally , you need specific name if something other than step result is returned:
    const { isActive } = when('check-is-active', input, (input) => {
      return input.is_active;
    }).then(() => {
      const isActive = step3();

      return {
        isActive,
      };
    });

    // Execute in parallel with parallelize (https://docs.medusajs.com/learn/fundamentals/workflows/parallel-steps#parallelize-utility-function)
    // const [prices, productSalesChannel] = parallelize(step4(), step5());
    parallelize(step4(), step5());

    const step_async = stepAsync();

    const final = finalStep();

    // setStepSuccessStep();

    return new WorkflowResponse({ final: final, step_async });
  }
);

export default myWorkflow;
