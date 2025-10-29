<script>
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import axios from "axios";
    export let id = 0, isMobile = false, selectedProject = 'questbench';
    
    // language
    import { t as trans, changeLanguage } from '$lib/i18n.js';
    $: t = $trans;
</script>


<div class="body-style">
{#if id === 2}
<!-- about me -->
    <div class="w-100 d-flex justify-content-between">
        <div class="w-75 me-3">
            <h1 class="text-end w-100">Это Зазя →</h1>
        </div>
        <img src="pfpic.png " class="window active pfpic w-25">
    </div>
{:else if id === 1}
<!-- my project selection -->
    <p>Здесь будут отображаться мои проекты.</p>
    <button on:click={() => selectedProject = 'questbench'}>questbench</button>
    <button on:click={() => selectedProject = 'ovknative'}>OpenVK Native</button>
{:else if id === 3}
<!-- selected project -->
    {@html t(`md.${selectedProject}`)}
{:else if id === 4}
    <p>Сайтики моих кентафариков.</p>
    <a href="https://bento.me/sasik">sasik</a> <br>
    <a href="https://ry0.ru/">ry0</a>
{:else if id === 5}
    <center>
        <h4>Выберите язык:</h4>
        <button on:click={() => changeLanguage('ru')}>Russian</button>
        <button on:click={() => changeLanguage('en')}>English</button>
    </center>
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