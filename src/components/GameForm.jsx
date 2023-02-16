import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PlatformSelect from './PlatformSelect';

function GameForm({ platforms }) {
    const [title, setTitle] = useState('');
    const [publisher, setPublisher] = useState('');
    const [platformId, setPlatformId] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [game, setGame] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (game) {
            const json = JSON.stringify({
                game: {
                    title: game.title,
                    publisher: game.publisher,
                    platform_id: game.platformId
                }
            })
            fetch('http://localhost:9292/games', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: json
            }).then(() => {
                console.log("new game added");

                setIsPending(false);
                setGame(null);
                history.push('/gameslist')
            });
        }
    }, [game])

    const handleSubmit = (e) => {
        e.preventDefault();
        //const games = (gameTitle, gamePublisher, gamePlatform);

        setIsPending(true)
        setGame({ title, publisher, platformId })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Game Title</label>
                <br />
                <input
                    required
                    type="text"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <label>Game Publisher</label>
                <br />
                <input
                    required
                    type="text"
                    placeholder="Enter Publisher"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                />
                <br />
                <label>Platform</label>
                <br />
                <select onChange={(e) => setPlatformId(e.target.value)}>
                    <option value="" disabled selected hidden>Select Platform</option>
                    <PlatformSelect platforms={ platforms }/>
                </select>
                {!isPending && <button>Submit</button>}
                {isPending && <button disabled>Adding Game...</button>}
            </form>
        </div>
    );
}

export default GameForm;