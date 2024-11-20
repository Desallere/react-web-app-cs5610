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
}

interface DashboardProps {
  course: Course;
  setCourse: (course: Course) => void;
}

export default function Dashboard({ course, setCourse }: DashboardProps) {
  const currentUser = useSelector(
    (state: any) => state.accountReducer.currentUser
  );
  const enrollments = useSelector(
    (state: any) => state.enrollments?.enrollments || []
  );
  const dispatch = useDispatch();
  const [enrollmentStatuses, setEnrollmentStatuses] = useState<
    Record<string, boolean>
  >({});
  const [courses, setCourses] = useState<Course[]>([]);
  const [showAllCourses, setShowAllCourses] = useState<boolean>(false);

  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };

  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(courses.map((c) => (c._id === course._id ? course : c)));
  };

  // Fetch courses based on toggle state
  useEffect(() => {
    const fetchCourses = async () => {
      const allCourses =
        currentUser.role === "FACULTY"
          ? await userClient.fetchAllCourses()
          : showAllCourses
          ? await userClient.fetchAllCourses()
          : await userClient.findMyCourses();
      setCourses(allCourses);
    };
    fetchCourses();
  }, [showAllCourses, currentUser.role]);

  useEffect(() => {
    const checkEnrollments = async () => {
      const statuses: Record<string, boolean> = {};
      for (const course of courses) {
        const response = await enrollClient.checkEnrollment(
          currentUser._id,
          course._id
        );
        console.log(response)
        statuses[course._id] = response; // Assume response returns true/false
      
      }
  
      setEnrollmentStatuses(statuses);
    };

    if (courses.length) {
      checkEnrollments();
    }
  }, [courses, currentUser._id]);

  const toggleShowAllCourses = () => {
    setShowAllCourses((prev) => !prev);
  };

  const handleEnroll = async (courseId: string) => {
    const newEnrollment = {
      _id: String(Date.now()),
      user: currentUser._id,
      course: courseId,
    };
    await enrollClient.addEnroll(
      newEnrollment._id,
      newEnrollment.user,
      newEnrollment.course
    );
    dispatch(addEnrollment(newEnrollment));
    setEnrollmentStatuses((prev) => ({ ...prev, [courseId]: true }));
  };

  const handleUnenroll = async (courseId: string) => {
    const enrollmentToRemove = enrollments.find(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
    if (enrollmentToRemove) {
      await enrollClient.deleteEnroll(enrollmentToRemove._id);
      dispatch(removeEnrollment(enrollmentToRemove._id));
      setEnrollmentStatuses((prev) => ({ ...prev, [courseId]: false }));
    }
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
          className="btn btn-primary float-end"
          onClick={toggleShowAllCourses}
        >
          {showAllCourses ? "Show My Enrollments" : "Show All Courses"}
        </button>
      )}

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "My Enrollments"} ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => {
            const isEnrolled = enrollmentStatuses[course._id];

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

                    {currentUser.role === "STUDENT" && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
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
                    {currentUser.role === "FACULTY" && (
                      <button
                        className="btn btn-danger float-end"
                        onClick={() => deleteCourse(course._id)}
                      >
                        Delete
                      </button>
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
