import React, { useState } from "react";

function EditGame({ id, title, publisher, platform_id, onGameEdit, game }) {
    const [gameTitle, setGameTitle] = useState(title);
    const [gamePublisher, setGamePublisher] = useState(publisher);
    const [gamePlatform, setGamePlatform] = useState(platform_id);

    function handleEditSubmit(e) {
        e.preventDefault();
        fetch(`http://localhost:9292/games/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: game.title,
                publisher: game.publisher,
                platform_id: game.platform_id
            }),
        })
            .then((res) => res.json())
            .then((updatedGame) => onGameEdit(updatedGame));
    }
    return (
        <form onSubmit={handleEditSubmit}>
            <input
                type="text"
                name="title"
                autoComplete="off"
                value={gameTitle}
                onChange={(e) => setGameTitle(e.target.value)}
            />
            <input
                type="text"
                name="publisher"
                autoComplete="off"
                value={gamePublisher}
                onChange={(e) => setGamePublisher(e.target.value)}
            />
            <input
                type="text"
                name="genre"
                autoComplete="off"
                value={gamePlatform}
                onChange={(e) => setGamePlatform(e.target.value)}
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