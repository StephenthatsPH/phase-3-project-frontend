import React from "react";
import PlatformSelect from "./PlatformSelect";

function GameForm({ platforms }) {
    return (
        <div>
            <h1>New Game</h1>
            <form>
                <input type="text" title="title" />
                <br />
                <input type="text" publisher="publisher" />
                <br />
                <select>
                    <PlatformSelect platforms={platforms} />
                </select>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default GameForm;