import { useEffect, useState } from 'react'

function PlatformSelect() {
    const [platforms, setPlatforms] = useState([])
    useEffect(() => {

        fetch('http://localhost:9292/platforms')
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data')
                }
                return res.json();
            })
            .then(data => {
                setPlatforms(data)
            })
    }, [platforms])


    return (
        <>
            {platforms.map((platform) => (<option value={platform.id} >{platform.name}</option>))}
        </>
    );
}

export default PlatformSelect;