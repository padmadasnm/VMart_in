import React, { useContext } from "react";
import { Carousel } from "react-bootstrap";
import { comData } from "../App";
import HomeCardImages from "./HomeCardImages";

const HomePage = () => {
  const { search, setshow } = useContext(comData);
  return (
    <div
      className="mb-3 mt-3"
      style={{ paddingTop: "50px", paddingBottom: "30px" }}
    >
      <Carousel className="homeMain">
        <Carousel.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: "10px"
            }}
          >
            <img
              src="https://cdn.pixabay.com/photo/2015/01/20/13/13/samsung-605439_960_720.jpg"
              alt=""
              style={{ height: "300px", width: "32%", objectFit: "cover" }}
            />
            <img
              src="https://media.istockphoto.com/id/1452145403/photo/woman-doing-shopping-at-market.jpg?s=612x612&w=0&k=20&c=f9fYhTGxMXVXFQHPWCj6v5hGayi6cOT57aUcfpj4P8Y="
              alt=""
              style={{ height: "300px", width: "32%", objectFit: "cover" }}
            />
            <img
              src="https://cdn.pixabay.com/photo/2016/04/19/13/39/store-1338629_960_720.jpg"
              alt=""
              style={{ height: "300px", width: "32%", objectFit: "cover" }}
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: "10px"
            }}
          >
            <img
              src="https://cdn.pixabay.com/photo/2016/04/08/18/46/shopping-mall-1316787_960_720.jpg"
              alt=""
              style={{ height: "300px", width: "32%", objectFit: "cover" }}
            />
            <img
              src="https://cdn.pixabay.com/photo/2018/04/13/11/14/shoes-3316260_960_720.jpg"
              alt=""
              style={{ height: "300px", width: "32%", objectFit: "cover" }}
            />
            <img
              src="https://cdn.pixabay.com/photo/2015/06/25/17/21/smart-watch-821557_1280.jpg"
              alt=""
              style={{ height: "300px", width: "32%", objectFit: "cover" }}
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: "10px"
            }}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSarNYQMhH3WDEtZrrSPWewW8jT-wWgr-OHqA&s"
              alt=""
              style={{ height: "300px", width: "32%", objectFit: "cover" }}
            />
            <img
              src="https://cdn.pixabay.com/photo/2015/08/14/16/26/potatoes-888585_960_720.jpg"
              alt=""
              style={{ height: "300px", width: "32%", objectFit: "cover" }}
            />
            <img
              src="https://t3.ftcdn.net/jpg/04/75/28/74/360_F_475287490_5MpkpGBpNvLwduIe7EpIZKgBA0g3msh0.jpg"
              alt=""
              style={{ height: "300px", width: "32%", objectFit: "cover" }}
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: "10px"
            }}
          >
            <img
              src="https://t3.ftcdn.net/jpg/03/35/61/78/360_F_335617818_D6XfmNhtCyDRTOvK9GXFkNYs3nyLKvfO.jpg"
              alt=""
              style={{ height: "300px", width: "32%", objectFit: "cover" }}
            />
            <img
              src="https://t4.ftcdn.net/jpg/06/27/63/87/360_F_627638766_fCZnNxHMqJ5lWHyecnibX4aznMWS82yQ.jpg"
              alt=""
              style={{ height: "300px", width: "32%", objectFit: "cover" }}
            />
            <img
              src="https://plus.unsplash.com/premium_photo-1661407806034-4eaf2671322f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3VwZXJtYXJrZXR8ZW58MHx8MHx8fDA%3D"
              alt=""
              style={{ height: "300px", width: "32%", objectFit: "cover" }}
            />
          </div>
        </Carousel.Item>
      </Carousel>
      <HomeCardImages />
    </div>
  );
};

export default HomePage;
