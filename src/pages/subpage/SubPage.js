import React, {useEffect, useState} from 'react';
import axios from "axios";
import logo from "../../logo.svg";
import "./SubPage.css"
import Header from "../../components/header/Header";
import Button from "../../components/button/Button";
import Loader from "../../components/loader/Loader";

function SubPage() {

    const [specificPost, setSpecificPost] = useState({});
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
                // sla alleen de allereerste post op
                setSpecificPost(result.data.data.children[0]);
                console.log("1 single post:");
                console.log(result.data.data.children[0]);
            } catch (error) {
                setError("Er is iets misgegaan bij het ophalen van de data");
                console.error(error);
            }
            toggleLoading(false);
        }

        fetchSpecificPosts();

    }, []);
    // console.log("thumbnail test: ");
    // console.log(specificPost.data.thumbnail.length);

    return (
        <div className="subpage">
            <Header
                icon={logo}
                title="Reddit's one single most popular post"
            />
            {error && <p className="error-message">{error}</p>}
            <div className="posts">
                <div className="specific__post">
                    {loading && <Loader/>}
                    <span className="thumbnail-container">
                        {Object.keys(specificPost).length > 0 && specificPost.data.thumbnail.length > 7 ? <img src={`${specificPost.data.thumbnail}`} alt="thumbnail" className="thumbnail"/> : <img src={logo} alt="thumbnail" className="thumbnail" /> }
                    </span>
                    {/* dit is vast een ontzettend flauwe manier om externe links te maken? */}
                    <a href={`https://www.reddit.com${Object.keys(specificPost).length > 0 && specificPost.data.permalink}`}
                       rel="noreferrer" target="_blank">
                        {Object.keys(specificPost).length > 0 && specificPost.data.title}
                    </a>
                    <br/> by: <br/>
                    {Object.keys(specificPost).length > 0 && specificPost.data.author}
                    <p>From the subreddit: /r/<a href={`https://www.reddit.com/r/${Object.keys(specificPost).length > 0 && specificPost.data.subreddit}`} rel="noreferrer" target="_blank">
                        {Object.keys(specificPost).length > 0 && specificPost.data.subreddit}
                    </a>
                    </p>
                </div>
            </div>
            <Button/>
        </div>
    );
}

export default SubPage;