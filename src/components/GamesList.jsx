import { useState, useEffect } from 'react';
import Games from './Games';

const GamesList = () => {
    const [games, setGames] = useState(null);
    const [title, setTitle] = useState("");
    const [publisher, setPublisher] = useState("");
    const [platform, setPlatform] = useState("");
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [searchChange, setSearchChange] = useState('');
    const [refresh, setRefresh] = useState(true);


    const handleDelete = (gamesId) => {
        fetch(`http://localhost:9292/games/${gamesId}`,
            { method: "DELETE" })
            .then(() => {
                setRefresh(true);
                console.log('All done');
            })
    }

    /*function updateGame(id) {
        fetch(`http://localhost:9292/games/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(games)
        })
            .then((r) => { r.json().then((setGames()))
            r.json().then((r) => {
                setGames();
            })
        })
    }*/

    const updateGame = (gamesId) => {
        fetch(`http://localhost:9292/games/${gamesId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ games }),
        })
            .then((r) => r.json())
            .then((
                setGames()
            ))
    }

    useEffect(() => {
        if (refresh) {
            fetch('http://localhost:9292/games')
                .then(res => {
                    if (!res.ok) {
                        throw Error('Could not fetch the data')
                    }
                    return res.json();
                })
                .then(data => {
                    setGames(data);
                    setTitle(data.title);
                    setPlatform(data.platform);
                    setPublisher(data.publisher);
                    setIsPending(false);
                    setError(null);
                    setRefresh(false);
                })
                .catch(err => {
                    setIsPending(false);
                    setError(err.message);
                })
        }
    }, [refresh]);

    function handleSearchChange(event) {
        setSearchChange(event.target.value);
    }

    function selectGame(id) {
        let found = games.filter(g => g.id === id)
        if (found.length > 0) {
            let item = found[0]
            setTitle(item.title);
            setPlatform(item.platform);
            setPublisher(item.publisher);
        };

    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search"
                onChange={handleSearchChange}
            >
            </input>
            <select>
                <option>Playstation</option>
                <option>Xbox</option>
                <option>PC</option>
                <option>Nintendo</option>
                <option>Other</option>
            </select>
            <div className="update-form" style={{ float: "right" }}>
                <form>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /> <br />
                    <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} /> <br />
                    <select value={platform} onChange={(e) => setPlatform(e.target.value)} >
                        <option value="" disabled selected hidden>Select Platform</option>
                        <option value="Playstation">Playstation</option>
                        <option value="Xbox">Xbox</option>
                        <option value="Pc">PC</option>
                        <option value="Nintendo">Nintendo</option>
                        <option value="Other">Other</option>
                    </select> <br />
                    <button onClick={updateGame}>Update Game</button>
                </form>
            </div>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {games && <Games games={games} handleDelete={handleDelete} selectGame={selectGame} />}
        </div>
    );
};

export default GamesList;