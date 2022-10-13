import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Owner() {
  let notificationElement = {};
  const [formData, setFormData] = useState({
    no_of_tables: "",
    no_of_chairs: "",
    notification: "",
  });

  const [formDataResponse, setFormDataResponse] = useState({});

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleInvalid(event) {
    const { name, value, type, checked, customValidity } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleOnInput(event) {
    const { name, value, type, checked, customValidity } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
        [customValidity]: "",
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("no_of_tables", formData.no_of_tables);
    urlencoded.append("no_of_chairs", formData.no_of_chairs);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("https://scandiweb.ipublishinghouse.com/create", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setFormDataResponse(result);

        if ("success_message" in result) {
          navigate("/");
        } else {
          console.log(notificationElement, "SKU already exists");
        }
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <form
            action="#"
            id="product_form"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="fixed-header">
              <div className="row">
                <div className="col-md-7">
                  <h1>
                    <b>Owner</b>
                  </h1>
                </div>
                <div className="col-md-2">
                  <button
                    id="save_button"
                    type="submit"
                    className="btn btn-success btn-sm"
                  >
                    Save
                  </button>
                </div>
                <div className="col-md-3">
                  <Link
                    to="/"
                    id="cancel_button"
                    className="btn btn-danger btn-sm"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
              <hr />
            </div>
            <div className="row">
              <div className="col-sm-1">
                <label htmlFor="no_of_tables">No# of Tables</label>
              </div>
              <div className="col-sm-5">
                <input
                  type="text"
                  id="no_of_tables"
                  name="no_of_tables"
                  placeholder="Enter number of tables eg. 1 ,2,3"
                  onChange={handleChange}
                  value={formData.no_of_tables}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-sm-6"></div>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-1">
                <label htmlFor="no_of_chairs">No# of Chairs ($)</label>
              </div>
              <div className="col-sm-5">
                <input
                  type="number"
                  id="no_of_chairs"
                  name="no_of_chairs"
                  placeholder="Enter number of Chairs eg. 1 ,2,3"
                  onChange={handleChange}
                  value={formData.no_of_chairs}
                  className="form-control"
                  onInvalid={handleInvalid}
                  onInput={handleOnInput}
                  required
                />
              </div>
              <div className="col-sm-6"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
