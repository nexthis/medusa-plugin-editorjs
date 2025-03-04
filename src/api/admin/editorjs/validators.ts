import { z } from "zod"

export const PostAdminCreateEditorJs = z.object({
  content: z.object({}).passthrough(),
})

export const PostAdminEditEditorJs = z.object({
  content: z.object({}).passthrough(),
})