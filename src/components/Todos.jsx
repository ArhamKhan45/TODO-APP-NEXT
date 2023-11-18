import React from "react";
import Itemcontainer from "@/components/Itemcontainer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const Fetchtodo = async (token) => {
  try {
    const response = await fetch(`${process.env.MYURL}/api/auth/user/mytasks`, {
      cache: "no-cache",
      headers: {
        cookie: `token=${token}`,
      },
    });
    const data = await response.json();

    if (!data.success) {
      return [];
    }
    return data.task;
  } catch (error) {
    return [];
  }
};
async function Todos() {
  let token = cookies().get("token");
  if (token) {
  } else {
    redirect("/login");
  }

  const tasks = await Fetchtodo(token.value);
  return (
    <div className="mt-5">
      {tasks
        ? tasks.map((item) => {
            return (
              <Itemcontainer
                title={item.title}
                description={item.description}
                id={item._id}
                key={item._id}
                completed={item.isCompleted}
              />
            );
          })
        : null}
    </div>
  );
}

export default Todos;
