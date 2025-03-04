import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { 
  createEditorJsWorkflow,
} from "../../../workflows/create-editorjs"

import { z } from "zod"
import { PostAdminCreateEditorJs } from "./validators"

type PostAdminCreateEditorJsType = z.infer<typeof PostAdminCreateEditorJs>


export const POST = async (
  req: MedusaRequest<PostAdminCreateEditorJsType>,
  res: MedusaResponse
) => {
  
  const { result } = await createEditorJsWorkflow(req.scope)
    .run({
      input: req.validatedBody,
    })

  res.json({ content: result })
}


export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const query = req.scope.resolve("query")
  
  const { data: editorjs } = await query.graph({
    entity: "editorjs",
    fields: ["*", "products.*"],
  })

  res.json({ editorjs })
}