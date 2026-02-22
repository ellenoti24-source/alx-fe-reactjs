import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Profile from "./components/Profile";
import ProfileDetails from "./components/ProfileDetails";
import ProfileSettings from "./components/ProfileSettings";
import BlogPost from "./components/BlogPost";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <div>
        <h1>Advanced React Router</h1>

        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/profile">Profile</Link> |{" "}
          <Link to="/blog/1">Blog</Link> |{" "}
          <Link to="/login">Login</Link>
        </nav>

        <Routes>

          {/* Home */}
          <Route path="/" element={<h2>Home Page</h2>} />

          {/* Protected Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            {/* Nested Routes */}
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>

          {/* Dynamic Route */}
          <Route path="/blog/:id" element={<BlogPost />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />

        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;