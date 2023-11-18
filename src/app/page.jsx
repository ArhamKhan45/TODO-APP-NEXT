import toast from "react-hot-toast";
import { Suspense } from "react";
import "../Scss/main.scss";
import AddTodoForm from "../components/addTodoForm";

import Todos from "@/components/Todos";
import Loading from "./loading";

const Home = async () => {
  return (
    <div className="custom-main">
      <div>
        <AddTodoForm />
      </div>
      <Suspense fallback={<Loading />}>
        <Todos />
      </Suspense>
    </div>
  );
};
export default Home;
