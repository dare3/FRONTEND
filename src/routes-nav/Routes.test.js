import React from "react";
import { render } from "@testing-library/react";
import Routes from "./Routes";
import { MemoryRouter } from "react-router-dom"; // updated import path
import UserContext from "../UserContext";

const demoUser = {
  username: "testuser",
  first_name: "testfirst",
  last_name: "testlast",
  email: "test@test.net",
  photo_url: null,
};

const UserProvider = ({ children, currentUser = demoUser, hasAppliedToJob = () => false }) => (
  <UserContext.Provider value={{ currentUser, hasAppliedToJob }}>
    {children}
  </UserContext.Provider>
);

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <Routes />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Routes />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
