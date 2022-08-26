import { writable } from "svelte/store";
import { supabase } from "./supabase";

export const todosStore = writable([]);


export const loadTodos = async () => {
    const { data, error } = await supabase.from('todos').select('*');
    if (error) return error; else todosStore.set(data);

}

export const del = async (id) => {
    const { data, error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
    if (error) console.log('jammer joh')
}

export const add = async (todo) => {
    const { data, error } = await supabase
        .from('todos')
        .insert([
            { 'text': todo },
        ]).then((info) => console.log(info.data))
}



export const update = async (todo) => {
    const { data, error } = await supabase
        .from('todos')
        .update({ 'text': todo.text })
        .eq('id', todo.id)
    if (error) console.log('jammer joh')
}




