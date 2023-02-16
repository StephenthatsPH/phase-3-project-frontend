import React, { useState, useEffect } from "react";

function PlatformForm({ onAddPlatform }) {
    const [name, setName] = useState("");
    const [platform, setPlatform] = useState(null);


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
            })
                .then(res => res.json())
                .then(newPlatform => onAddPlatform(newPlatform))
            console.log("new platform added");

            setName("")
            setPlatform(null);
        }
    }, [platform])

    function handleSubmit(e) {
        e.preventDefault();

        setPlatform({ name })
    }

    return (
        <div>
            <h1>PlatformForm</h1>
            <form onSubmit={handleSubmit} >
                <input
                    required
                    type="text"
                    placeholder="Enter Platform"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default PlatformForm;