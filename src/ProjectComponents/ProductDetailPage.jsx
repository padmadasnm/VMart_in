import React, { useContext, useEffect, useState } from "react";
import { comData } from "../App";
import { Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Products } from "../Urls";
import axios from "axios";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import { auth, db } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";

const ProductDetailPage = () => {
  const {
    show,
    setshow,
    tableName,
    settableName,
    setLoginSuccess,
    setNavVisible
  } = useContext(comData);

  const [prodAmount, setprodAmount] = useState(0);
  const [count, setcount] = useState(1);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLoginName = localStorage.getItem("loginName");
    if (storedLoginName) {
      settableName(storedLoginName);
      setLoginSuccess(true);
      setNavVisible(true);
      setshow(true);
      navigate(`/productList/details/${id}`);
    } else {
      setLoginSuccess(false);
      setNavVisible(false);
      navigate("/");
      return;
    }
  }, [settableName]);

  useEffect(() => {
    try {
      axios.get(`${Products}${id}`).then((r) => {
        setProduct(r.data);
        setprodAmount(r.data.price);
      });
      setcount(1);
    } catch (error) {
      console.error("Error fetching product:", error);
      setcount(1);
    }
  }, [id]);

  const handleClose = () => {
    setshow(false);
    setLoginSuccess(true);
    setNavVisible(true);
    navigate(`/productList`);
  };

  const OnDecrementCnt = () => {
    if (count > 1) {
      const newCount = count - 1;
      setcount(newCount);
      const price = product.price || 0;
      setprodAmount(newCount * price);
    }
  };

  const OnIncrementCount = () => {
    const newCount = count + 1;
    setcount(newCount);
    const price = product.price || 0;
    setprodAmount(newCount * price);
  };

  const CartOnClick = async (e) => {
    e.preventDefault();
    const channelCollectionRef = collection(db, tableName);
    try {
      await addDoc(channelCollectionRef, {
        title: product.title,
        images:
          product.images?.[0] ||
          product.images?.[1] ||
          product.images?.[2] ||
          "",
        description: product.description,
        price: product.price,
        productTotPrice: prodAmount,
        Qty: count
      });
      console.log("success");
    } catch (error) {
      console.log(error);
    }
    navigate(`/cart`);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{product.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <img
              src={
                product.images?.[0] ||
                product.images?.[1] ||
                product.images?.[2]
              }
              alt=""
              style={{ width: "12rem", height: "14rem", objectFit: "contain" }}
            />
          </div>
          <p className="mt-3">{product.description}</p>
          <br />
          <h4>
            Price : <i className="bi bi-currency-rupee" />
            {product.price}/-
          </h4>
          <br />
          <h5>
            Stock Updated On :{" "}
            {new Date(product.updatedAt).toLocaleDateString("en-GB")}
          </h5>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <RemoveSharpIcon onClick={OnDecrementCnt} />
            <h5 style={{ margin: 0 }}>{` Qty: ${count} `}</h5>
            <AddSharpIcon onClick={OnIncrementCount} />
          </div>
          <Button
            variant="warning"
            style={{ width: "80px", fontWeight: "bold" }}
            onClick={CartOnClick}
          >
            Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductDetailPage;
