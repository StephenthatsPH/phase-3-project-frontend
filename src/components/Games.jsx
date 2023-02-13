import React from "react";

function Games({ games, handleDelete, selectGame }) {
    
    return (
        <>
            {games.map((game) => (
                <div className="game-preview" key={game.id}>
                    <span hidden>{game.id}</span>
                    <span>Title: {game.title}</span>
                    <span>Publisher: {game.publisher}</span>
                    <span>Platform: {game.platform.name}</span><br></br>
                    <span><button onClick={() => selectGame(game.id)}>Update</button></span>
                    <span><button onClick={() => handleDelete(game.id)}>Delete</button></span>
                </div>
            ))}
        </>
    );
}

export default Games;