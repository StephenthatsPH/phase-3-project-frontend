import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Form() {
    const [title, setTitle] = useState("");
    const [publisher, setPublisher] = useState('');
    const [platform, setPlatform] = useState("tree");
    const [isPending, setIsPending] = useState(false);
    const [product, setProduct] = useState(null);
    const history= useHistory();

    useEffect(() => {
    if(product) {
    fetch('http://localhost:8000/product', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(product)
    }).then(() =>{
        console.log("new product added");
        
        setIsPending(false);
        setProduct(null);
        history.push('/games')
    });
}
},[product])

    const handleSubmit = (e) => {
        e.preventDefault();
        //const games = (gameTitle, gamePublisher, gamePlatform);

        setIsPending(true)
        setProduct({title, publisher, platform})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Game Title</label>
                <br/>
                <input
                required
                type="text" 
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <label>Game Publisher</label>
                <br/>
                <input
                required
                type="text" 
                placeholder="Enter Company"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)} 
                />
                <br/>
                <label>Platform</label>
                <br/>
                <select onChange={(e) => setPlatform(e.target.value)}>
                    <option value="playstation">Playstation</option>
                    <option value="xbox">Xbox</option>
                    <option value="pc">PC</option>
                    <option value="nintendo">Nintendo</option>
                    <option value="other">Other</option>
                </select>
                {!isPending && <button>Submit</button>}
                {isPending && <button disabled>Adding Game...</button>}
            </form>
        </div>
    );
}

export default Form;