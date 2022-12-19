import { supabase } from "../supabaseClient";

function DeleteNote({location}) {
    const id = location.pathname.slice(1);

    async function handleButtonClick() {
        const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);

        if(error) {
            console.log(`Failed to delete note: ${error}`)
        }
    }

    return (
    <button onClick={handleButtonClick}>Delete Note</button>
    )
}

export default DeleteNote