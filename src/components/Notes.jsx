import { useState, useEffect } from 'react'
import { supabase } from "../supabaseClient";
import Note from "./Note";
import CreateNote from './CreateNote';

function Notes({user}) {
    const [notes, setNotes] = useState([]);
    const [insert, setInsert] = useState("");

    supabase
    .channel('public:notes')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notes' }, payload => {
        console.log('Change received!', payload)
        setInsert(payload)
    })
    .subscribe()

    useEffect(() => {
        let cancelFetch = false;
        supabase.from('notes')
        .select(`*`)
        .then(response => {
            if(!cancelFetch){
                setNotes(response.data);
            }
        });
            
        return () => {
            cancelFetch = true;
        }
    }, [ ,insert])

    return (
        <div>
            <h2>Notes</h2>
            <div className="notes">
                {notes.map(note => {
                    return (
                        <Note key={note.id} note={note} />
                    )
            })}
            </div>
            <CreateNote user={user}/>
        </div>
    )
}

export default Notes