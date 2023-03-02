import React, { useState } from "react";

function EditGame({ id, title, publisher, platform_id, onGameEdit, game, platforms }) {
    const [gameTitle, setGameTitle] = useState(title);
    const [gamePublisher, setGamePublisher] = useState(publisher);
    const [gamePlatform_id, setGamePlatform_id] = useState(platform_id);

    function handleEditSubmit(e) {
        e.preventDefault();
        fetch(`http://localhost:9292/games/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                game: {
                    title: gameTitle,
                    publisher: gamePublisher,
                    platform_id: gamePlatform_id
                }
            }),
        })
            .then((res) => res.json())
            .then((updatedGame) => onGameEdit(updatedGame));
    }
    return (
        <form onSubmit={handleEditSubmit}>
            <input
                type="text"
                placeholder="Title"
                autoComplete="off"
                value={gameTitle}
                onChange={(e) => setGameTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Publisher"
                autoComplete="off"
                value={gamePublisher}
                onChange={(e) => setGamePublisher(e.target.value)}
            />
            <button>
                <input
                    type="submit"
                    value="Submit"
                />
            </button>
        </form>
    );
}

export default EditGame;