<script>
    import { todosStore } from "../../stores/todoStore";

    $: todos = $todosStore;
</script>

{#if todos}
    {#each todos as todo}
        <p>{todo.text}</p>
    {/each}
{/if}
