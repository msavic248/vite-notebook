import { useState } from "react";
import { supabase } from "../supabaseClient";

function CreateNote({user}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [show, setShow] = useState(false);

    const id = user.id;

    async function handleFormSubmit(event) {
        // event.preventDefault();

        const {error} = await supabase
        .from("notes")
        .insert({
            title: title,
            content: content,
            owner: id
        });

        setTitle("");
        setContent("");
    }

    function handleButtonClick() {
        if(!show) {
            setShow(true);
        } else if (show) {
            setShow(false);
        }
    }

    return (
        <>
            <button onClick={handleButtonClick}>Create Note</button>
            {show && <form onSubmit={handleFormSubmit}>
                <h3>Create a new Note</h3>
                
                <input type="text" placeholder="Title" value={title} onChange={event => setTitle(event.target.value)} />
                <textarea placeholder="Content" value={content} onChange={event => setContent(event.target.value)} />
                <button type="submit">Create</button>
            </form>}
        </>
    )
}

export default CreateNote