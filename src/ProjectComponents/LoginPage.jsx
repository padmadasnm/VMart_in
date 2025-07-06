import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import { toast } from "react-toastify";
import VMart from "../Images/VmartLogo.jpeg";
import { comData } from "../App";

const LoginPage = () => {
  const [userInput, setUserInput] = useState({ userName: "", password: "" });
  const navigate = useNavigate();
  const { setNavVisible, setLoginSuccess, setcartCnt, settableName } =
    useContext(comData);

  useEffect(() => {
    const storedLoginName = localStorage.getItem("loginName");
    if (storedLoginName !== "") {
      settableName(storedLoginName);
    } else {
      settableName("");
    }
    setcartCnt(0);
  }, []);

  const getInput = (i) => {
    setUserInput({ ...userInput, [i.target.name]: i.target.value });
  };

  const LoginformSubmit = async (e) => {
    e.preventDefault();
    const { userName, password } = userInput;
    try {
      await signInWithEmailAndPassword(auth, userName, password);
      console.log("Login successful");
      toast.success("Login successful", {
        position: "top-right"
      });
      localStorage.setItem("loginName", userName);
      setLoginSuccess(true);
      setNavVisible(true);
      settableName(userName);
      navigate("/home");
    } catch (e) {
      console.log(e.message);
      toast.error(e.message, {
        position: "top-right"
      });
      setNavVisible(false);
    }
  };

  const OnRegisterClick = () => {
    setLoginSuccess(true);
    setNavVisible(false);
  };
  console.log(auth.currentUser);

  return (
    <div
      className="container-fluid LoginPageMain"
      style={{ minHeight: "100vh" }}
    >
      <div className="row justify-content-center align-items-center h-100">
        <div
          className="col-12 col-md-8 d-flex justify-content-center align-items-center p-0"
          style={{ height: "100%" }}
        >
          <img
            src={VMart}
            alt="Logo"
            style={{
              border: "1px solid #022e47",
              borderRadius: "5px",
              width: "100%",
              height: "100vh",
              objectFit: "cover"
            }}
          />
        </div>

        <div className="Loginbgd col-12 col-md-4 d-flex justify-content-center">
          <Form style={{ width: "100%", maxWidth: "300px" }}>
            <h1 className="Loginfont text-center m-4">Login</h1>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="Loginfont">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="userName"
                onChange={getInput}
                value={userInput.userName}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="Loginfont">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={getInput}
                value={userInput.password}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" onClick={LoginformSubmit}>
                Submit
              </Button>
              <div className="text-end">
                <Link
                  className="Loginfont"
                  to="/register"
                  onClick={OnRegisterClick}
                >
                  Register now?
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
