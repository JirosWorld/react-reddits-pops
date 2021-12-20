import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import './App.css';
import HomePage from "./pages/homepage/HomePage";
import PostPage from "./pages/postpage/PostPage";
import SubReddit from "./pages/subreddit/SubReddit";

function App() {

    return (
        <main className="main">
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/subpage" >
                    <PostPage />
                </Route>
                <Route path="/:subreddit">
                    <SubReddit />
                </Route>
            </Switch>
        </main>
    );

}

export default App;
