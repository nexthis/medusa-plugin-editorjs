import { model } from "@medusajs/framework/utils"

export const EditorJs = model.define("editorjs", {
  id: model.id().primaryKey(),
  content: model.json(),
})