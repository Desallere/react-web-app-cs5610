import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          <div className="wd-dashboard-course col" style={{ width: "260px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home"
              >
                <img src="/images/reactjs.jpg" className="course-image" />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1234 React JS
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Full Stack software developer
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "260px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home"
              >
                <img src="/images/shinobu1.jpg" className="course-image"  />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    AN1234 Anime Entry
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Become Dongman Gaoshou
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "260px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home"
              >
                <img src="/images/shinobu2.jpg"  className="course-image"  />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    AN1235 Anime Intermediate
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Become Dongman Gaoshou
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "260px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home"
              >
                <img src="/images/shinobu3.jpg" className="course-image"   />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    AN1236 Anime Advanced
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Become Dongman Gaoshou
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "260px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home"
              >
                <img src="/images/Magic.png"  className="course-image" />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    AN2226 A Taste of Magic
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Become Magician
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "260px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home"
              >
                <img src="/images/FUFU1.png" className="course-image" />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    AN2236 Magic Entry
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Become Magician
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "260px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home"
              >
                <img src="/images/Magic3.png" className="course-image"  />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    AN2246 Magic Mediate
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Become Magician
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "260px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home"
              >
                <img src="/images/Magic4.png" className="course-image"  />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    AN2256 Magic Advanced
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Become Magician
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
