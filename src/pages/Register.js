import React from "react";
import { useDispatch, useSelector } from "react-redux";
import serializeForm from "form-serialize";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { addUser } from "../actions/users";

const Register = ({ history }) => {
  const [error, setError] = React.useState({});
  const [image, setImage] = React.useState("");
  const { registering } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  /**
   * Clears the error message from text input
   * @param {*} event
   */
  const onChange = (event) => {
    const { name } = event.target;
    const errors = { ...error };
    delete errors[name];
    setError(errors);
  };

  const onPickImage = (event) => {
    const { files } = event.target;
    if (files && files[0]) {
      setImage(URL.createObjectURL(files[0]));
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const values = serializeForm(event.target, { hash: true });
    if (!values.name || values.name.trim() === "") {
      setError({
        ...error,
        name: "Full name is required.",
      });
      return;
    }
    if (!image) {
      setError({
        ...error,
        name: "Profile picture is required.",
      });
      return;
    }
    values.avatarURL = image;
    dispatch(addUser(values)).then(() => history.replace("/"));
  };

  return (
    <div className="main-content">
      <form onSubmit={onSubmit}>
        <div
          className="p-3 lead rounded-top"
          style={{
            backgroundColor: "#f2f2f2",
            fontWeight: "600",
            margin: "-9px -9px 0 -9px",
            borderBottom: "solid thin rgba(0,0,0,.15)",
          }}
        >
          Enter your details to register
        </div>
        <div className="d-flex flex-row" style={{ alignItems: "center" }}>
          <div className="p-4">
            <label htmlFor="avatarURL">
              <img
                src={image ? image : "images/user.png"}
                alt=""
                className="rounded-circle border"
                style={{ width: "80px", height: "80px" }}
              />
            </label>
            <input
              type="file"
              name="avatarURL"
              id="avatarURL"
              onChange={onPickImage}
              className="d-none"
            />
          </div>
          <div
            className="p-3 flex-fill"
            style={{
              borderLeft: "solid thin rgba(0,0,0,.15)",
            }}
          >
            {error.name && (
              <div className="text-danger align-left mb-3">{error.name}</div>
            )}
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Full Name"
                onChange={(event) => onChange(event)}
              />
            </div>
            <div className="mt-2">
              <button className="btn btn-primary w-100" disabled={registering}>
                {registering ? <div className="spinner-border" /> : "Register"}
              </button>
            </div>
            <div className="pt-3 pb-3 align-left">
              Or <Link to="/">Login</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

Register.propTypes = {
  history: PropTypes.shape({ replace: PropTypes.func }),
};

export default Register;