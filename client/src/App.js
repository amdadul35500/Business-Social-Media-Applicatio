import React, { useEffect, Suspense } from "react";
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
import { gapi } from "gapi-script";
import Loading from "./components/loading/Loading";
import EditProfile from "./pages/editProfilePage.js/EditProfile";
import CreatePost from "./pages/createPost/CreatePost";
import Filter from "./pages/filter/Filter";
import PhotoShare from "./pages/photoShare/PhotoShare";

const GOOGLE_CLIENT_ID =
  "1034266394471-jbgsc0o8srtusgvd6dlcd17ssl1b06cp.apps.googleusercontent.com";

function App() {
  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: GOOGLE_CLIENT_ID,
        scope: "",
      });
    };
    gapi.load("client: auth2", start);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route
          path="/"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <HomePrivateRoute>
                <Home />
              </HomePrivateRoute>
            </Suspense>
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
        <Route path="/loading" element={<Loading />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/photoshare" element={<PhotoShare />} />
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
