import { Link, useLocation, useParams } from "react-router-dom";
import { courses } from "../Database";

export default function CoursesNavigation() {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  if (!course) {
    return <div>Course not found</div>;
  }
  const links = [
    { label: "Home", path: `/Kanbas/Courses/${course._id}/Home` },
    { label: "Modules", path: `/Kanbas/Courses/${course._id}/Modules` },
    { label: "Piazza", path: `/Kanbas/Courses/${course._id}/Piazza` },
    { label: "Zoom", path: `/Kanbas/Courses/${course._id}/Zoom` },
    { label: "Assignments", path: `/Kanbas/Courses/${course._id}/Assignments` },
    { label: "Quizzes", path: `/Kanbas/Courses/${course._id}/Quizzes` },
    { label: "People", path: `/Kanbas/Courses/${course._id}/People` },
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`
              ${
                pathname.includes(link.label)
                  ? "list-group-item active border border-0"
                  : "list-group-item text-danger border border-0"
              }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
