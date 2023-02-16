import React from "react";
import GamesCard from "./GamesCard";

function Platforms({ platforms, handleDelete, selectGame }) {

    return (
        <>
            {platforms.map((platform) => (
                <div className="game-preview" key={platform.id}>
                    <span hidden>{platform.id}</span>
                    <span>Name: {platform.name}</span>
                    <span>Games: <GamesCard platforms={platforms} handleDelete={handleDelete} selectGame={selectGame}/></span>
                </div>
            ))}
        </>
    );
}

export default Platforms;