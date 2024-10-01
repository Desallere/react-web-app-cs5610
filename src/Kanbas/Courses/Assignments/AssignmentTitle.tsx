import { BsGripVertical, BsPlus, BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

export default function AssignmentTitle() {
  return (
    <>
     <div className="float-end">
      <span
        className="wd-rounded-corners-all-around 
     assignment-border wd-border-solid  assignment-margin"
      >
        40% of total
      </span>
      <BsPlus className="" size={30} style={{marginRight : "10"}} />
      <BsThreeDotsVertical className="me-1 fs-3" />
      </div>
    </>
  );
}
