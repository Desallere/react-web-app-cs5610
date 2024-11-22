import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import QuizDetails from "./EditorDetail";
import QuizQuestions from "./EditorQuestion";

export default function EditQuiz() {
  const [activeTab, setActiveTab] = useState<"details" | "questions">(
    "details"
  );

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <nav className="nav nav-tabs card-header-tabs">
            <button
              className={`nav-link ${activeTab === "details" ? "active" : ""}`}
              onClick={() => setActiveTab("details")}
            >
              Details
            </button>
            <button
              className={`nav-link ${
                activeTab === "questions" ? "active" : ""
              }`}
              onClick={() => setActiveTab("questions")}
            >
              Questions
            </button>
          </nav>
        </div>
        <div className="card-body">
          {activeTab === "details" ? <QuizDetails /> : <QuizQuestions />}
        </div>
      </div>
    </div>
  );
}
