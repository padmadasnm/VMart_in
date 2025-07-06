import React, { useContext, useEffect, useState } from "react";
import { Home_Api } from "../Urls";
import axios from "axios";
import { Card } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import { MdCurrencyRupee } from "react-icons/md";
import { comData } from "../App";
import { useNavigate } from "react-router-dom";

const HomeCardImages = () => {
  const { setHshow, setNavVisible, setLoginSuccess } = useContext(comData);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.get(Home_Api).then((e) => {
        setItems(e.data);
      });
      setLoginSuccess(true);
      setNavVisible(true);
      navigate("/home");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [Home_Api]);
  // console.log(items);

  const CardOnClick = (id) => {
    setHshow(true);
    navigate(`/home/details/${id}`);
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        {items.map((i, j) => (
          <div
            className="col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4"
            key={j}
          >
            <Card style={{ width: "18rem" }} onClick={() => CardOnClick(i.id)}>
              <Card.Img
                variant="top"
                src={i.image}
                style={{ width: "100%", height: "12rem", objectFit: "contain" }}
              />
              <Card.Body>
                <Card.Title>
                  <h6>{i.title}</h6>
                </Card.Title>
                <h6>
                  Price:{"  "}
                  <MdCurrencyRupee />
                  {i.price?.toFixed(2)}
                </h6>
                <Rating name="read-only" value={i.rating.rate} readOnly />
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCardImages;
