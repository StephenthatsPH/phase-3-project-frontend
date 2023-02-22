import React from 'react';
import { NavLink } from "react-router-dom";

function PlatformsList({ platforms }) {

    const getPlatforms = platforms.map((platform) => {
        return <div key={platform.id}>
            <h2>{platform.name}</h2>
            <NavLink to={`/platforms/${platform.id}/games`}>
                <p>Games on {platform.name}</p>
            </NavLink>
        </div>
    })
    return (
        <div>
            <h1>All Platforms</h1>
            {getPlatforms}
        </div>
    )
}

export default PlatformsList;