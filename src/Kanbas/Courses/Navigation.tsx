import { Link } from "react-router-dom";
import { courses } from "../Database";

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

import React, { useState, useEffect } from "react";
interface Course {
  _id: string;
  name: string;
  description: string;
  image: string;
  enrolled: boolean;
}

export default function CoursesNavigation() {

  const { cid } = useParams();
  const currentUser = useSelector(
    (state: any) => state.accountReducer.currentUser
  );

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
      console.log(courses);
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
  const course = courses.find((course) => course._id === cid) || defaultCourse;

  const { pathname } = useLocation();
  
  const links = [
    { label: "Home", path: `/Kanbas/Courses/${course._id}/Home` },
    { label: "Modules", path: `/Kanbas/Courses/${course._id}/Modules` },
    { label: "Piazza", path: `/Kanbas/Courses/${course._id}/Piazza` },
    { label: "Zoom", path: `/Kanbas/Courses/${course._id}/Zoom` },
    { label: "Assignments", path: `/Kanbas/Courses/${course._id}/Assignments` },
    { label: "Quizzes", path: `/Kanbas/Courses/${course._id}/Quizzes` },
    { label: "People", path: `/Kanbas/Courses/${course._id}/People` },
  ];
// Inside your Courses component or wherever you need to safely use course data

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
