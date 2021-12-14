import React, {useEffect, useState} from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';

function App() {
    const [posts, setPosts] = useState([]);
    const [specificPost, setSpecificPost] = useState({});

    //mounting fase
    useEffect(() => {
        //de functie om data op te halen
        async function fetchPosts() {
            try {
                // await request:
                const result = await axios.get('https://www.reddit.com/hot.json?limit=15');
                console.log(result.data.data.children);
// sla de array van posts op
                setPosts(result.data.data.children);
// sla echt alleen de allereerste post op
                setSpecificPost(result.data.data.children[0]);
            } catch (e) {
                console.error(e);
            }

        }

        fetchPosts();

    }, []);


    return (
        <div className="App">
            <h1>Homepagina</h1>
            <div className="yellow">


                {posts.map((post) => {
                    // console.log(post.data);
                    return <div>{post.data.upvote_ratio}</div>
                })}
            </div>
            ;


            <img src={logo} className="App-logo" alt="logo"/>
        </div>
    )
        ;
}

export default App;
