import React, { useState, useEffect } from "react";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
// Import the function you want to use
import { findUsersForCourse } from "./client";
import * as courseClient from "./client";
import * as userClient from "../Account/client";
import { useSelector } from "react-redux";
interface Course {
  _id: string;
  name: string;
  description: string;
  image: string;
  enrolled: boolean;
}

export default function Courses() {
  const { cid } = useParams();
  const currentUser = useSelector(
    (state: any) => state.accountReducer.currentUser
  );
  const { pathname } = useLocation();
  const [users, setUsers] = useState<any[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

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
    const fetchUsers = async () => {
      if (cid) {
        try {
          const usersData = await findUsersForCourse(cid);
          setUsers(usersData);
        } catch (error) {
          console.error("Failed to fetch users", error);
        }
      }
    };

    fetchUsers();
  }, [cid]);
  
  // Define a default course object
  const defaultCourse: Course = {
    _id: "",
    name: "Default Course",
    description: "This is a default course description.",
    image: "",
    enrolled: false,
  };
  useEffect(() => {
  
      fetchCourses();
   
  }, [currentUser]);
  // Find the course, or use the default course if not found
  console.log(courses);
  const course = courses.find((course) => course._id === cid) || defaultCourse;

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>{" "}
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable users={users} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
