export default function UpdateInfos() {
    return(
        <>
            <div className = "inline-block-items"><h4>Last Updated Hour:</h4><p>{new Date().toDateString()}</p></div>
            <div className = "inline-block-items"><h4>Last Updated Received:</h4><p>{new Date().toDateString()}</p></div>
        </>
    )
}