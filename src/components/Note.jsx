
function Note({note}) {
    const {id, title, content, created_at} = note;

    return (
        <div className="notetext">
            <h2>{title}</h2>
            <h5>{content}</h5>
            <p>{created_at && created_at.substring(0, created_at.length - 7)}</p>
        </div>
    )
}

export default Note