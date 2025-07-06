import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { comData } from "../App";

const RegisterPage = () => {
  const { setNavVisible, setLoginSuccess } = useContext(comData);
  const [userInput, setUserInput] = useState({
    fname: "",
    lname: "",
    mobNumber: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const ClearInputBoxes = () => {
    setUserInput({
      fname: "",
      lname: "",
      mobNumber: "",
      email: "",
      password: ""
    });
  };

  useEffect(() => {
    ClearInputBoxes();
  }, []);

  const getInput = (i) => {
    setUserInput({ ...userInput, [i.target.name]: i.target.value });
  };

  const RegisterformSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname, mobNumber, email, password } = userInput;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);

      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname,
        mobNumber: mobNumber
      });
      console.log("User Register Successfully.");
      toast.success("User Register Successfully!!", {
        position: "top-right"
      });
      setLoginSuccess(false);
      setNavVisible(false);
      navigate("/");
      ClearInputBoxes();
    } catch (e) {
      console.log(e.message);
      toast.error(e.message, {
        position: "top-right"
      });
    }
    console.log(userInput);
  };

  const OnLoginClick = () => {
    setLoginSuccess(false);
    setNavVisible(false);
  };

  return (
    <div className="RegPageMain">
      <div
        className="d-flex justify-content-end"
        style={{ minHeight: "100vh" }}
      >
        <div style={{ width: "400px" }}>
          <Form className="formBorder me-5">
            <h1 className="Loginfont d-flex justify-content-center m-4">
              Register
            </h1>
            <Form.Group className="mb-3">
              <Form.Label className="Loginfont">First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="fname"
                onChange={getInput}
                value={userInput.fname}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="Loginfont">Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter lastname"
                name="lname"
                onChange={getInput}
                value={userInput.lname}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="Loginfont">Mobile number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter mobile number"
                name="mobNumber"
                onChange={getInput}
                value={userInput.mobNumber}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="Loginfont">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={getInput}
                value={userInput.email}
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

            <div className="d-grid gap-3">
              <Button
                variant="primary"
                type="submit"
                onClick={RegisterformSubmit}
              >
                Submit
              </Button>
              <div className="text-end">
                <Link className="Loginfont" to={"/"} onClick={OnLoginClick}>
                  Login?
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
