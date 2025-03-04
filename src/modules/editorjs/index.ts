import { Module } from "@medusajs/framework/utils"
import EditorJsModuleService from "./service"

export const EDITOR_JS_MODULE = "editorjs"

export default Module(EDITOR_JS_MODULE, {
  service: EditorJsModuleService,
})