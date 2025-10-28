<script>
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    export let id = 0, isMobile = false, selectedProject = 'questbench';
</script>

{#if id === 1}
    <p>Здесь будут отображаться мои проекты.</p>
{:else if id === 2}
    <p>Немного информации обо мне.</p>
{:else if id === 3}
    {#if selectedProject === 'questbench'}
        <div>
        <h3>Проект: QuestBench</h3>
        <p>Описание проекта QuestBench...</p>
        <h3>Проект: QuestBench</h3>
        <p>Описание проекта QuestBench...</p>
        <h3>Проект: QuestBench</h3>
        <p>Описание проекта QuestBench...</p>
        <h3>Проект: QuestBench</h3>
        <p>Описание проекта QuestBench...</p>
        <h3>Проект: QuestBench</h3>
        <p>Описание проекта QuestBench...</p>

                <h3>Проект: QuestBench</h3>
        <p>Описание проекта QuestBench...</p>
        <h3>Проект: QuestBench</h3>
        <p>Описание проекта QuestBench...</p>        <h3>Проект: QuestBench</h3>
        <p>Описание проекта QuestBench...</p>
        <h3>Проект: QuestBench</h3>
        <p>Описание проекта QuestBench...</p>
        <h3>Проект: QuestBench</h3>
        <p>Описание проекта QuestBench...</p>
        <h3>Проект: QuestBench</h3>
        <p>Описание проекта QuestBench...</p>
    </div>
    {:else if selectedProject === 'projectX'}
        <h3>Проект: Project X</h3>
        <p>Описание проекта Project X...</p>
    {:else}
        <h3>Выбранный проект не найден.</h3>
    {/if}
    <p>Детали выбранного проекта.</p>
{:else if id === 4}
    <p>Мои контактные данные.</p>
{/if}