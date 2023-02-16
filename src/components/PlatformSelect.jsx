function PlatformSelect({ platforms }) {

    return (
        <>
            {platforms.map((platform) => (<option key={platform.id} value={platform.id} >{platform.name}</option>))}
        </>
    );
}

export default PlatformSelect;