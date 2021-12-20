import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";
import logo from "../../logo.svg";
import "./HomePage.css"
import Header from "../../components/header/Header";
import Loader from "../../components/loader/Loader";
import TopNav from "../../components/topnav/TopNav";

function HomePage() {

    const [posts, setPosts] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');


    //mounting fase
    useEffect(() => {
        //de functie om data op te halen
        async function fetchPopularPosts() {
            //zet de error steeds op leeg, iedere keer bij laden van data
            setError('');
            //zet de loader animatie aan zolang data wordt geladen
            toggleLoading(true);
            try {
                // await request:
                const result = await axios.get('https://www.reddit.com/hot.json?limit=15');
                // sla de array van posts op
                setPosts(result.data.data.children);
                console.log("Alle posts children data:");
                console.log(result.data.data.children);
                //volgende stap: zoek de ID/key van de post-subreddit op en stop die in het URL useparam?
            } catch (error) {
                setError("Er is iets misgegaan bij het ophalen van de data");
                console.error(error);
            }
            toggleLoading(false);
        }

        fetchPopularPosts();

    }, []);

    return (
        <div className="homepage">
            <TopNav/>
            <Header
                icon={logo}
                title="Reddit's most popular"/>
            {error && <p className="error-message">{error}</p>}
            <div className="posts">
                <ul className="mapped__posts">
                    {loading && <Loader/>}
                    {/*Er wordt hier gemapt over een potentieel lege array*/}
                    {posts.map((post) => {
                        // console.log(post.data);
                        // console.log("Lengte van thumbnail string");
                        // console.log(post.data.thumbnail.length);

                        return <li key={post.data.title}>
                            <NavLink
                                activeClassName="active-link"
                                to={"/" + post.data.subreddit}>
                            <span className="thumbnail-container">
                                {/*check om te kijken of de thumbnail bestaat (mag niet "self" of "spoiler" zijn,
                                anders default image + linkt naar Subreddit */}

                                {post.data.thumbnail.length > 7 ?
                                    <img src={`${post.data.thumbnail}`} alt="thumbnail" className="thumbnail"
                                         width="150"/> :
                                    <span className="no-image">
                                        <img src={logo} alt="thumbnail" className="thumbnail" height="150" width="150"/><p>NO IMAGE</p></span>
                                }
                            </span>
                            </NavLink>

                            <div className="content-wrapper">
                            <h2 className="mapped__post__title">
                                {/* dit is vast een ontzettend flauwe manier om externe links te maken?
                                of kan het niet anders? */}
                                (External link:)
                                <a href={`https://www.reddit.com${Object.keys(post.data.permalink).length > 0 && 
                                post.data.permalink}`}
                                   rel="noreferrer" target="_blank">
                                    <span>{Object.keys(post.data.title).length > 0 && post.data.title}</span>
                                </a></h2>
                                |<span className="mapped__post__author">by: {post.data.author}</span>|
                                <br/>

                                {/* ik wil dat de subreddit link het navmenu door activeClass van kleur verandert maar dit lukt niet? */}
                                |<span className="mapped__post__subreddit">internal link to: <NavLink
                                    activeClassName="active-link"
                                    to={"/" + post.data.subreddit}> &#x23E9; "{post.data.subreddit_name_prefixed}"
                                </NavLink></span>|

                                <br/>
                                |<span className="mapped__post__votes">Vote: {post.data.upvote_ratio}</span>|

                                {/* Poging om getallen naar nette puntnotatie te zetten */}
                                <span
                                    className="mapped__post__upvotes">Upvotes: {parseFloat(post.data.ups).toLocaleString('nl')}</span>|
                            <span
                                className="mapped__post__comments">Comments: {parseFloat(post.data.num_comments).toLocaleString('nl')}</span>.
                            </div>
                            {/* <!-- end content wrapper --> */}
                        </li>

                    })}
                </ul>
            </div>
        </div>

    );
}

export default HomePage;
