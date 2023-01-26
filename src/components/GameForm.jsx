import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Form() {
    const [title, setTitle] = useState('');
    const [publisher, setPublisher] = useState('');
    const [platform, setPlatform] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [game, setGame] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (game) {
            const json = JSON.stringify({ game })
            console.log(json)
            fetch('http://localhost:9292/games', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ game })
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
        setGame([{ title, publisher, platform }])
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
                <select onChange={(e) => setPlatform(e.target.value)}>
                    <option value="" disabled selected hidden>Select Platform</option>
                    <option value="Playstation">Playstation</option>
                    <option value="Xbox">Xbox</option>
                    <option value="Pc">PC</option>
                    <option value="Nintendo">Nintendo</option>
                    <option value="Other">Other</option>
                </select>
                {!isPending && <button>Submit</button>}
                {isPending && <button disabled>Adding Game...</button>}
            </form>
        </div>
    );
}

export default Form;