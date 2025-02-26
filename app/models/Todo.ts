import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const schema = new mongoose.Schema({
_id: { type: String, default: uuidv4, unique: true },
title: { type: String, required: true },
des: { type: String, required: true },

});

const Todo = mongoose.models.Todo || mongoose.model("Todo", schema,'todo');

export default Todo;
