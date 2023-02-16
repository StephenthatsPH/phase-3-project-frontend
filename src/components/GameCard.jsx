import React, { useState } from "react";
import EditGame from "./EditGame";

function GameCard({ id, title, publisher, platform_id, onGameDelete, onGameEdit, game }) {
    const [isEditing, setEditing] = useState(false);

    let deletedGame = { game }

    function handleDeleteClick(e) {
        fetch(`http://localhost:9292/games/${id}`, {
            method: "DELETE"
        })
            .then(onGameDelete(deletedGame))
    }

    function handleUpdateGame(updatedGame) {
        setEditing(false);
        onGameEdit(updatedGame);
    }

    return (
        <li>
            {isEditing ? (
                <EditGame
                    id={id}
                    title={title}
                    publisher={publisher}
                    platform={platform_id}
                    onGameEdit={handleUpdateGame}
                />
            ) : (
                <div>
                    <h1>{title}</h1>
                    <p>{publisher}</p>
                    <p hidden>{platform_id} </p>
                    <button onClick={() => setEditing((isEditing) => !isEditing)}>
                        <span role="img" aria-label="edit">
                            📝EDIT
                        </span>
                    </button>
                    <button onClick={handleDeleteClick}>
                        <span role="img" aria-label="delete">
                            ❌DELETE
                        </span>
                    </button>
                </div>
            )}
        </li>
    );
}

export default GameCard;