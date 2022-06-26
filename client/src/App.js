import React, { Suspense } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Signin from "./pages/signin/Signin";
import Home from "./pages/home/Home";
import SelectCoverPhoto from "./pages/select_cover_photo/SelectCoverPhoto";
import Category from "./pages/category/Category";
import BusinessName from "./pages/businessName/BusinessName";
import StartBusiness from "./pages/startBusiness/StartBusiness";
import Description from "./pages/description/Description";
import UploadingBusiness from "./pages/uploadingBusiness/UploadingBusiness";
import Profile from "./pages/profile/Profile";
import Messenger from "./pages/messenger/Messenger";
import Follow from "./pages/followUnfollow/Follow";
import AddConversation from "./pages/addConversation/AddConversation";
import Error from "./pages/404errorPage/Error";
import {
  HomePrivateRoute,
  SigninPrivateRoute,
  SignupPrivateRouter,
  ProfilePrivateRouter,
  MessengerPrivateRoute,
  FollowPrivateRouter,
  AddConvPrivateRouter,
} from "./private-Route/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route
          path="/"
          element={
            <HomePrivateRoute>
              <Home />
            </HomePrivateRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <SignupPrivateRouter>
              <Signup />
            </SignupPrivateRouter>
          }
        />
        <Route
          path="/signin"
          element={
            <SigninPrivateRoute>
              <Signin />
            </SigninPrivateRoute>
          }
        />
        <Route path="/selectprofilephoto" element={<SelectCoverPhoto />} />
        <Route path="/category" element={<Category />} />
        <Route path="/businessname" element={<BusinessName />} />
        <Route path="/startbusiness" element={<StartBusiness />} />
        <Route path="/description" element={<Description />} />
        <Route path="/uploadingbusiness" element={<UploadingBusiness />} />
        <Route
          path="/profile"
          element={
            <ProfilePrivateRouter>
              <Profile />
            </ProfilePrivateRouter>
          }
        />
        <Route
          path="/messenger"
          element={
            <MessengerPrivateRoute>
              <Messenger />
            </MessengerPrivateRoute>
          }
        />
        <Route
          path="/follow"
          element={
            <FollowPrivateRouter>
              <Follow />
            </FollowPrivateRouter>
          }
        />
        <Route
          path="/addConversation"
          element={
            <AddConvPrivateRouter>
              <AddConversation />
            </AddConvPrivateRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
