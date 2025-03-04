import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse
} from "@medusajs/framework/workflows-sdk"
import { EDITOR_JS_MODULE } from "../modules/editorjs"
import EditorJsModuleService from "../modules/editorjs/service"

export type CreateEditorJsStepInput = {
    content: Record<string, unknown>
}

export const createEditorJsStep = createStep(
    "create-editorJs-step",
    async (input: CreateEditorJsStepInput, { container }) => {
        const editorJsModuleService: EditorJsModuleService = container.resolve(
            EDITOR_JS_MODULE
        )
        const editorJs = await editorJsModuleService.createEditorJs(input)

        return new StepResponse(editorJs, editorJs.id)
    },
    async (id: string, { container }) => {
        const editorJsModuleService: EditorJsModuleService = container.resolve(
            EDITOR_JS_MODULE
        )
        await editorJsModuleService.deleteEditorJs(id)
    }

)


type CreateEditorJsWorkflowInput = {
    content: Record<string, unknown>
}

export const createEditorJsWorkflow = createWorkflow(
    "create-editorJs",
    (input: CreateEditorJsWorkflowInput) => {
        const editorJs = createEditorJsStep(input)

        return new WorkflowResponse(editorJs)
    }
)