import React, { useContext, useEffect, useState } from "react";
import { LoginOutlined } from "@ant-design/icons";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "../Images/NavLogo.JPG";
import { Link, useNavigate } from "react-router-dom";
import { comData } from "../App";
import { auth, db } from "../Firebase";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const NavbarMain = () => {
  const {
    search,
    setSearch,
    setNavVisible,
    cartCnt,
    setcartCnt,
    setLoginSuccess,
    settableName,
    tableName
  } = useContext(comData);
  const navigate = useNavigate();
  const [cartData, setcartData] = useState([]);

  useEffect(() => {
    const storedLoginName = localStorage.getItem("loginName");
    if (storedLoginName) {
      settableName(storedLoginName);
      setLoginSuccess(true);
      setNavVisible(true);
    } else {
      setLoginSuccess(false);
      setNavVisible(false);
      navigate("/");
      return;
    }

    const CartProductsList = async () => {
      const channelCollectionRef = collection(db, tableName);
      try {
        const data = await getDocs(channelCollectionRef);
        const cartObj = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        setcartData(cartObj);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    CartProductsList();
  }, [settableName]);

  useEffect(() => {
    try {
      let count = 0;
      for (let i = 0; i < cartData.length; i++) {
        count = i + 1;
      }
      if (count > 0) {
        setcartCnt(count);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }, [cartData]);

  const SearchInput = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const LogoOnClick = () => {
    navigate(`/home`);
  };

  const CartbtnOnClick = () => {
    navigate(`/cart`);
  };

  const OnLogoutClick = async () => {
    try {
      await signOut(auth);
      setNavVisible(false);
      setLoginSuccess(false);
      settableName("");
      localStorage.removeItem("loginName");
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(search);

  return (
    <>
      <Navbar expand="lg" className="NavBarMain" fixed="top">
        <Container fluid>
          <Navbar.Brand className="Navfont ms-5 me-5">
            <img
              src={logo}
              alt="Logo"
              className="navimg"
              onClick={LogoOnClick}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to={"/home"} className="Navfont ms-3">
                Home
              </Link>
              <Link to={"/productList"} className="Navfont ms-3">
                Product
              </Link>
              <Link to={"/about"} className="Navfont ms-3">
                About
              </Link>
              <Nav className="Navfont ms-3">
                <Link to={"/"} className="Navfont" onClick={OnLogoutClick}>
                  <LoginOutlined /> Log out
                </Link>
              </Nav>
            </Nav>
            <Form className="d-flex me-5">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 mt-2"
                aria-label="Search"
                onChange={SearchInput}
                style={{ height: "35px" }}
              />

              <ShoppingCartIcon
                className="Navfont ms-4 m-auto"
                style={{ fontSize: "30px" }}
                onClick={CartbtnOnClick}
              />
              <p
                style={{
                  color: "white",
                  padding: "5px"
                }}
              >
                {cartCnt}
              </p>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          height: "30px",
          backgroundColor: "#022e47",
          color: "white",
          textAlign: "center",
          padding: "3px 0",
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
          zIndex: 1030
        }}
      >
        <p className="navfooter" style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} V Mart.in. All rights reserved.
        </p>
        <p className="navfooter" style={{ margin: 0 }}>
          vmart.in@gmail.com
        </p>
        <p className="navfooter" style={{ margin: 0 }}>
          <a
            className="navfooter"
            href="http://www.vmart.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", textDecoration: "none" }}
          >
            www.vmart.in
          </a>
        </p>
      </div>
    </>
  );
};

export default NavbarMain;
