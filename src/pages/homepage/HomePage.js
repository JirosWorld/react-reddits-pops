import React, {useEffect, useState} from 'react';
import axios from "axios";
import logo from "../../logo.svg";
import "./HomePage.css"
import Header from "../../components/header/Header";
import Loader from "../../components/loader/Loader";

function HomePage() {

    const [posts, setPosts] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    //mounting fase
    useEffect(() => {
        //de functie om data op te halen
        async function fetchSpecificPosts() {
            //zet de error steeds op leeg, iedere keer bij laden van data
            setError('');
            //zet de loader animatie aan zolang data wordt geladen
            toggleLoading(true);
            try {
                // await request:
                const result = await axios.get('https://www.reddit.com/hot.json?limit=15');
                // sla de array van posts op
                setPosts(result.data.data.children);
                console.log(result.data.data.children);
                //volgende stap: zoek de ID/key van de post-subreddit op en stop die in het URL useparam?
            } catch (error) {
                setError("Er is iets misgegaan bij het ophalen van de data");
                console.error(error);
            }
            toggleLoading(false);
        }

        fetchSpecificPosts();

    }, []);

    return (
        <div className="homepage">
            <Header
                icon={logo}
                title="Reddit's most popular"/>
            {error && <p className="error-message">{error}</p>}
            <div className="posts">
                <ul className="mapped__posts">
                    {loading && <Loader/>}
                    {/*Er wordt hier gemapt over een lege array*/}
                    {posts.map((post) => {
                        // console.log(post.data);
                        // console.log("Lengte van thumbnail string");
                        // console.log(post.data.thumbnail.length);

                        return <li key={post.data.title}>
                            <span className="thumbnail-container">
                                {/*check om te kijken of de thumbnail bestaat (mag niet "self" of "spoiler" zijn, anders default image*/}
                                {post.data.thumbnail.length > 7 ? <img src={`${post.data.thumbnail}`} alt="thumbnail" className="thumbnail"/> : <img src={logo} alt="thumbnail" className="thumbnail"/>
                                }
                            </span>
                            <p className="mapped__post__title">Title: {post.data.title},</p>
                            <span className="mapped__post__author">by: {post.data.author},</span>
                            <a href={`https://www.reddit.com/${post.data.subreddit_name_prefixed}`}
                               className="mapped__post__subreddit" rel="noreferrer" target="_blank">
                                {post.data.subreddit_name_prefixed}
                            </a>,
                            <span className="mapped__post__votes">Vote: {post.data.upvote_ratio}</span>
                        </li>

                    })}
                    </ul>
                    </div>
                    </div>

                    )
                        ;
                    }

                        export default HomePage;