export default function UpdateInfos() {
    return(
        <>
            <div className = "inline-block-items"><h4>Last Update Hour:</h4><p>{new Date().toDateString()}</p></div>
            <div className = "inline-block-items"><h4>Last Update Received:</h4><p>{new Date().toDateString()}</p></div>
        </>
    )
}