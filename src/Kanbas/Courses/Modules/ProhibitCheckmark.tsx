import { RiProhibitedLine } from "react-icons/ri";
export default function ProhibitCheckmark() {
  return (
    <span className="me-1 position-relative">
      <RiProhibitedLine style={{ top: "1px" }}
        className="text-fail me-1 position-absolute fs-5" />
      <RiProhibitedLine className="text-white me-1 fs-6" />
    </span>
);}

