import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { DeleteFilled, ThunderboltFilled, HomeFilled } from "@ant-design/icons";
import { MdCurrencyRupee } from "react-icons/md";
import { auth, db } from "../Firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { comData } from "../App";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartData, setcartData] = useState([]);
  const [totCartAmount, setTotCartAmount] = useState(0);
  const {
    cartCnt,
    setcartCnt,
    tableName,
    settableName,
    setLoginSuccess,
    setNavVisible
  } = useContext(comData);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLoginName = localStorage.getItem("loginName");
    if (storedLoginName) {
      settableName(storedLoginName);
      setLoginSuccess(true);
      setNavVisible(true);
      navigate("/cart");
    } else {
      setLoginSuccess(false);
      setNavVisible(false);
      navigate("/");
      return;
    }
  }, [settableName]);

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

  useEffect(() => {
    if (!tableName) {
      return;
    }
    CartProductsList();
  }, [tableName]);

  useEffect(() => {
    try {
      let totalAmount = 0;
      let count = 0;
      for (let i = 0; i < cartData.length; i++) {
        totalAmount += Number(cartData[i].productTotPrice);
        count = i + 1;
      }
      setTotCartAmount(totalAmount);
      if (count > 0) {
        setcartCnt(count);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }, [cartData]);

  const RemoveCartItem = async (e, id) => {
    e.preventDefault();
    const channelCollectionRef = collection(db, tableName);
    try {
      const removeDoc = doc(channelCollectionRef, id);
      await deleteDoc(removeDoc);
      CartProductsList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="row mb-3 mt-4"
      style={{ paddingTop: "50px", paddingBottom: "30px" }}
    >
      <h2 className="text-center">Cart Items</h2>
      <Container>
        <Row
          className="justify-content-center flex-wrap"
          style={{ width: "100%" }}
        >
          {cartData.map((i, j) => (
            <Col
              key={j}
              xs={12}
              md={6}
              className="m-2"
              style={{
                border: "1px solid gray",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                height: "10rem",
                gap: "1rem"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img
                  src={i.images}
                  alt=""
                  style={{
                    maxHeight: "6rem",
                    maxWidth: "100%",
                    objectFit: "contain",
                    marginBottom: "0.5rem"
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                >
                  <h6 style={{ margin: 0 }}>{`Qty: ${i.Qty}`}</h6>
                </div>
              </div>
              <div style={{ textAlign: "left", flex: 1 }}>
                <h5>{i.title}</h5>
                <h6>
                  Price: <MdCurrencyRupee />
                  {Number(i.productTotPrice).toFixed(2)}
                </h6>
                <div className="mt-2">
                  <Button
                    className="me-2"
                    variant="secondary"
                    style={{ width: "8rem" }}
                    onClick={(e) => RemoveCartItem(e, i.id)}
                  >
                    <DeleteFilled className="me-2" style={{ color: "white" }} />
                    Remove
                  </Button>
                  <Button
                    variant="warning"
                    style={{ width: "8rem" }}
                    onClick={() => navigate("/cart/placeoforder")}
                  >
                    <ThunderboltFilled className="me-1" /> Buy Now
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <Row
          className="justify-content-center mt-4"
          style={{
            width: "100%",
            alignItems: "center"
          }}
        >
          <Col xs={12} md={8}>
            <div className="d-flex justify-content-between align-items-center">
              <h5>
                Order Total: <MdCurrencyRupee />
                {Number(totCartAmount).toFixed(2)}
              </h5>
              <Button
                variant="warning"
                style={{ width: "9rem" }}
                onClick={() => navigate("/cart/placeoforder")}
              >
                <HomeFilled className="me-2" />
                Place Order
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartPage;
