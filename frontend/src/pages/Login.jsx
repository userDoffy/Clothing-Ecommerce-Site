import React from "react";
import { Link } from "react-router-dom";
import useForm from "../customhooks/useForm.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const { values, handleChange } = useForm({ email: "", password: "", role: "user" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", values);
    // Add authentication logic here
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h2 className="text-start fw-bold mb-3">Login</h2>
        <form onSubmit={handleSubmit} className="text-start">
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Role</label>
            <select className="form-select" name="role" value={values.role} onChange={handleChange}>
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-dark w-100">
            Login
          </button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/signup" className="text-decoration-none text-muted">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
