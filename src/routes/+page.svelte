<script>
    import { update_await_block_branch } from "svelte/internal";
    import { todosStore } from "../stores/todoStore";
    import { loadTodos } from "../stores/todoStore";
    import { del } from "../stores/todoStore";
    import { add } from "../stores/todoStore";
    import { update } from "../stores/todoStore";

    loadTodos();
    $: todos = $todosStore;
    let nieuweTodo;
</script>

<h1>My todos</h1>

{#if todos}
    {#each todos as todo}
        <div class="overzicht">
            <input
                type="text"
                bind:value={todo.text}
                class="normaal"
                on:blur={// database updaten
                () => update(todo)}
            />
            <span
                on:click={() => {
                    //database verwijderen
                    del(todo.id);
                    //store verwijderen
                    let nummer = todos.findIndex(
                        (element) => element.id == todo.id
                    );

                    todosStore.update(() => {
                        todos.splice(nummer, 1);
                        return [...todos];
                    });
                }}>X</span
            >
        </div>
    {/each}
{/if}
<input
    type="text"
    on:keypress={(e) => {
        if (e.key == "Enter") {
            // db
            console.log(add(nieuweTodo));
            //store
            let tijdTodo = { text: nieuweTodo };
            todos = [...todos, tijdTodo];
            todosStore.update(() => {
                todos;
                return [...todos];
            });
            nieuweTodo = null;
        }
    }}
    bind:value={nieuweTodo}
    placeholder="nieuwe todo"
/>

<button on:click={() => console.log(todos)}>log</button>

<style>
    span {
        cursor: pointer;
    }
    input[type="text"] {
        margin-top: 1em;
    }

    .normaal {
        border: none;
    }
</style>
