import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from'react-bootstrap/Badge';
import Modal from "../Model";
import Cart from "../pages/Cart";
import { useCart } from "./ContextReducer";

function Navbar() {

  const [cartView, setCartView] = useState(false)
  let data = useCart();
  const navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem('authToken');
    navigate('/login'); 
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger opacity-75">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic fw-bold" to="/">
            HunGry
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-1">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myOrder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn mx-1 bg-white text-danger" to="/login">
                  Login
                </Link>
                <Link
                  className="btn mx-2 bg-white text-danger"
                  to="/createuser"
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div className="btn mx-1 bg-white text-danger" onClick={()=>{setCartView(true)}}>
                  My Cart {"  "}
                  <Badge pill bg="info">{data.length}</Badge>
                </div>
                {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
                <div className="btn mx-1 bg-white text-danger" onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
