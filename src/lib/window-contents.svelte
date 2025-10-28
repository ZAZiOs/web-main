<script>
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    export let id = 0, isMobile = false, selectedProject = 'questbench';
</script>


<div class="body-style">
{#if id === 1}
    <p>Здесь будут отображаться мои проекты.</p>
{:else if id === 2}
    <div class="w-100 d-flex justify-content-between">
        <div class="w-75 me-3">
            <h1 class="text-end w-100">Это Зазя →</h1>
            <h2 class="text-end">Местный дурачок</h2>
            <h3 class="text-end">Возможно вы его знаете по цитате:</h3>
            <h5 class="text-end">«Все мы бессмертные... пока не умрём»</h5>
        </div>
        <img src="pfpic.png " class="window active pfpic w-25">
    </div>
{:else if id === 3}
    {#if selectedProject === 'questbench'}
        <div>
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
    <p>Сайтики моих кентафариков.</p>
    <a href="https://bento.me/sasik">sasik</a> <br>
    <a href="https://ry0.ru/">ry0</a>
{/if}
</div>

<style>
    .body-style {
        font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
    }
    h1, h2, h3, h4, h5, h6 {
        font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
    }
    .pfpic {
        padding: 3px;
        border-radius: 3px;
    }
</style>