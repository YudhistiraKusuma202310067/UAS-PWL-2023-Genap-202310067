import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from '../modules/components/auth/Login';
import Register from '../modules/components/auth/Register';
import Home from '../modules/components/home/Home';
import Layouts from '../layouts/Layouts';
import NotFound from '../modules/components/not found/NotFound';
import Chat from '../modules/components/chat/Chat';
import Group from '../modules/components/group/Group';
import Consultation from '../modules/components/consultation/Consultation';
import Post from '../modules/components/post/Post';
import Logout from '../modules/components/logout/Logout';

const AppRoute = () => {
    const routes = [
        // { path: "", element: <Home /> },
        { path: "home", element: <Home /> },
        // {
        //   path: "explore",
        //   element: <Explore />,
        //   children: [
        //     { path: "feeds", element: <Feeds /> },
        //     { path: "reels", element: <Reels /> },
        //     { path: "fyp", element: <FYP /> },
        //   ],
        // },
        { path: "chat", element: <Chat /> },
        { path: "group", element: <Group /> },
        { path: "consultation", element: <Consultation /> },
        { path: "post", element: <Post /> },
        { path: "log-out", element: <Logout /> }
      ];

    return (
        <Routes>
            <Route index element={<Login />} />
            {routes.map((route) => (
                <Route
                key={route.path}
                path={route.path}
                element={<Layouts>{route.element}</Layouts>}
                >
                {/* {route.children?.map((child) => (
                    <Route key={child.path} path={child.path} element={child.element} />
                ))} */}
                </Route>
            ))}
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='post' element={<Post />} />
            <Route path='chat' element={<Chat />} />
            <Route path='group' element={<Group />} />
            <Route path='consultation' element={<Consultation />} />
            <Route path='log-out' element={<Logout />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default AppRoute;
