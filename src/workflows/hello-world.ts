import { ContainerRegistrationKeys } from '@medusajs/framework/utils';
import {
  createStep,
  createWorkflow,
  StepResponse,
  transform,
  when,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';

const step1 = createStep('step-1', async () => {
  return new StepResponse(`Hello from step one!`);
});

type WorkflowInput = {
  name: string[];
  is_active: boolean;
};

const step2 = createStep('step-2', async ({ name }: WorkflowInput) => {
  return new StepResponse(`Hello from step two! ${name}`);
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
  throw new Error('Throwing an error');
});

export const myWorkflow = createWorkflow(
  'hello-world',
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

    const test = step4();

    return new WorkflowResponse({ message: constant_date, today, str3 });
  }
);

export default myWorkflow;
