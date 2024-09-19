import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";
import { Navigate, Route, Routes } from "react-router";

export default function Account() {
  return (
    <div>
      <h2>Account</h2>
      <Routes>
        <Route path="/" element={<Navigate to="/Kanbas/Account/Signin" />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
