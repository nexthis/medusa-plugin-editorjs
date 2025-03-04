import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import scraper from 'metadata-scraper'

import { z } from "zod"
import { PostAdminEditEditorJs } from "../validators"

type PostAdminCreateEditorJsType = z.infer<typeof PostAdminEditEditorJs>


export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {

  try {
    const url = req.query.url as string

    const respone = await scraper(url)
  
    const payload = {
      success : 1,
      meta: {
          title : respone.title,
          description : respone.description,
          image : {
              url : respone.image
          }
      }
    }
  
    res.json(payload)
  }
  catch(e){
    const payload = {
      success : 0,
      meta: {
          title : null,
          description : null,
          image : {
              url : null
          }
      }
    }
  
    res.json(payload)
  }

}