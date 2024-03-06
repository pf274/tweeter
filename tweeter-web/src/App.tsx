import "./App.css";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import MainLayout from "./components/mainLayout/MainLayout";
import Toaster from "./components/toaster/Toaster";
import useUserInfoHook from "./components/userInfo/UserInfoHook";
import { FollowingPresenter } from "./presenter/follow/FollowingPresenter";
import { FollowersPresenter } from "./presenter/follow/FollowersPresenter";
import { FeedPresenter } from "./presenter/status/FeedPresenter";
import { StoryPresenter } from "./presenter/status/StoryPresenter";
import { PagedItemView } from "./presenter/generics/PagedItemPresenter";
import { Status, User } from "tweeter-shared";
import { ItemScroller } from "./components/mainLayout/ItemScroller";
import { StatusService } from "./model/service/StatusService";
import StatusItem from "./components/statusItem/StatusItem";
import UserItem from "./components/userItem/UserItem";
import { FollowService } from "./model/service/FollowService";

const App = () => {
  const { currentUser, authToken } = useUserInfoHook();

  const isAuthenticated = (): boolean => {
    return !!currentUser && !!authToken;
  };

  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        {isAuthenticated() ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
      </BrowserRouter>
    </div>
  );
};

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/feed" />} />
        <Route
          path="feed"
          element={
            <ItemScroller<Status, StatusService>
              presenterGenerator={(view: PagedItemView<Status>) => new FeedPresenter(view)}
              ItemComponent={StatusItem}
              key={"feed"}
            />
          }
        />
        <Route
          path="story"
          element={
            <ItemScroller<Status, StatusService>
              presenterGenerator={(view: PagedItemView<Status>) => new StoryPresenter(view)}
              ItemComponent={StatusItem}
              key={"story"}
            />
          }
        />
        <Route
          path="following"
          element={
            <ItemScroller<User, FollowService>
              presenterGenerator={(view: PagedItemView<User>) => new FollowingPresenter(view)}
              ItemComponent={UserItem}
              key={"following"}
            />
          }
        />
        <Route
          path="followers"
          element={
            <ItemScroller<User, FollowService>
              presenterGenerator={(view: PagedItemView<User>) => new FollowersPresenter(view)}
              ItemComponent={UserItem}
              key={"followers"}
            />
          }
        />
        <Route path="logout" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/feed" />} />
      </Route>
    </Routes>
  );
};

const UnauthenticatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login originalUrl={location.pathname} />} />
    </Routes>
  );
};

export default App;
