import { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { regexCheck } from "../../Common/Utility";

import styles from "./signup.module.css";

// import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

const Signup = () => {
  const navigate = useNavigate();
  // const { checkLogin, isloggedIn } = useContext(AuthContext);

  const intitalValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  };

  const [formValues, setFormValues] = useState(intitalValues);

  const [passwordType, setPasswordType] = useState("password");

  const changeVisibility = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else {
      setPasswordType("text");
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    errorCheck(name, value);
  };

  const errorCheck = (fieldName, value) => {
    switch (fieldName) {
      case "firstname":
        if (!value.trim()) {
          setFormValues((formValues) => ({
            ...formValues,
            firstname: value,
            errors: {
              ...formValues.errors,
              firstname: "First Name cannot be empty",
            },
          }));
        } else {
          setFormValues((formValues) => ({
            ...formValues,
            firstname: value,
            errors: {
              ...formValues.errors,
              firstname: "",
            },
          }));
        }
        break;
      case "lastname":
        if (!value.trim()) {
          setFormValues((formValues) => ({
            ...formValues,
            lastname: value,
            errors: {
              ...formValues.errors,
              lastname: "Last Name cannot be empty",
            },
          }));
        } else {
          setFormValues((formValues) => ({
            ...formValues,
            lastname: value,
            errors: {
              ...formValues.errors,
              lastname: "",
            },
          }));
        }
        break;
      case "email":
        let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
        let emailCheck = regexCheck(value, regex);
        if (!value.trim()) {
          setFormValues((formValues) => ({
            ...formValues,
            email: value,
            errors: {
              ...formValues.errors,
              email: "Email address cannot be empty",
            },
          }));
        } else if (!emailCheck) {
          setFormValues((formValues) => ({
            ...formValues,
            email: value,
            errors: {
              ...formValues.errors,
              email: "Please add a valid email address",
            },
          }));
        } else {
          setFormValues((formValues) => ({
            ...formValues,
            email: value,
            errors: {
              ...formValues.errors,
              email: "",
            },
          }));
        }
        break;
      case "password":
        if (!value.trim()) {
          setFormValues((formValues) => ({
            ...formValues,
            password: value,
            errors: {
              ...formValues.errors,
              password: "Password cannot be empty",
            },
          }));
        } else {
          setFormValues((formValues) => ({
            ...formValues,
            password: value,
            errors: {
              ...formValues.errors,
              password: "",
            },
          }));
        }
        break;
      case "confirmPassword":
        if (!value.trim()) {
          setFormValues((formValues) => ({
            ...formValues,
            confirmPassword: value,
            errors: {
              ...formValues.errors,
              confirmPassword: "Password cannot be empty",
            },
          }));
        } else {
          setFormValues((formValues) => ({
            ...formValues,
            confirmPassword: value,
            errors: {
              ...formValues.errors,
              confirmPassword: "",
            },
          }));
        }
        break;

      default:
    }
  };

  const passwordCheck = (source, target) => {
    if (source !== target) {
      setFormValues((formValues) => ({
        ...formValues,
        errors: {
          ...formValues.errors,
          confirmPassword: "Please confirm the correct password",
        },
      }));
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password, confirmPassword } = formValues;

    errorCheck("firstname", firstname);
    errorCheck("lastname", lastname);
    errorCheck("email", email);
    errorCheck("password", password);
    errorCheck("confirmPassword", confirmPassword);

    const passwordFlag = passwordCheck(password, confirmPassword);

    let errorFlag = Object.values(formValues.errors).find((item) => item !== "");

    if (!errorFlag && passwordFlag && firstname !== "" && lastname !== "" && email !== "" && password !== "" && confirmPassword !== "") {
      const hostName = window.location.href.includes("localhost") ? "http://localhost:5000" : "https://analyticsbackend.onrender.com";
      const url = `${hostName}/auth/signup`;

      const data = { firstname, lastname, email, password };

      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      try {
        const response = await fetch(url, config);
        const data = await response.json();
        console.log(data);
        const { token } = data;

        localStorage.setItem("chartAnalyticsToken", token);

        toast.success(`Signed up`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error(`Signup failed`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } finally {
      }
    }
  };

  // if (isloggedIn) {
  //   return <Navigate to="/userdetails" replace />;
  // }
  return (
    <>
      <div className={styles.signupParent}>
        <div className={styles.signup}>
          <h3>Signup</h3>
          <form onSubmit={submitHandler}>
            <div className={styles.formWrapper}>
              <div>
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  className={`${styles.firstname} ${formValues.errors.firstname !== "" && styles.error}`}
                  id="firstname"
                  name="firstname"
                  onChange={(e) => {
                    inputHandler(e);
                  }}
                />
                {formValues.errors.firstname !== "" && <span className={styles.warning}>{formValues.errors.firstname}</span>}
              </div>
              <div>
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  className={`${styles.lastname} ${formValues.errors.lastname !== "" && styles.error}`}
                  id="lastname"
                  name="lastname"
                  onChange={(e) => {
                    inputHandler(e);
                  }}
                />
                {formValues.errors.lastname !== "" && <span className={styles.warning}>{formValues.errors.lastname}</span>}
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className={`${styles.email} ${formValues.errors.email !== "" && styles.error}`}
                  id="signupemail"
                  name="email"
                  onChange={(e) => {
                    inputHandler(e);
                  }}
                />
                {formValues.errors.email !== "" && <span className={styles.warning}>{formValues.errors.email}</span>}
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={passwordType}
                    className={`${styles.password} ${formValues.errors.password !== "" && styles.error}`}
                    id="signupassword"
                    name="password"
                    onChange={(e) => {
                      inputHandler(e);
                    }}
                  />
                  {/* <RemoveRedEyeOutlinedIcon className={styles.eye} onClick={() => changeVisibility()} /> */}
                </div>

                {formValues.errors.password !== "" && <span className={styles.warning}>{formValues.errors.password}</span>}
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className={`${styles.password} ${formValues.errors.confirmPassword !== "" && styles.error}`}
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={(e) => {
                    inputHandler(e);
                  }}
                />
                {formValues.errors.confirmPassword !== "" && <span className={styles.warning}>{formValues.errors.confirmPassword}</span>}
              </div>
            </div>
            <button type="submit" className={styles.signupCTA}>
              Sign up
            </button>
            <span className={styles.registered}>Already a registered user?</span>
            <p className={styles.loginText} onClick={() => navigate("/login")}>
              Sign in
            </p>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Signup;
