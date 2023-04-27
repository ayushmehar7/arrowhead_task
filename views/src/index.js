import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import { LoginForm } from './components/LoginForm.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { SignUpForm } from './components/Signup.component';
import { Home } from './components/Home.component';
import { WatchList } from './components/Watchlist.component';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "login",
        element: <LoginForm />
    },
    {
        path: "signup",
        element: <SignUpForm />
    },
    {
        path: "watchlist",
        element: <WatchList />
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

