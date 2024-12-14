import { Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./pages/MyProfile";
import Post from "./pages/Post";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import Sidebar from "./layouts/Sidebar";
import Write from "./pages/Write";
import ModifyProfile from "./pages/ModifyProfile";
import SearchResult from "./pages/SearchResult";
import { useEffect } from "react";
import ModifyPassword from "./pages/ModifyPassword";
import Private from "./layouts/Private";
import { useAllUserStore } from "./store/allUserStore";
import ModifyPost from "./pages/ModifyPost";
import { axiosInstance } from "./api/axios";
import { useChannelStore } from "./store/channelStore";


function App() {
  const fetchUsers = useAllUserStore((state) => state.fetchUsers);
  const setChannels = useChannelStore((state) => state.setChannels);
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axiosInstance.get("/channels");
        setChannels(response.data);
      } catch (error) {
        console.error("채널 정보를 가져오는데 실패했습니다", error);
      }
    };
    fetchUsers();
    fetchChannels();
  }, []);

  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<Sidebar />}>
          <Route path="/" element={<Home />} />
          <Route path="/channels/:channelName" element={<Dashboard />} />
          <Route path="/channels/:channelName/:postId" element={<Post />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/user/:userId" element={<UserProfile />} />

          <Route element={<Private />}>
            <Route path="/write" element={<Write />} />
            <Route path="/posts/:postId/edit" element={<ModifyPost />} />
            <Route path="/mypage" element={<MyProfile />} />
            <Route path="/mypage/edit" element={<ModifyProfile />} />
            <Route path="/mypage/edit/password" element={<ModifyPassword />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
