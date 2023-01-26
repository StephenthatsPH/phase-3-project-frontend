import React, { useState } from "react";

function Games({ games, handleDelete, handleUpdate }) {

    return (
        <div>
            {games.map((game) => (
                <div className="game-preview" key={game.id}>
                    <tr hidden>{game.id}</tr>
                    <td>Title: {game.title}</td>
                    <td>Publisher: {game.publisher}</td>
                    <td>Platform: {game.platform}</td><br></br>
                    <td><button onClick={() => handleUpdate(game.id)}>Update</button></td>
                    <td><button onClick={() => handleDelete(game.id)}>Delete</button></td>
                </div>
            ))}
        </div>
    );
}

export default Games;