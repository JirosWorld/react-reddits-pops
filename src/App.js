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
                console.log("alle posts:");
                console.log(result.data.data.children);
// sla de array van posts op
                setPosts(result.data.data.children);
// sla echt alleen de allereerste post op
                setSpecificPost(result.data.data.children[0]);
                console.log("1 post:");
                console.log(result.data.data.children[0]);
            } catch (e) {
                console.error(e);
            }

        }

        fetchPosts();

    }, []);


    return (
        <main className="main">
            <h1>Homepagina</h1>
            <div className="posts">
                <div className="specific__post">
                    {Object.keys(specificPost).length > 0 && specificPost.data.title}
                    <br/> by: <br/>
                    {Object.keys(specificPost).length > 0 && specificPost.data.author}

                </div>


                <ul className="mapped__posts">
                    {/*Er wordt hier gemapt over een lege array*/}
                    {posts.map((post) => {
                        // console.log(post.data);
                        return <li key={post.data.name}>Vote: {post.data.upvote_ratio}</li>
                    })}
                </ul>
            </div>


            <img src={logo} className="App-logo" alt="logo"/>
        </main>
    );

}

export default App;
