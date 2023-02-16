import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function AddPlatform() {
    const [isPending, setIsPending] = useState(false);
    const [platform, setPlatform] = useState(null);
    const [name, setName] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (platform) {
            const json = JSON.stringify({
                platform: {
                    name: platform.name
                }
            })
            fetch('http://localhost:9292/platforms', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: json
            }).then(() => {
                console.log("new platform added");

                setIsPending(false);
                setPlatform(null);
                history.push('/gameform')
            });
        }
    }, [platform])

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsPending(true)
        setPlatform({ name })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Platform Name</label>
                <br />
                <input
                    required
                    type="text"
                    placeholder="Enter Platform"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {!isPending && <button>Submit</button>}
                {isPending && <button disabled>Adding Platform...</button>}
            </form>
        </div>
    );
}

export default AddPlatform;