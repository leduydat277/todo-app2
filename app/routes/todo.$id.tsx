import { Form, redirect } from "@remix-run/react";
import type { FunctionComponent } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Todo from "~/models/Todo";

interface TodoItem {
    title: string;
    des: string;
  }

export const loader = async ({ params }: LoaderFunctionArgs) => {
    console.log("Params:", params);
  
    const _id = params.id;
    if (!_id) {
      throw new Response("ID not provided", { status: 400 });
    }
  
    const todo = await Todo.findById(_id).exec();
    console.log("Fetched Todo:", todo); 
  
    if (!todo) {
      throw new Response("Todo not found", { status: 404 });
    }
  
    return json({ todo });
  };

  export const action = async ({ params, request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const des = formData.get("des") as string;
  
    if (!params.id) {
      throw new Response("ID not provided", { status: 400 });
    }
  
    console.log("Updating Todo:", { _id: params.id, title, des });
  
    await Todo.updateOne({ _id: params.id }, { $set: { title, des } });
  
    return redirect(`/`);
  };
  



export default function Toto() {
    const {todo} = useLoaderData<typeof loader>() as {todo:TodoItem};
    console.log('todo', todo);

    return (


        <div className="container pt-10">
        <div className="flex justify-center">
            <Form method="post" className=" flex flex-col" key={todo?._id}>
        <p >
        <span>Title</span>
        <input
        className="border border-gray-300 rounded-md p-2"
          aria-label="title"
          defaultValue={todo.title}
          name="title"
          placeholder="Title"
          type="text"
        />
         <span>Des</span>
        <input
          className="border border-gray-300 rounded-md p-2"
          aria-label="des"
          defaultValue={todo.des}
          name="des"
          placeholder="Des"
          type="text"
        />
      </p>

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> update</button>
                
            </Form>

            <Form
  action="destroy"
  method="post"
  onSubmit={(event) => {
    const response = confirm(
      "Please confirm you want to delete this record."
    );
    if (!response) {
      event.preventDefault();
    }
  }}
>
  <button type="submit">Delete</button>
</Form>
        </div>
        </div>
    );
}