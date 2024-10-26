import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as db from "../Database";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    verifyPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = () => {
    const { username, password, verifyPassword } = credentials;

    // Check if passwords match
    if (password !== verifyPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Check if username already exists
    if (db.users.some((user) => user.username === username)) {
      alert("Username already exists.");
      return;
    }

    // Register new user
    const newUser = {
      _id: `${Date.now()}`, // Unique ID based on timestamp
      username,
      password,
      firstName: "", // Placeholder, or gather input from the user
      lastName: "",  // Placeholder, or gather input from the user
      email: "",     // Placeholder, or gather input from the user
      dob: "",       // Placeholder, or gather input from the user
      role: "STUDENT",  // Default role or gather from user input
      loginId: "",   // Placeholder, could be generated or set as needed
      section: "",   // Placeholder or gathered input
      lastActivity: new Date().toISOString(), // Current timestamp
      totalActivity: "0", // Default value for new users
    };

    db.users.push(newUser); // Add the new user to the database
    dispatch(setCurrentUser(newUser)); // Set the new user as current
    navigate("/Kanbas/Dashboard"); // Redirect to dashboard
  };

  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <input
        placeholder="username"
        className="form-control mb-2"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <input
        placeholder="password"
        type="password"
        className="form-control mb-2"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <input
        placeholder="verify password"
        type="password"
        className="form-control mb-2"
        value={credentials.verifyPassword}
        onChange={(e) =>
          setCredentials({ ...credentials, verifyPassword: e.target.value })
        }
      />
      <button onClick={signup} className="btn btn-primary form-control">
        Signup
      </button>
      <Link to="/Kanbas/Account/Signin">Sign in</Link>
    </div>
  );
}