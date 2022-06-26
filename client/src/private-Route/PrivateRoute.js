import { Navigate } from "react-router-dom";

export const HomePrivateRoute = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/signin" />;
};

export const SigninPrivateRoute = ({ children }) => {
  return localStorage.getItem("token") ? <Navigate to="/" /> : children;
};

export const SignupPrivateRouter = ({ children }) => {
  return localStorage.getItem("token") ? <Navigate to="/" /> : children;
};

export const ProfilePrivateRouter = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/signin" />;
};

export const MessengerPrivateRoute = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/signin" />;
};

export const FollowPrivateRouter = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/signin" />;
};

export const AddConvPrivateRouter = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/signin" />;
};
