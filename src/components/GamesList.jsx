import { useState, useEffect } from 'react';
import Games from './Games';

const GamesList = () => {
    const [games, setGames] = useState(null);
    const [title, setTitle] = useState("");
    const [publisher, setPublisher] = useState("");
    const [platformName, setPlatformName] = useState("");
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(true);
    const [specificGame, setSpecificGame] = useState(null);

    const handleDelete = (gamesId) => {
        fetch(`http://localhost:9292/games/${gamesId}`,
            { method: "DELETE" })
            .then(() => {
                setRefresh(true);
                console.log('All done');
            })
    }

    const updateGame = () => {
        let specificGameId = specificGame.id
        const json = JSON.stringify({ specificGame:{
            title: specificGame.title,
            publisher: specificGame.publisher,
            platform_id: specificGameId
    }})
    debugger
        console.log(specificGame)
        fetch(`http://localhost:9292/games/${specificGameId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(() => {
                //setRefresh(true);
                console.log('Updated!');
            })
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
                    console.log(data)
                    setGames(data);
                    setTitle(data.title);
                    setPlatformName(data.platform);
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
    }

    function selectGame(id) {
        let found = games.filter(g => g.id === id)
        if (found.length > 0) {
            let item = found[0]
            setTitle(item.title);
            setPlatformName(item.platform.name);
            setPublisher(item.publisher);
            setSpecificGame(item);
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
                <option disabled defaultValue hidden>Platform Filter</option>
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
                    <select value={platformName} onChange={(e) => setPlatformName(e.target.value)} >
                        <option value="" disabled defaultValue hidden>Select Platform</option>
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