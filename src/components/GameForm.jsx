import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function GameForm() {
    const [title, setTitle] = useState('');
    const [publisher, setPublisher] = useState('');
    const [platformId, setPlatformId] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [game, setGame] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (game) {
            const json = JSON.stringify({ game:{
                title: game.title,
                publisher: game.publisher,
                platform_id: game.platformId
        }})
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
                    <option value="1">Playstation</option>
                    <option value="2">Xbox</option>
                    <option value="3">PC</option>
                    <option value="4">Switch</option>
                    <option value="5">Mobile</option>
                    <option value="6">NES</option>
                    <option value="7">SNES</option>
                    <option value="8">N64</option>
                    <option value="9">Gamecube</option>
                    <option value="10">Wii</option>
                    <option value="11">Dreamcast</option>
                    <option value="12">Steamdeck</option>
                    <option value="13">Handheld</option>
                    <option value="14">Other</option>
                </select>
                {!isPending && <button>Submit</button>}
                {isPending && <button disabled>Adding Game...</button>}
            </form>
        </div>
    );
}

export default GameForm;