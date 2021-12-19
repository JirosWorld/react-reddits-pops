import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import './App.css';
import HomePage from "./pages/homepage/HomePage";
import SubPage from "./pages/subpage/SubPage";

function App() {

//     //mounting fase
//     useEffect(() => {
//     }, []);

    return (
        <main className="main">
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/subpage" >
                    <SubPage />
                </Route>
            </Switch>
        </main>
    );

}

export default App;
