import React, { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Products } from "../Urls";
import { comData } from "../App";
import axios from "axios";
import Rating from "@mui/material/Rating";
import { auth, db } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";

const ProductListInCard = () => {
  const {
    search,
    setshow,
    tableName,
    settableName,
    setLoginSuccess,
    setNavVisible
  } = useContext(comData);
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLoginName = localStorage.getItem("loginName");
    if (storedLoginName) {
      settableName(storedLoginName);
      setLoginSuccess(true);
      setNavVisible(true);
      navigate("/productList");
    } else {
      setLoginSuccess(false);
      setNavVisible(false);
      navigate("/");
      return;
    }
  }, [settableName]);

  const url = search ? `${Products}?title=${search}` : Products;
  useEffect(() => {
    try {
      axios.get(url).then((r) => {
        setProduct(r.data);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [search]);

  useEffect(() => {
    const storedLoginName = localStorage.getItem("loginName");
    if (storedLoginName) {
      settableName(storedLoginName);
    }
  }, [settableName]);

  const CardOnClick = (id) => {
    setshow(true);
    navigate(`/productList/details/${id}`);
  };

  const CartbtnClick = async (e, i) => {
    e.preventDefault();
    const channelCollectionRef = collection(db, tableName);
    const pcount = 1;
    try {
      await addDoc(channelCollectionRef, {
        title: product[i].title,
        images:
          product[i].images?.[0] ||
          product[i].images?.[1] ||
          product[i].images?.[2] ||
          "",
        description: product[i].description,
        price: product[i].price,
        productTotPrice: product[i].price,
        Qty: pcount
      });
      navigate(`/cart`);
      console.log("cart success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="row mb-3 m-3"
      style={{ paddingTop: "50px", paddingBottom: "30px" }}
    >
      {product.map((i, j) => {
        return (
          <Card
            className="m-auto mt-3"
            style={{ width: "22rem", height: "34rem" }}
            key={j}
          >
            <Card.Img
              variant="top"
              className="mt-3"
              src={i.images?.[0] || i.images?.[1] || i.images?.[2] || ""}
              style={{ height: "22rem" }}
              onClick={() => CardOnClick(i.id)}
            />
            <Card.Body onClick={() => CardOnClick(i.id)}>
              <Card.Title>{i.title}</Card.Title>
              <h6>
                Price : <i className="bi bi-currency-rupee" />
                {i.price}
              </h6>
              <Rating name="read-only" value="4" readOnly />
            </Card.Body>
            <div className="d-grid gap-2 mb-3">
              <Button
                variant="primary"
                type="button"
                onClick={(e) => CartbtnClick(e, j)}
              >
                <Link className="Navfont">Cart</Link>
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ProductListInCard;
