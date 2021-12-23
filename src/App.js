import React, {useEffect, useState} from "react";
// useEffect ook nodig om de browser title te veranderen
import {
    Switch,
    Route
} from "react-router-dom";
import './App.css';
import HomePage from "./pages/homepage/HomePage";
import PostPage from "./pages/postpage/PostPage";
import SubReddit from "./pages/subreddit/SubReddit";

function App() {

    // Title veranderen bij mounting
    useEffect(() => {
        document.title = "Jiro's Reddit site!"
    }, []);

    return (
        <main className="main">
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/postpage" >
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
