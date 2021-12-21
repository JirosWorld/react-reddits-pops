import {NavLink, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import Button from "../../components/button/Button";
import Loader from "../../components/loader/Loader";
import "./SubReddit.css";
import logo from "../../logo.svg";
import TopNav from "../../components/topnav/TopNav";
// import parseNumberToDotsString from "../../helpers/parseToDots";

function SubReddit() {
    const [subInfo, setSubInfo] = useState();
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    const {subreddit: subredditName} = useParams();

    const [subredditView, toggleSubredditView ] = useState(false);
    // extra menuitem zichtbaar op subreddit page only, wil ik gebruiken voor activeClass
    // maar is niet gelukt: de activeClass wordt alleen actief bij klikken in menu
    // niet bij klikken op andere links

    //mounting fase
    useEffect(() => {
        document.title = "Subreddit :: Jiro's Reddit site!"
        async function getResults() {
            //zet de error steeds op leeg, iedere keer bij laden van data
            setError('');
            //zet de loader animatie aan zolang data wordt geladen
            toggleLoading(true);
            toggleSubredditView(true);
            console.log("toggleSubredditView status: ");
            console.log(toggleSubredditView);
            try {
                const result = await axios.get("https://www.reddit.com/r/" + subredditName + "/about.json");
                setSubInfo(result.data.data);
                console.log("Alle data van 1 subreddit:");
                console.log(result.data.data);
            } catch (error) {
                setError("Er is iets misgegaan bij het ophalen van de data");
                console.error(error);
            }
            toggleLoading(false);
        }

        getResults();

    }, []);

    return (
        <section className="subreddit__page">
            <TopNav>
                <li>
                    <NavLink to="/:subreddit" activeClassName="active-link">Subreddit</NavLink>
                </li>
            </TopNav>
            <Button/>
            <Header
                icon={logo}
                title="~ Info about the subreddit ~"
            />
            {error && <p className="error-message">{error}</p>}
            {loading && <Loader/>}
            {subInfo &&
            <div className="subreddit__card">
                <header className="subreddit__header">
                    <span className="thumbnail-container">
                        {/* met objectkeys eerst checken of data is binnengekomen, daarna renderen */}
                        {/* anders wordt mijn eigen avatar als plaatje geplaatst */}
                        {Object.keys(subInfo).length > 0 && subInfo.header_img !== null ?
                            <img src={`${subInfo.header_img}`} alt="thumbnail" className="thumbnail"/> :
                            <img src={logo} alt="thumbnail" className="thumbnail" height="150" width="150"/>}
                    </span>
                    <h2 className="subreddit__heading">{subInfo.display_name}</h2>
                </header>
                <section>
                    <h4 className="subreddit__heading">Title display:</h4>
                    <h2 className="subreddit__title">
                        {/* dit is vast een ontzettend flauwe manier om externe links te maken? */}
                        <a href={`https://www.reddit.com/r/${Object.keys(subInfo).length > 0 && subInfo.display_name}`}
                           rel="noreferrer" target="_blank">
                            <span>External link to: {Object.keys(subInfo).length > 0 && subInfo.title}</span>
                        </a>
                    </h2>
                    <h2 className="subreddit__heading">Description</h2>
                    <p className="subreddit__description">{subInfo.public_description}</p>
                    <h3 className="subreddit__heading">Subscribers:</h3>
                    <p className="subreddit__subscribers">{parseFloat(subInfo.subscribers).toLocaleString('nl')}</p>

                    {/* data omzetten naar puntjes met mijn helper functie - WERKT NIET */}
                    {/*<p className="subreddit__subscribers">{parseToDots(subInfo.subscribers)}</p>*/}
                </section>

            </div>
            }
            <Button/>
        </section>
    );
}

export default SubReddit;
