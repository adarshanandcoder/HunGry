import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FoodCard from "../components/FoodCard";
import Carousel from "../components/Carousel";

function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headerds: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setFoodCat(response[1]);
    setFoodItems(response[0]);
    // console.log(response[0] , response[1]);
  };

  useEffect(() => {
    loadData();
  });

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" id="carousel">
            <div
              className="carousel-caption"
              style={{
                zIndex: "10",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
              }}
            >
              <div className="d-flex w-75 mx-auto justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}
                />
                {/* <button
                  className="btn btn-outline-info text-white bg-danger"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>

            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="Technology Image"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://plus.unsplash.com/premium_photo-1699612395018-ccaace9d2294?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZCUyMHBob3RvfGVufDB8fDB8fHww"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="Soup Image"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1529006557810-274b9b2fc783?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d3JhcHxlbnwwfHwwfHx8MA%3D%3D"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="Wraps Image"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat.map((data) => {
          return (
            <div className="row">
              <div key={data._id} className="fs-3 m-3">
                {data.CategoryName}
              </div>
              <hr />
              {foodItems
                .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                .map((filteritems) => {
                  return (
                    <div
                      key={filteritems._id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <FoodCard
                        foodItem={filteritems}
                        options={filteritems.options[0]}
                      />
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
