import { Link } from "react-router-dom";
export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation">
      <a href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank">Northeastern</a><br/>
      <Link to="/Kanbas/Account" id="wd-account-link">Account</Link><br/>
      <Link to="/Kanbas/Dashboard" id="wd-dashboard-link">Dashboard</Link><br/>
      <Link to="/Kanbas/Dashboard" id="wd-course-link">Courses</Link><br/>
      <Link to="/Kanbas/Calendar" id="wd-calendar-link">Calendar</Link><br/>
      <Link to="/Kanbas/Inbox" id="wd-inbox-link">Inbox</Link><br/>
      <Link to="/Labs" id="wd-labs-link">Labs</Link><br/>
      <Link to="/Landing" id="wd-labs-landing">Landing</Link><br/>
    </div>
);}

