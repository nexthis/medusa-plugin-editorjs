import {
    defineMiddlewares,
    validateAndTransformBody,
} from "@medusajs/framework/http"
import { PostAdminCreateEditorJs } from "./admin/editorjs/validators"
import { PostAdminEditEditorJs } from "./admin/editorjs/validators"
import { z } from "zod"

export default defineMiddlewares({
    routes: [
        {
            matcher: "/admin/editorjs/:id",
            method: "POST",
            middlewares: [
                validateAndTransformBody(PostAdminEditEditorJs),
            ],
        },
        {
            matcher: "/admin/editorjs",
            method: "POST",
            middlewares: [
                validateAndTransformBody(PostAdminCreateEditorJs),
            ],
        },
        {
            matcher: "/admin/products",
            method: ["POST"],
            additionalDataValidator: {
                editorjs_id: z.string().optional(),
            },
        }
    ],
})