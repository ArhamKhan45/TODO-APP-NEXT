import "@/Scss/addtask.scss";

function addTodoForm() {
  return (
    <div className="custom-task">
      <form action="">
        <input type="text" name="" id="" placeholder="Task Title" />
        <input type="text" name="" id="" placeholder="Task Description" />
        <input type="submit" value="ADD TASK" />
      </form>
    </div>
  );
}

export default addTodoForm;
