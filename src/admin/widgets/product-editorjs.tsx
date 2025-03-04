import type EditorJS from '@editorjs/editorjs';
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { DetailWidgetProps, AdminProduct } from "@medusajs/framework/types"
import { Button, clx, Container, FocusModal, Heading, Text, useToggleState } from "@medusajs/ui"
import { useQuery } from "@tanstack/react-query"
import { sdk } from "../lib/sdk"
import { useEffect, useState } from "react";
import { createEditorJS } from "../helpers/editorjs";

import '../../assets/editor.css'



type AdminProductEditorJs = AdminProduct & {
  editorjs?: {
    id: string
    content: string
  }
}

const ProductEditorJsWidget = ({ 
  data: product,
}: DetailWidgetProps<AdminProduct>) => {



  const [editOpen, showEdit, closeEdit] = useToggleState()
  const [editor, setEditor] = useState<EditorJS>()
  const [editorNewContent, setEditorNewContent] = useState<object>()

  const { data: queryResult } = useQuery({
    queryFn: () => sdk.admin.product.retrieve(product.id, {
      fields: "+editorjs.*",
    }),
    queryKey: [["product", product.id]],
  })


  
  const editorjsContent = (queryResult?.product as AdminProductEditorJs)?.editorjs?.content as unknown as object;
  const editorjsId = (queryResult?.product as AdminProductEditorJs)?.editorjs?.id
  const productId = (queryResult?.product as AdminProductEditorJs)?.id

  useEffect(() => {

    if(editOpen === false)
      return
    
    if(typeof editor?.destroy === 'function')
      editor.destroy()


    setEditor(createEditorJS(editorNewContent ?? editorjsContent))
  }, [editOpen])

  async function onSave() {
    const id = editorjsId ? await editEditorJs()  :  await createEditorJs() ;

    const response = await fetch(`/admin/products/${productId}?fields=+editorjs.*`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        additional_data: {
          editorjs_id: id
        }  
      })
    })

    const data = await response.json()

    
    setEditorNewContent(data.product.editorjs.content)

    closeEdit()
  }


  async function editEditorJs() {
    const editorContent = await editor?.save();
    const response = await fetch(`/admin/editorjs/${editorjsId}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: editorContent
      })
    })


    const data = await response.json()

    return data.content.id
  }


  async function createEditorJs() {
    const editorContent = await editor?.save();
    const response = await fetch(`/admin/editorjs`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: editorContent
      })
    })

    const data = await response.json()

    return data.content.id 
  }

  function DisplayData() {
    const data = editorNewContent ?? editorjsContent

    const text = data?.blocks.filter(item => item.type === "paragraph" ).map(item => item.data.text).join(" ")
    return <div className='line-clamp-3'>{text}</div>
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h2">Content</Heading>
        </div>

        <Button onClick={showEdit} >Edit</Button>
      </div>
      <div
        className={clx(
          `text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4`
        )}
      >
        <Text>Content</Text>

        <DisplayData/>
      </div>

      <FocusModal
        open={editOpen}
        onOpenChange={(modalOpened) => {
          if (!modalOpened) {
            closeEdit()
          }
        }}
      >
        <FocusModal.Content className='overflow-auto'>
          <FocusModal.Header>
            <Button onClick={onSave}>Save</Button>
          </FocusModal.Header>
          <FocusModal.Body>
            <div id="editorjs" className="border rounded-md py-4 max-w-[840px] mx-auto mt-4">

            </div>
          </FocusModal.Body>
        </FocusModal.Content>
      </FocusModal>

    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.before",
})

export default ProductEditorJsWidget