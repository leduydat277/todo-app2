import { ClientActionFunctionArgs, Form, redirect } from "@remix-run/react";
import type { FunctionComponent } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Todo from "~/models/Todo";

interface TodoItem {
    title: string;
    des: string;
  }



  export const action = async ({ request }: ClientActionFunctionArgs) => {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const des = formData.get("des") as string;
  
    if (!title || !des) {
      throw new Response("Title and Description are required", { status: 400 });
    }
  
    console.log("Creating new Todo:", { title, des });
  
    await Todo.create({ title, des });
  
    return redirect(`/`);
  };
  


export default function Toto() {
    
    

    return (


        <div className="container pt-10">
        <div className="flex justify-center">
            <Form method="post" className=" flex flex-col">
        <p >
        <span>Title</span>
        <input
        className="border border-gray-300 rounded-md p-2"
          aria-label="title"
         
          name="title"
          placeholder="Title"
          type="text"
        />
         <span>Des</span>
        <input
          className="border border-gray-300 rounded-md p-2"
          aria-label="des"
         
          name="des"
          placeholder="Des"
          type="text"
        />
      </p>

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> create</button>
                
            </Form>

            

        </div>
        </div>
    );
}