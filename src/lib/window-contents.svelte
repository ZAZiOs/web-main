<script>
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    export let id = 0;
    export let isMobile = false;
</script>

{#if id === 1}
    <p>Здесь будут отображаться мои проекты.</p>
{:else if id === 2}
    <p>Немного информации обо мне.</p>
{:else if id === 3}
    <p>Детали выбранного проекта.</p>
{:else if id === 4}
    <p>Мои контактные данные.</p>
{/if}