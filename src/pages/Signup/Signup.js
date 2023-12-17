import { useEffect, useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";

// import { AuthContext } from "../..";
import { regexCheck } from "../../Common/Utility";

import styles from "./signup.module.css";
// import Navbar from "../../Components/Navbar/Navbar";
// import Footer from "../Home/Footer/Footer";

// import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

// import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  // const { checkLogin, isloggedIn } = useContext(AuthContext);

  const intitalValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {
      firstName: "",
      lastName: "",
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
      case "firstName":
        if (!value.trim()) {
          setFormValues((formValues) => ({
            ...formValues,
            firstName: value,
            errors: {
              ...formValues.errors,
              firstName: "First Name cannot be empty",
            },
          }));
        } else {
          setFormValues((formValues) => ({
            ...formValues,
            firstName: value,
            errors: {
              ...formValues.errors,
              firstName: "",
            },
          }));
        }
        break;
      case "lastName":
        if (!value.trim()) {
          setFormValues((formValues) => ({
            ...formValues,
            lastName: value,
            errors: {
              ...formValues.errors,
              lastName: "Last Name cannot be empty",
            },
          }));
        } else {
          setFormValues((formValues) => ({
            ...formValues,
            lastName: value,
            errors: {
              ...formValues.errors,
              lastName: "",
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
    const { firstName, lastName, email, password, confirmPassword } = formValues;

    errorCheck("firstName", firstName);
    errorCheck("lastName", lastName);
    errorCheck("email", email);
    errorCheck("password", password);
    errorCheck("confirmPassword", confirmPassword);

    const passwordFlag = passwordCheck(password, confirmPassword);

    let errorFlag = Object.values(formValues.errors).find((item) => item !== "");

    if (!errorFlag && passwordFlag && firstName !== "" && lastName !== "" && email !== "" && password !== "" && confirmPassword !== "") {
      navigate("/");
    }

    // const url = "/api/auth/signup";
    // const config = {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // };

    // try {
    //   const response = await fetch(url, config);
    //   const data = await response.json();
    //   const { errors } = data;
    //   console.log(data);
    //   if (!errors) {
    //     // localStorage.setItem("userToken", encodedToken);
    //     toast.success(`User Created successfully`, {
    //       position: "bottom-right",
    //       autoClose: 2000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       theme: "light",
    //     });
    //     // navigate("/login");
    //   } else {
    //     toast.error(`User Already Exists. Please try with some other credentials`, {
    //       position: "bottom-right",
    //       autoClose: 2000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       theme: "light",
    //     });
    //   }
    // } catch (error) {
    // } finally {
    // }
    // }
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
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className={`${styles.firstName} ${formValues.errors.firstName !== "" && styles.error}`}
                  id="firstName"
                  name="firstName"
                  onChange={(e) => {
                    inputHandler(e);
                  }}
                />
                {formValues.errors.firstName !== "" && <span className={styles.warning}>{formValues.errors.firstName}</span>}
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className={`${styles.lastName} ${formValues.errors.lastName !== "" && styles.error}`}
                  id="lastName"
                  name="lastName"
                  onChange={(e) => {
                    inputHandler(e);
                  }}
                />
                {formValues.errors.lastName !== "" && <span className={styles.warning}>{formValues.errors.lastName}</span>}
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
