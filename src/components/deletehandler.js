import toast from "react-hot-toast";

export async function deleteHandler(id, router) {
  try {
    const res = await fetch(`/api/task/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (!data.success) return toast.error(data.message);
    toast.success(data.message);
    router.refresh();
  } catch (error) {
    return toast(error);
  }
}

export async function updateHandler(id, router) {
  try {
    const res = await fetch(`/api/task/${id}`, {
      method: "PUT",
    });
    const data = await res.json();

    if (!data.success) return toast.error(data.message);
    toast.success(data.message);
    router.refresh();
  } catch (error) {
    return toast.error(error);
  }
}
