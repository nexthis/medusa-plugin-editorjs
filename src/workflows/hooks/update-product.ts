import { updateProductsWorkflow } from "@medusajs/medusa/core-flows"
import { StepResponse } from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"
import { LinkDefinition } from "@medusajs/framework/types"
import { EDITOR_JS_MODULE} from "../../modules/editorjs"
import EditorJsModuleService from "../../modules/editorjs/service"

updateProductsWorkflow.hooks.productsUpdated(
  (async ({ products, additional_data }, { container }) => {
    if (!additional_data?.editorjs_id) {
      return new StepResponse([], [])
    }

    const editorJsModuleService: EditorJsModuleService = container.resolve(
      EDITOR_JS_MODULE
    )
    // if the brand doesn't exist, an error is thrown.
    await editorJsModuleService.retrieveEditorJs(additional_data.editorjs_id as string)
    const link = container.resolve("link")
    const logger = container.resolve("logger")
    
    const links: LinkDefinition[] = []
    
    for (const product of products) {

      links.push({
        [Modules.PRODUCT]: {
          product_id: product.id,
        },
        [EDITOR_JS_MODULE]: {
          editorjs_id: additional_data.editorjs_id,
        },
      })
    }
    
    await link.create(links)
    
    logger.info("Linked brand to products")
    
    
  }),
  (async (links, { container }) => {
    if (!links?.length) {
      return
    }

    const link = container.resolve("link")

    await link.dismiss(links)
  })

)