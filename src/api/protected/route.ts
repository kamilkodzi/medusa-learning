import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';

/**
 * @openapi
 * /protected:
 *   get:
 *     description: Returns a hello world message
 *     responses:
 *       200:
 *         description: Success response with hello world message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello World"
 */
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  res.json({
    message: 'Hello World',
  });
};
