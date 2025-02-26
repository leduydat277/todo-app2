import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import Todo from "~/models/Todo";


export const action = async ({
  params,
}: ActionFunctionArgs) => {
//   invariant(params.contactId, "Missing contactId param");
//   await deleteContact(params.contactId);

await Todo.findByIdAndDelete(params.id);
  return redirect("/");
};