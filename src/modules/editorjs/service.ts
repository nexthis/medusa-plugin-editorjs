import { MedusaService } from "@medusajs/framework/utils"
import { EditorJs } from "./models/editorjs"

class EditorJsModuleService extends MedusaService({
    EditorJs,
}) {
    listEditorjs(filters?: any, config?: undefined, sharedContext?: any) {
       return this.listEditorJs(filters, config)
        
    }
}

export default EditorJsModuleService