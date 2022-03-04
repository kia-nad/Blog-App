import React, {Fragment} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from './topbar/topbar';
import Home from './pages/home/home';
import SinglePost from './pages/singlePost/singlePost';
import Write from './pages/write/write';
import Login from './pages/login/login'
import SignUp from './pages/signUp/signUp';

function App() {
  return (
      <Router>
        <Topbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/write" element={<Write />} />
        </Routes>
      </Router>
  );
}

export default App;
