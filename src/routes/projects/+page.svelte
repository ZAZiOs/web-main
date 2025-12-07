<script>
    import { t as trans, projects } from '$lib/i18n.js';
    import "prismjs/themes/prism-tomorrow.css"; 
    import { fade } from 'svelte/transition';

    $: t = $trans;

    let selected_project = 'dm_arg';
    let opened = {}; // какие категории раскрыты

    function toggle(cat) {
        opened[cat] = !opened[cat];
    }

    function select(name) {
        selected_project = name;
    }
</script>

<style>
    .main { background-color: white;}
    .wrap {
        display: flex;
        gap: 20px;
        margin: 20px;
        min-height: 100%;
    }

    .left {
        min-height: 100%;
        min-width: 200px;
        border-right: 1px solid #888;
        padding-right: 10px;
    }

    .right {
        flex: 1;
        padding-left: 10px;
    }

    .done {
        color: rgb(5, 104, 5);
    }

    .wip {
        color: rgb(126, 106, 10);
    }

    .archived {
        color: rgb(158, 33, 33);
    }

    .active {
        text-decoration: underline;
        font-weight: bold;
    }

    header {
        display: block;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        border-bottom: 2px solid #444;
        padding-bottom: 3px;
        background-color: #44444420;
    }

    @media (max-width: 1000px) {
        .wrap {
            flex-direction: column;
        }

        .left {
            min-width: 100%;
            border-right: none;
            border-bottom: 1px solid #888;
            padding-right: 0;
            padding-bottom: 10px;
        }

        .right {
            padding-left: 0;
        }
    }

</style>

<div class="main">
<header>Simplified project viewer page</header>
{#if !t('language').startsWith('str.')}
<div class="wrap" transition:fade={{ duration: 100 }}>
    <!-- ЛЕВАЯ ПАНЕЛЬ -->
    <div class="left">
        {#each projects as p}
            <div>
                <div 
                    style="cursor: pointer; font-weight: bold;"
                >
                    {t(`projects.sel.${p.category}`)}
                </div>

                <ul style="margin-left: 10px;">
                    {#each p.files as file}
                        <li 
                            style="cursor: pointer;"
                            class="{file.status}"
                            class:active={selected_project === file.name}
                            on:click={() => select(file.name)}
                        >
                            {t(`projects.sel.${file.name}`)} ({file.status})
                        </li>
                    {/each}
                </ul>
            </div>
        {/each}
    </div>

    <!-- ПРАВАЯ ПАНЕЛЬ -->
    <style>
        .right img { 
            display: block;
            border-radius: 3px; 
            max-width: 100%; 
            max-height: 70vH;
            border: 2px dashed #666;
            margin-bottom: 5px;
        }
        .right code { background-color: #1e1e1e10; padding: 2px 4px; border-radius: 4px; font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace; color: #111}
            .right pre { 
                background-color: #2d2d2d; 
                border-radius: 6px; 
                overflow: auto; 
                width: 100%;
                margin-left: 2px;
                margin-bottom: 5px;
                padding-bottom: 5px;
            }
            .right pre .language-name {
                display: block;
                background-color: #1e1e1e;
                color: #ccc;
                padding: 4px 8px;
                font-size: 12px;
                margin-bottom: 5px;
            }
            .right pre code { background-color: transparent; color: #f8f8f2; padding: 0px 10px;}
    </style>
    <div class="right">
        {@html t(`md.${selected_project}`)}
    </div>
</div>
{/if}
</div>