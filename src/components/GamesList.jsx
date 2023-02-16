import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import GameCard from './GameCard';

function GamesList({ platforms, onGameDelete, onGameEdit }) {
    const [selectedPlatform, setSelectedPlatform] = useState({
        name: "",
        games: []
    });
    const params = useParams();

    useEffect(() => {
        const selectedPlatform = platforms.find((platform) => platform.id === parseInt(params.id))
        if (selectedPlatform) {
            setSelectedPlatform(selectedPlatform)
        }
    }, [platforms, params.id]);

    const getGames = selectedPlatform.games.map((game) => {
        return <div className="games-preview">
            <GameCard id={game.id}
                title={game.title}
                publisher={game.publisher}
                platform={game.platform_id}
                onGameDelete={onGameDelete}
                onGameEdit={onGameEdit}
                game={game}
            />
        </div>
    })

    return (
        <div>
            <h1>
                {selectedPlatform.name} Games:
            </h1>
            <ul>
                {getGames}
            </ul>
        </div>
    )
}

export default GamesList;