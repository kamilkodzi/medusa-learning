import type {
    MedusaRequest,
    MedusaResponse,
  } from "@medusajs/framework/http"
  
  export async function GET(req: MedusaRequest, res: MedusaResponse) {
    const { number } = req.params;
  
    res.json({
      message: `You're looking for product ${number}`
    })
  }