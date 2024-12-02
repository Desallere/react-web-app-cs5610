import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEnrollment, removeEnrollment } from "./reducer";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import * as enrollClient from "./client";

interface Course {
  _id: string;
  name: string;
  description: string;
  image: string;
  enrolled: boolean;
}

interface DashboardProps {
  course: Course;
  setCourse: (course: Course) => void;
}

export default function Dashboard({ course, setCourse }: DashboardProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showAllCourses, setShowAllCourses] = useState<boolean>(false);
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const currentUser = useSelector(
    (state: any) => state.accountReducer.currentUser
  );
  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (enrolled) {
      await userClient.enrollIntoCourse(currentUser._id, courseId);
    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId);
    }
    setCourses(
      courses.map((course) => {
        if (course._id === courseId) {
          return { ...course, enrolled: enrolled };
        } else {
          return course;
        }
      })
    );
  };

  const findCoursesForUser = async () => {
    try {
      const courses = await userClient.findCoursesForUser(currentUser._id);
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );
      const courses = allCourses.map((course: any) => {
        if (enrolledCourses.find((c: any) => c._id === course._id)) {
          return { ...course, enrolled: true };
        } else {
          return course;
        }
      });
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
  }, [currentUser, enrolling]);

  const dispatch = useDispatch();

  const addNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);

    setCourses([...courses, newCourse]);
  };

  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    console.log(course._id);
    await courseClient.updateCourse(course);
    setCourses(courses.map((c) => (c._id === course._id ? course : c)));
  };

  // New function to handle course editing
  const handleEditCourse = (course: Course) => {
    setCourse(course);
  };

  const toggleShowAllCourses = () => {
    setShowAllCourses((prev) => !prev);
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {/* Faculty-Specific Actions */}
      {currentUser.role === "FACULTY" && (
        <div>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
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

      {/* Toggle Button for Students */}
      {currentUser.role === "STUDENT" && (
        <button
          onClick={() => setEnrolling(!enrolling)}
          className="float-end btn btn-primary"
        >
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      )}

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "My Enrollments"} ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => {
            return (
              <div className="wd-dashboard-course col" key={course._id}>
                <div className="card rounded-3 overflow-hidden">
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
                      className="wd-dashboard-course-title card-text"
                      style={{ maxHeight: 100 }}
                    >
                      {course.description}
                    </p>
                    <Link to={`/Kanbas/Courses/${course._id}/Home`}>
                      <button className="btn btn-primary">Go</button>
                    </Link>

                    {currentUser.role === "STUDENT" && enrolling && (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          updateEnrollment(course._id, !course.enrolled);
                        }}
                        className={`btn ${
                          course.enrolled ? "btn-danger" : "btn-success"
                        } float-end`}
                      >
                        {course.enrolled ? "Unenroll" : "Enroll"}
                      </button>
                    )}
                    {currentUser.role === "FACULTY" && (
                      <>
                        <button
                          className="btn btn-danger float-end"
                          onClick={() => deleteCourse(course._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-warning float-end me-2"
                          onClick={() => handleEditCourse(course)}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
