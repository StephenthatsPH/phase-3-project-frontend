function Games({ game, handleDelete }) {

    
    return (
        <div>
            {game.map((game) => (
                <div className="game-preview" key={game.id}>
                    <h6 hidden>{ game.id }</h6>
                    <h2>{ game.name }</h2>
                    <p>Type: { game.platform }</p>
                    <p>${ game.price }</p>
                    <button onClick={() => handleDelete(game.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default Games;