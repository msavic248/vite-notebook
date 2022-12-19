import { useState, useEffect } from 'react'
import { supabase } from "../supabaseClient";
import { Link, Routes, Route, useNavigate, useLocation } from "react-router-dom"
import Note from "./Note";
import CreateNote from './CreateNote';
import UpdateNote from './UpdateNote';
import DeleteNote from './DeleteNote';

function Notes({user}) {
    const [notes, setNotes] = useState([]);
    const [insert, setInsert] = useState(false);
    const [update, setUpdate] = useState(false);
    const [extract, setExtract] = useState(false);
    const navigate = useNavigate();
    let location = useLocation();

    supabase
    .channel('public:notes')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notes' }, handleRecordInserted => {
        setInsert(true)
    })
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'notes' }, handleRecordInserted => {
        setUpdate(true)
    })
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'notes' }, handleRecordInserted => {
        setExtract(true)
    })
    .subscribe();

    useEffect(() => {
        let cancelFetch = false;
        supabase.from('notes')
        .select(`*`)
        .then(response => {
            if(!cancelFetch){
                setNotes(response.data);
            }
        });

        if(insert) {
            navigate("/");
            setInsert(false);
        }

        if(update) {
            navigate(0);
            setUpdate(false);
        }

        if(extract) {
            navigate("/");
            setExtract(false);
        }
            
        return () => {
            cancelFetch = true;
        }
    }, [ , insert, update, extract])

    return (
        <div>
            <h2>Notes</h2>
            <div className="notes">
                {notes.map(note => {
                    return (
                        <Routes key={note.id}>
                            <Route path="/" element={
                                <Link to={note.id}>
                                    <Note note={note} />
                                </Link>
                            }/>
                            <Route path={note.id} element={
                                <Note note={note}/>
                            } />
                        </Routes>
                    )
                })}
            </div>
            <div className="buttons">
                <CreateNote user={user}/>
                {location.pathname != "/" 
                && <>
                    <UpdateNote location={location}/>
                    <DeleteNote location={location}/>
                </>}
            </div>
            
        </div>
    )
}

export default Notes