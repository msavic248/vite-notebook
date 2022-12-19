import { useState } from "react";
import { supabase } from "../supabaseClient";

function UpdateNote({location}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [show, setShow] = useState(false);
    const id = location.pathname.slice(1);

    async function handleFormSubmit(event) {
        event.preventDefault();

        const {error} = await supabase
        .from("notes")
        .update({
            title: title,
            content: content,
        })
        .eq('id', id);

        if(error) {
            console.log(`Failed to insert note: ${error}`)
        }

        setTitle("");
        setContent("");
        setShow(false);
    }

    function handleButtonClick() {
        if(!show) {
            setShow(true);
        } else if (show) {
            setShow(false);
        }
    }

    return (
        <div>
            <button onClick={handleButtonClick}>Update Note</button>
            {show && <form onSubmit={handleFormSubmit}>
                    <h3>Update Note</h3>
                    
                    <input type="text" placeholder="Title" value={title} onChange={event => setTitle(event.target.value)} />
                    <textarea placeholder="Content" value={content} onChange={event => setContent(event.target.value)} />
                    <button type="submit">Update</button>
                </form>}
        </div>
    )
}

export default UpdateNote