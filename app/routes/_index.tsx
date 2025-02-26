import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, Form, useSearchParams } from "@remix-run/react";
import Todo from "~/models/Todo";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";


  const todos = await Todo.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { des: { $regex: q, $options: "i" } }
    ],
  }).exec();

  return json({ todos });
};
export default function Index() {
  const { todos } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="flex flex-col h-screen items-center justify-center space-y-4">
      
     
      <Form method="get" className="mb-4">
        <input
          type="text"
          name="q"
          placeholder="Tìm kiếm..."
          defaultValue={query}
          className="border border-gray-300 rounded-md p-2"
        />
        <button type="submit" className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Tìm
        </button>
      </Form>

      
      <Link to="/todo/create">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</button>
      </Link>

    
      <div className="relative overflow-x-auto w-full max-w-4xl">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Des</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo: any) => (
              <tr key={todo._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{todo._id}</td>
                <td className="px-6 py-4">{todo.title}</td>
                <td className="px-6 py-4">{todo.des}</td>
                <td className="px-6 py-4">
                  <Link to={`/todo/${todo._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
