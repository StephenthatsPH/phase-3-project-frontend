import React, { useState, useEffect } from "react";

function PlatformForm({ onAddPlatform }) {
    const [name, setName] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const json = JSON.stringify({
            platform: {
                name: name
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

    }

    return (
        <div>
            <h1>PlatformForm</h1>
            <form onSubmit={handleSubmit}>
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