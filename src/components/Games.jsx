function Games({ games, handleDelete }) {

    
    return (
        <div>
            {games.map((game) => (
                <div className="game-preview" key={game.id}>
                    <h6 hidden>{ game.id }</h6>
                    <h2>{ game.title }</h2>
                    <p>Publisher: { game.publisher }</p>
                    <p>Platform: { game.platform }</p>
                    <button onClick={() => handleDelete(game.id)}>Update</button>
                    <button onClick={() => handleDelete(game.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default Games;