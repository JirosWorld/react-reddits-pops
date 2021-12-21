import React, {useEffect, useState} from 'react';
import axios from "axios";
import logo from "../../logo.svg";
import "./PostPage.css"
import Header from "../../components/header/Header";
import Button from "../../components/button/Button";
import Loader from "../../components/loader/Loader";
import TopNav from "../../components/topnav/TopNav";

function PostPage() {

    const [specificPost, setSpecificPost] = useState({});
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    //mounting fase
    useEffect(() => {
        document.title = "nr. 1 Post :: Jiro's Reddit site!"
        //de functie om data op te halen
        async function fetchSpecificPost() {
            //zet de error steeds op leeg, iedere keer bij laden van data
            setError('');
            //zet de loader animatie aan zolang data wordt geladen
            toggleLoading(true);
            try {
                // await request:
                const result = await axios.get('https://www.reddit.com/hot.json?limit=15');
                // sla alleen de allereerste populairste post op
                setSpecificPost(result.data.data.children[0]);
                console.log("1 single post:");
                console.log(result.data.data.children[0]);
            } catch (error) {
                setError("Er is iets misgegaan bij het ophalen van de data");
                console.error(error);
            }
            toggleLoading(false);
        }

        fetchSpecificPost();

    }, []);
    // console.log("thumbnail test: ");
    // console.log(specificPost.data.thumbnail.length);

    return (
        <div className="subpage">
            <TopNav/>
            <Button/>
            <Header
                title="Reddit's one single most popular post"
            />
            {error && <p className="error-message">{error}</p>}
            <div className="posts">
                <div className="specific__post">
                    {loading && <Loader/>}
                    <span className="thumbnail-container">
                        {/* met objectkeys eerst checken of data is binnengekomen, daarna conditioneel renderen */}
                        {Object.keys(specificPost).length > 0 && specificPost.data.thumbnail.length > 7 ?
                            <img src={`${specificPost.data.thumbnail}`} alt="thumbnail" className="thumbnail"/> :
                            <img src={logo} alt="thumbnail" className="thumbnail" height="150" width="150"/>}
                    </span>
                    {/* dit is vast een ontzettend flauwe manier om externe links te maken? */}
                    <a href={`https://www.reddit.com${Object.keys(specificPost).length > 0 && specificPost.data.permalink}`}
                       rel="noreferrer" target="_blank">
                        <h2>{Object.keys(specificPost).length > 0 && specificPost.data.title}</h2>
                    </a>
                    <br/> by: <br/>
                    {Object.keys(specificPost).length > 0 && specificPost.data.author}
                    <p>From the subreddit: /r/<a
                        href={`https://www.reddit.com/r/${Object.keys(specificPost).length > 0 && specificPost.data.subreddit}`}
                        rel="noreferrer" target="_blank">
                        {Object.keys(specificPost).length > 0 && specificPost.data.subreddit}
                    </a>
                    </p>
                    <article className="specific__post__content">
                        <p>Description (if any): <br/> {Object.keys(specificPost).length > 0 && specificPost.data.description}</p></article>
                    <br/>
                    | <span className="mapped__post__votes">Vote: {Object.keys(specificPost).length > 0 && specificPost.data.upvote_ratio}</span> |

                    {/* Getallen naar nette puntnotatie zetten */}
                    <span
                        className="mapped__post__upvotes"> Upvotes: {Object.keys(specificPost).length > 0 && parseFloat(specificPost.data.ups).toLocaleString('nl')}</span> |
                    <span
                        className="mapped__post__comments"> Comments: {Object.keys(specificPost).length > 0 && parseFloat(specificPost.data.num_comments).toLocaleString('nl')}</span> |
                </div>
            </div>
            <Button/>
        </div>
    );
}

export default PostPage;
