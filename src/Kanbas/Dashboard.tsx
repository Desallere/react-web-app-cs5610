import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEnrollment, removeEnrollment } from "./reducer";
import * as db from "./Database"; // Assuming enrollments are fetched from here

interface Course {
  _id: string;
  name: string;
  description: string;
  image: string;
}

interface DashboardProps {
  courses: Course[];
  course: Course;
  setCourse: (course: Course) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: DashboardProps) {
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const enrollments = useSelector((state: any) => state.enrollments?.enrollments || []);
  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState<boolean>(currentUser.role === "FACULTY");

  // Log enrollments for debugging
  useEffect(() => {
    console.log("Current enrollments:", enrollments);
  }, [enrollments]);

  const toggleShowAllCourses = () => {
    setShowAllCourses(!showAllCourses);
  };

  const handleEnroll = (courseId: string) => {
    const newEnrollment = {
      _id: String(enrollments.length + 1),
      user: currentUser._id,
      course: courseId,
    };
    dispatch(addEnrollment(newEnrollment));
  };

  const handleUnenroll = (courseId: string) => {
    const enrollmentToRemove = enrollments.find(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
    if (enrollmentToRemove) {
      dispatch(removeEnrollment(enrollmentToRemove._id));
    }
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      
      {/* FACULTY-Specific Actions */}
      {currentUser.role === "FACULTY" && (
        <div>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
        </div>
      )}

      {/* Toggle Button for Students Only */}
      {currentUser.role === "STUDENT" && (
        <button
          className="btn btn-primary float-end"
          onClick={toggleShowAllCourses}
        >
          {showAllCourses ? "Show My Enrollments" : "Show All Courses"}
        </button>
      )}

      <h2 id="wd-dashboard-published">
        {currentUser.role === "FACULTY" || showAllCourses ? "All Courses" : "My Enrollments"} ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses
            .filter((course) =>
              currentUser.role === "FACULTY" || showAllCourses
                ? true
                : enrollments.some(
                    (enrollment: any) =>
                      enrollment.user === currentUser._id &&
                      enrollment.course === course._id
                  )
            )
            .map((course) => {
              const isEnrolled = enrollments.some(
                (enrollment: any) =>
                  enrollment.user === currentUser._id &&
                  enrollment.course === course._id
              );

              return (
                <div
                  className="wd-dashboard-course col"
                  style={{ width: "300px" }}
                  key={course._id}
                >
                  <div className="card rounded-3 overflow-hidden">
                    <Link
                      to={`/Kanbas/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark"
                    >
                      <img
                        src={`/images/${course.image}`}
                        width="100%"
                        height={160}
                        alt={`${course.name} course image`}
                      />
                      <div className="card-body">
                        <h5 className="wd-dashboard-course-title card-title">
                          {course.name}
                        </h5>
                        <p
                          className="wd-dashboard-course-title card-text overflow-y-hidden"
                          style={{ maxHeight: 100 }}
                        >
                          {course.description}
                        </p>
                        <button className="btn btn-primary"> Go </button>

                        {currentUser.role === "FACULTY" && (
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              deleteCourse(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                        )}

                        {currentUser.role === "FACULTY" && (
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        )}

                        {currentUser.role === "STUDENT" && (
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              isEnrolled
                                ? handleUnenroll(course._id)
                                : handleEnroll(course._id);
                            }}
                            className={`btn float-end ${
                              isEnrolled ? "btn-danger" : "btn-success"
                            }`}
                          >
                            {isEnrolled ? "Unenroll" : "Enroll"}
                          </button>
                        )}
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
