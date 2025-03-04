import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse
} from "@medusajs/framework/workflows-sdk"
import { EDITOR_JS_MODULE } from "../modules/editorjs"
import EditorJsModuleService from "../modules/editorjs/service"

export type EditEditorJsStepInput = {
    content: Record<string, unknown>
    id: string
}

export const editEditorJsStep = createStep(
    "edit-editorJs-step",
    async (input: EditEditorJsStepInput, { container }) => {
        const editorJsModuleService: EditorJsModuleService = container.resolve(
            EDITOR_JS_MODULE
        )
        const editorJs = await editorJsModuleService.updateEditorJs(input)

        return new StepResponse(editorJs, editorJs.id)
    },
    async (id: string, { container }) => {
        const editorJsModuleService: EditorJsModuleService = container.resolve(
            EDITOR_JS_MODULE
        )
        await editorJsModuleService.deleteEditorJs(id)
    }

)


type EditEditorJsWorkflowInput = {
    content: Record<string, unknown>,
    id: string
}

export const editEditorJsWorkflow = createWorkflow(
    "edit-editorJs",
    (input: EditEditorJsWorkflowInput) => {
        const editorJs = editEditorJsStep(input)

        return new WorkflowResponse(editorJs)
    }
)