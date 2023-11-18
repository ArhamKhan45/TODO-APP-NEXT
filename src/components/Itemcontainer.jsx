import "../Scss/Itemcontainer.scss";
import { Updatedeletetaskbtn } from "./ClientComponent";

function Itemcontainer({ title, description, id, completed }) {
  return (
    <div className="custom-taskshow">
      <div>
        <h6>{title}</h6>
        <p>{description}</p>
      </div>
      <div>
        <Updatedeletetaskbtn id={id} completed={completed} />
      </div>
    </div>
  );
}

export default Itemcontainer;
