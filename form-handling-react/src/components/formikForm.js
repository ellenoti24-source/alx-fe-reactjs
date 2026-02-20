import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function formikForm() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (
    values,
    { resetForm, setSubmitting, setStatus }
  ) => {
    setStatus("");

    try {
      const response = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setStatus("Registration successful!");
      resetForm();
    } catch (err) {
      setStatus(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", marginTop: "40px" }}>
      <h2>Register (Formik Form)</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            {status && <p style={{ color: "green" }}>{status}</p>}

            <div>
              <label>Username</label>
              <Field type="text" name="username" />
              <ErrorMessage
                name="username"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div>
              <label>Email</label>
              <Field type="email" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div>
              <label>Password</label>
              <Field type="password" name="password" />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default formikForm;