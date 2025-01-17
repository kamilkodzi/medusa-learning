import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import { BLOG_MODULE } from '../modules/blog';
import BlogModuleService from '../modules/blog/service';

/**
 * @description This is the input for the create post workflow
 * @param title - The title of the post
 */
type CreatePostWorkflowInput = {
  title: string;
};

/**
 * @description This is the step for the create post workflow
 * @param title - The title of the post
 */
const createPostStep = createStep(
  'create-post',
  async ({ title }: CreatePostWorkflowInput, { container }) => {
    const blogModuleService: BlogModuleService = container.resolve(BLOG_MODULE);
    // const post = await blogModuleService.createPosts({ title });
    blogModuleService.myCustomFunction();
    // return new StepResponse(post, post);
    return new StepResponse('test', 'test');
  },
  async (post, { container }) => {
    const blogModuleService: BlogModuleService = container.resolve(BLOG_MODULE);
    // await blogModuleService.deletePosts(post.id);
  }
);

/**
 * @description This is the workflow for the create post workflow
 * @param postInput - The input for the create post workflow
 */
export const createPostWorkflow = createWorkflow(
  'create-post',
  (postInput: CreatePostWorkflowInput) => {
    const post = createPostStep(postInput);

    return new WorkflowResponse(post);
  }
);
