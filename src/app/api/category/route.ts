import { Category, category } from "@/lib/data";
import { NextResponse,NextRequest } from "next/server";
import {z} from "zod";

interface CreateCategoryDto{

    id:number;  
    CategoryName:string;
    image:string;
  }

export function GET(request:NextRequest){
  return  NextResponse.json(category);
 }
  export  async function  POST(requset:NextRequest) 
  {
     


  const Categoryreq=(await requset.json()) as CreateCategoryDto;
   const newcategory:Category={
    id:category.length+1,
    CategoryName:Categoryreq.CategoryName,
    image:Categoryreq.image,
   }
   
    category.push(newcategory);
    return NextResponse.json(newcategory,{status:200});
   }