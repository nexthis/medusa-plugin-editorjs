import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { 
  editEditorJsWorkflow,
} from "../../../../workflows/edit-editorjs"

import { z } from "zod"
import { PostAdminEditEditorJs } from "../validators"

type PostAdminCreateEditorJsType = z.infer<typeof PostAdminEditEditorJs>


export const POST = async (
  req: MedusaRequest<PostAdminCreateEditorJsType>,
  res: MedusaResponse
) => {
  const id = req.params.id
  const input = {content: req.validatedBody.content, id}

  
  const { result } = await editEditorJsWorkflow(req.scope)
    .run({
      input,
    })

  res.json({ content: result })
}