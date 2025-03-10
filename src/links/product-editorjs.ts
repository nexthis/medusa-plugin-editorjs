import EditorJsModule from "../modules/editorjs"
import ProductModule from "@medusajs/medusa/product"
import { defineLink } from "@medusajs/framework/utils"

export default defineLink(
  {
    linkable: ProductModule.linkable.product,
    isList: true,
    deleteCascade: true,
  },
  EditorJsModule.linkable.editorjs
)