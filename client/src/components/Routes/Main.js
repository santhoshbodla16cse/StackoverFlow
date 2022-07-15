import React from 'react'
import { Routes, Route } from "react-router"
import AdminDashboard from '../Dashboard/Admin/AdminDashboard'
import Home from '../Dashboard/Home/Home'
import AskQuestion from '../Dashboard/Questions/AskQuestion'
import QuestionOverview from '../Dashboard/Questions/QuestionOverview'
import TagOverview from '../Dashboard/Tags/TagOverview'
import Login from '../Login/Login'
import NavBar from '../NavBar'
import Register from '../Register/Register'
import User from '../User/User'
import TagsHome from '../Dashboard/Home/TagsHome'
import UsersHome from '../Dashboard/Home/UsersHome'
import VerifyAuth from '../util/VerifyAuth'
import Search from '../Dashboard/Search/Search'
import Messages from '../Messages/Messages'
import Chat from '../Messages/Chat'
import EditQuestion from '../Dashboard/Questions/EditQuestion'
import Postactivity from '../Dashboard/Questions/Postactivity'
const Main = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<NavBar />} >
                    {// <Route element={<VerifyAuth />} >
                    }
                        <Route path="" element={<Home />} />
                        <Route path="/Dashboard" element={<Home />} />
                        <Route path="/Dashboard/Tags" element={<TagsHome />} />
                        <Route path="/Dashboard/search" element={<Search />} />
                        <Route path="/Dashboard/Users" element={<UsersHome />} />
                        <Route path="/User/:userid" element={<User />} />
                        <Route path="/askQuestion" element={<AskQuestion />} />
                        <Route path="/editQuestion/:questionId" element={<EditQuestion />} />
                        <Route path="/Messages" element={<Messages />} />
                        <Route path="/messages/chat/:roomId" element={<Chat />} />
                        <Route path="/questions/:qid" element={<QuestionOverview />} />
                        <Route path="/questions/:qid/activity" element={<Postactivity />} />
                        <Route path="/tags/:tagname" element={<TagOverview />} />
                    {// </Route>
                    }
                </Route>
                <Route path="/AdminDashBoard" element={<AdminDashboard />} />
            </Routes>

        </div>
    )
}

export default Main
