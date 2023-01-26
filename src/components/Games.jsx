import React, { useState } from "react";

function Games({ games, handleDelete, selectGame }) {

    return (
        <div>
            {games.map((game) => (
                <tbody className="game-preview" key={game.id}>
                    <tr hidden>{game.id}</tr>
                    <td>Title: {game.title}</td>
                    <td>Publisher: {game.publisher}</td>
                    <td>Platform: {game.platform}</td><br></br>
                    <td><button onClick={() => selectGame(game.id)}>Update</button></td>
                    <td><button onClick={() => handleDelete(game.id)}>Delete</button></td>
                </tbody>
            ))}
        </div>
    );
}

export default Games;