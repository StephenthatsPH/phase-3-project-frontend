function Games({ games, handleDelete }) {

    
    return (
        <div>
            {games.map((game) => (
                <div className="game-preview" key={game.id}>
                    <h6 hidden>{ game.id }</h6>
                    <h2>{ game.title }</h2>
                    <p>Platform: { game.platform }</p>
                    <p>Publisher: { game.publisher }</p>
                    <button onClick={() => handleDelete(game.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default Games;