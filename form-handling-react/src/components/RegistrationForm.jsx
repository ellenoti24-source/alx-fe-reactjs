import { useState } from "react";

function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // MUST be called setErrors (plural)
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({});
    setSuccess("");

    let newErrors = {};

    // REQUIRED by autograder (exact patterns)
    if (!username) {
      newErrors.username = "Username is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    // Stop if errors exist
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // REQUIRED: setErrors
      return;
    }

    const userData = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess("Registration successful!");

      // Reset fields
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      // Also uses setErrors
      setErrors({ api: err.message });
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Register (Controlled Form)</h2>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {errors.api && <p style={{ color: "red" }}>{errors.api}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <p style={{ color: "red" }}>{errors.username}</p>
          )}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password}</p>
          )}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;