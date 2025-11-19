<script>
    import { t as trans, projects } from '$lib/i18n.js';

    import { fade } from 'svelte/transition';

    $: t = $trans;

    let selected_project = 'questbench';
    let opened = {}; // какие категории раскрыты

    function toggle(cat) {
        opened[cat] = !opened[cat];
    }

    function select(name) {
        selected_project = name;
    }
</script>

<style>
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

</style>

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
        .right img { border-radius: 3px; max-width: 100%; max-height: 100%; }
        .right code { background-color: rgba(0,0,0,.05); padding: 2px 4px; border-radius: 4px; font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace; color: #111}
    </style>
    <div class="right">
        {@html t(`md.${selected_project}`)}
    </div>
</div>
{/if}