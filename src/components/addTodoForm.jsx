"use client";
import "@/Scss/addtask.scss";
import { redirect, useRouter } from "next/navigation";

import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Context } from "./ClientComponent";

function AddTodoForm() {
  const { user } = useContext(Context);

  const [title, setTitle] = useState();
  const router = useRouter();

  const [description, setDescription] = useState();
  const addTodohandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/task/newtask", {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
      } else {
        toast.success("Task added successfully");
        router.refresh();
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  if (!user._id) {
    redirect("/login");
  }
  return (
    <div className="custom-task">
      <form action="" onSubmit={addTodohandler}>
        <input
          type="text"
          name=""
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Task Title"
          maxLength={40}
          value={title}
        />
        <input
          type="text"
          onChange={(event) => setDescription(event.target.value)}
          name=""
          value={description}
          placeholder="Task Description"
          maxLength={100}
        />
        <input type="submit" value="ADD TASK" />
      </form>
    </div>
  );
}

export default AddTodoForm;
