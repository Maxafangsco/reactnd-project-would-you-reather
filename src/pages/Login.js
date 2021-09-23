import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Button } from "react-bootstrap";
import PropTypes from "prop-types";

import { loginUser } from "../actions/login";
import { Link } from "react-router-dom";

const Login = ({ history, location }) => {
  const [selectedItem, setSelectedItem] = React.useState({
    name: "Select User",
  });
  const { user } = useSelector((state) => state.authUser);
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const { referrer } = location && location.state ? location.state : "";
    if (user) {
      referrer ? history.push(referrer) : history.push("/home");
    }
  });

  const onSubmit = () => {
    dispatch(loginUser(selectedItem.id));
  };

  return (
    <div className="main-content">
      <div
        className="rounded-top p-3"
        style={{
          borderBottom: "solid 1px rgba(0,0,0,.15)",
          margin: "-10px -10px 0 -10px",
          backgroundColor: "#f2f2f2",
          height: "100px",
        }}
      >
        <div>
          <h5>Welcome to the Would You Rather App!</h5>
        </div>
        <div>Please sign in to continue</div>
      </div>
      <div style={{ padding: "100px 0 10px 0" }}>
        <h4>Sign in</h4>
      </div>
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="transparent">
            {selectedItem.name}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {users
              ? Object.entries(users).map(([key, value]) => {
                  return (
                    <Dropdown.Item
                      key={key}
                      onClick={() => setSelectedItem(value)}
                    >
                      {value.name}
                    </Dropdown.Item>
                  );
                })
              : null}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="padding-ten">
        <Button variant="primary" onClick={onSubmit}>
          Sign in
        </Button>
      </div>
      <div className="pt-3 pb-3 align-center">
        Or <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
  location: PropTypes.shape({
    state: PropTypes.shape({ referrer: PropTypes.string }),
    search: PropTypes.string,
  }),
};

export default Login;