function PlatformSelect({ platforms }) {

    return (
        <>
            {platforms.map((platform) => (<option value={platform.id} >{platform.name}</option>))}
        </>
    );
}

export default PlatformSelect;