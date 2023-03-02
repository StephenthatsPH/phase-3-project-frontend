import React, { useState, useEffect } from "react";
import PlatformSelect from "./PlatformSelect";
import { useHistory } from 'react-router-dom';

function GameForm({ platforms, onAddGame }) {
    const [title, setTitle] = useState("");
    const [publisher, setPublisher] = useState("");
    const [platform_id, setPlatform_id] = useState("");
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();

        const json = JSON.stringify({
            game: {
                title: title,
                publisher: publisher,
                platform_id: platform_id
            }
        })


        fetch('http://localhost:9292/games', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: json
            })
                .then(res => res.json())
                .then(newGame => onAddGame(newGame))
            console.log("new game added");
            setTitle("")
            setPublisher("")
            setPlatform_id("")
            history.push(`/platformslist/`)

    }

    return (
        <div>
            <h1>New Game</h1>
            <form onSubmit={handleSubmit} >
                <input
                    required
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <input
                    required
                    type="text"
                    placeholder="publisher"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                />
                <br />
                <select value={platform_id} onChange={(e) => setPlatform_id(e.target.value)} >
                    <option value="" disabled defaultValue hidden >
                        Select Platform
                    </option>
                    <PlatformSelect platforms={platforms} />
                </select>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default GameForm;