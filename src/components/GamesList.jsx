import { useState } from 'react';
import PlatformCard from './PlatformCard';
import PlatformSelect from './PlatformSelect';

const GamesList = ({platforms}) => {
    const [games, setGames] = useState(null);
    const [title, setTitle] = useState("");
    const [publisher, setPublisher] = useState("");
    const [platformId, setPlatformId] = useState("");
    const [specificGame, setSpecificGame] = useState({});
    // const [isPending, setIsPending] = useState(true);

    console.log(platforms);
    const handleDelete = (id) => {
        fetch(`http://localhost:9292/games/${id}`,
            { method: "DELETE" })
            .then(() => {
                const updatedGames = games.filter((game) => game.id !== id);
                console.log(updatedGames);
                console.log('All done');
                setGames(updatedGames)
            })
    }

    const updateGame = () => {
        let specificGameId = specificGame.id
        let json = JSON.stringify({
            game: {
                title: title,
                publisher: publisher,
                platform_id: platformId
            }
        })
        fetch(`http://localhost:9292/games/${specificGameId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: json
        })
            .then((resp) => {
                console.log(resp);
            })
    }

    // useEffect(() => {
    //     if (refresh) {
    //         fetch('http://localhost:9292/games')
    //             .then(res => {
    //                 if (!res.ok) {
    //                     throw Error('Could not fetch the data')
    //                 }
    //                 return res.json();
    //             })
    //             .then(data => {
    //                 setGames(data);
    //                 setTitle(data.title);
    //                 setPlatformId(data.platform);
    //                 setPublisher(data.publisher);
    //                 setIsPending(false);
    //                 setError(null);
    //                 setRefresh(false);
    //             })
    //             .catch(err => {
    //                 setIsPending(false);
    //                 setError(err.message);
    //             })
    //     }
    // }, []);

    function handleSearchChange(event) {
    }

    function selectGame(id) {
        let found = games.filter(g => g.id === id)
        if (found.length > 0) {
            let item = found[0]
            setTitle(item.title);
            setPlatformId(item.platform_id);
            setPublisher(item.publisher);
            setSpecificGame(item)
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
                <PlatformSelect platforms={ platforms } />
            </select>
            <div className="update-form" style={{ float: "right" }}>
                <form onSubmit={updateGame} >
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /> <br />
                    <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} /> <br />
                    <select value={platformId} onChange={(e) => setPlatformId(e.target.value)} >
                        <option value="" disabled defaultValue hidden>Select Platform</option>
                        <PlatformSelect platforms={ platforms } />
                    </select> <br />
                    <button>Update Game</button>
                </form>
            </div>
            {/* {pending && <div>Loading...</div>} */}
            {games && <PlatformCard platforms={platforms} handleDelete={handleDelete} selectGame={selectGame} />}
        </div>
    );
};

export default GamesList;