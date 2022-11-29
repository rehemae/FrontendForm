import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./components/loader";
import ModalTemplate from "./components/modal/modal-template";
import { gender } from "./helpers/constants";

const App = () => {
  const [inputValues, setInputValues] = useState({});
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forms, setForms] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const fetchForms = () => {
    const url = "https://form-rehema.herokuapp.com/form";
    axios
      .get(url)
      .then((res) => {
        setForms(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // update url
    const url = "https://form-rehema.herokuapp.com/form";

    setLoading(true);
    axios
      .post(
        url,
        {
          name: inputValues.name,
          gender: inputValues.gender,
          age: inputValues.age,
          phone: inputValues.phone,
          satisfied: checked,
          feedback: inputValues.feedback,
        },
        {
          withCredentials: false,
        }
      )
      .then((res) => {
        setShowModal(true);
        fetchForms();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div className="container">
      {loading && <Loader />}

      {showModal ? (
        <ModalTemplate handleClose={() => setShowModal(!showModal)} />
      ) : null}

      <div className="row">
        <div className="col-md-12">
          <h2 className="text-center mt-2">Survey Form</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="col-md-12 mt-2">
            <div className="form-group position-relative">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={handleInputChange}
                autoComplete="off"
                required
              />
              <div className="asteric">*</div>
            </div>
          </div>
          <div className="col-md-12 mt-2">
            <div className="form-group position-relative">
              <label htmlFor="gender">Gender</label>
              <select
                className="form-select"
                name="gender"
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              >
                <option defaultValue>What gender do you identify with? </option>
                {gender.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-12 mt-2">
            <div className="form-group position-relative">
              <label htmlFor="Age">Age</label>
              <input
                type="number"
                className="form-control"
                name="age"
                onChange={handleInputChange}
                autoComplete="off"
                placeholder="Enter your age"
                required
              />
              <div className="asteric">*</div>
            </div>
          </div>
          <div className="col-md-12 mt-2">
            <div className="form-group position-relative">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="number"
                className="form-control"
                name="phone"
                onChange={handleInputChange}
                autoComplete="off"
                placeholder="Enter your phone number"
                required
              />
              <div className="asteric">*</div>
            </div>
          </div>
          <div className="col-md-12 mt-2">
            <div className="form-group position-relative">
              <label htmlFor="services">
                Are you satisfied with the services received
              </label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="satisfaction"
                  onChange={() => setChecked(true)}
                  id="satisfaction1"
                />
                <label className="form-check-label" htmlFor="satisfaction1">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="satisfaction"
                  id="satisfaction"
                  onChange={() => setChecked(false)}
                />
                <label className="form-check-label" htmlFor="satisfaction">
                  No
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-2">
            <label htmlFor="feedback">
              Give us your feedback on the services delivery.
            </label>
            <textarea
              name="feedback"
              onChange={handleInputChange}
              className="form-control"
              required
            ></textarea>
          </div>
          <div className="col-md-12  text-center">
            <button type="submit" className="mt-4 btn btn-dark rounded-5 w-50">
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="row">
        <table className="table table-striped mt-5">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Gender</th>
              <th scope="col">Phone </th>
              <th scope="col">Feedback</th>
              <th scope="col">Satisfied</th>
            </tr>
          </thead>
          <tbody>
            {forms?.map((form, index) => (
              <tr key={index}>
                <td>{form.name}</td>
                <td>{form.age}</td>
                <td>{form.gender}</td>
                <td>{form.phone}</td>
                <td>{form.feedback}</td>
                <td>{form.satisfied ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
