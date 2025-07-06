import React, { useContext, useEffect } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Col, Container, Row } from "react-bootstrap";
import { comData } from "../App";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const { settableName, setLoginSuccess, setNavVisible } = useContext(comData);
  const navigate = useNavigate();
  useEffect(() => {
    const storedLoginName = localStorage.getItem("loginName");
    if (storedLoginName) {
      settableName(storedLoginName);
      setLoginSuccess(true);
      setNavVisible(true);
      navigate("/about");
    } else {
      setLoginSuccess(false);
      setNavVisible(false);
      navigate("/");
      return;
    }
  }, [settableName]);

  return (
    <div style={{ paddingTop: "30px", paddingBottom: "20px" }}>
      <Container>
        <Row className="align-items-center m-5">
          <h2>About</h2>
          <Col className="mt-3" xs={12} md={6} style={{ textAlign: "justify" }}>
            <p className="aboutpfont">
              <b>Welcome to V Mart.in –</b>your one-stop online shopping
              destination for everything you need!
            </p>
            <p className="aboutpfont">
              At V Mart.in, we combine convenience, quality, and affordability
              to bring the best shopping experience right to your doorstep. With
              an extensive selection across{" "}
              <b>groceries, fashion, and gadgets,</b> we’re here to make your
              life easier and your shopping smarter.
            </p>
            <p className="aboutpfont">
              Whether you're restocking daily essentials, refreshing your
              wardrobe, or browsing the latest in tech, V Mart.in is designed to
              be fast, easy, and enjoyable. Our intuitive platform and secure
              payment options ensure a smooth, hassle-free journey from cart to
              checkout.
            </p>
            <p className="aboutpfont">We’re proud to offer:</p>
            <p className="aboutpfont">
              <ArrowRightIcon />
              <b>Fresh, high-quality groceries</b> at unbeatable prices
            </p>
            <p className="aboutpfont">
              <ArrowRightIcon /> <b>Trendy and affordable fashion</b> for all
              age groups
            </p>
            <p className="aboutpfont">
              <ArrowRightIcon /> <b>The latest gadgets and electronics</b> to
              keep you ahead
            </p>
            <p className="aboutpfont">
              <ArrowRightIcon /> <b>Reliable delivery services</b> and
              responsive customer support
            </p>
            <p className="aboutpfont">
              Join thousands of satisfied customers who trust V Mart.in for both
              everyday needs and special purchases.
            </p>
            <p className="aboutpfont">
              <b>Shop smart. Live better. Only at V Mart.in!</b>
            </p>
          </Col>
          <Col className="mt-3" xs={12} md={6}>
            <div className="d-flex justify-content-center">
              <img
                src="https://thumbs.dreamstime.com/b/young-woman-trolley-supermarket-10834901.jpg"
                alt="Shopping Woman"
                className="img-fluid"
                style={{
                  maxHeight: "80vh",
                  objectFit: "contain",
                  boxShadow: "0 0 20px 10px rgba(24, 2, 66, 0.2)"
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutPage;
