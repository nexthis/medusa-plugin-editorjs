import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import LinkTool from '@editorjs/link';
import RawTool from '@editorjs/raw';
import ImageTool from '@editorjs/image';
import Checklist from '@editorjs/checklist'
import EditorjsList from '@editorjs/list';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import { sdk } from '../lib/sdk';





export function createEditorJS(data: any) {
    return new EditorJS({
        /**
         * Id of Element that should contain Editor instance
         */
        holder: 'editorjs',
        data,
        tools: {
          header: {
            class: Header,
            shortcut: 'CMD+SHIFT+H',
          },
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: '/admin/editorjs/fetchUrl', // Your backend endpoint for url data fetching,
            }
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                /**
                 * Upload file to the server and return an uploaded image data
                 * @param {File} file - file selected from the device or pasted by drag-n-drop
                 * @return {Promise.<{success, file: {url}}>}
                 */
                async uploadByFile(file: File){
                  // your own uploading logic here
                  try{
                    const result = await  sdk.admin.upload.create({files: [file]})
                    
                    return {
                      success: 1,
                      file: {
                        url: result.files[0].url,
                        // any other image data you want to store, such as width, height, color, extension, etc
                      }
                    }
                  }
                  catch(error){
                    return {
                      success: 0,
                      file: {
                        url: null,
                        // any other image data you want to store, such as width, height, color, extension, etc
                      }
                    }
                  }

                },
      
                /**
                 * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
                 * @param {string} url - pasted image URL
                 * @return {Promise.<{success, file: {url}}>}
                 */
                async uploadByUrl(url: string){
                  alert("This method is not allowed");
                  return {
                    success: 0,
                    file: {
                      url: null,
                      // any other image data you want to store, such as width, height, color, extension, etc
                    }
                  }
                }
              }
            }
          },
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          list: {
            class: EditorjsList,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered'
            },
          },
          embed: Embed,
          quote: Quote,
          raw: RawTool,
          table: Table,
        },
    });
}