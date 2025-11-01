<script>
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import axios from "axios";
    export let id = 0, isMobile = false, selectedProject = 'questbench';
    export let windowManipulate;

    // language
    import { t as trans, changeLanguage as changLangSrv, getPhrase } from '$lib/i18n.js';

    $: t = $trans;


    let isLangChanging = false
    async function changeLanguage(lang) {
        console.log(windowManipulate)
        if (isLangChanging) return;
        isLangChanging = true
        await windowManipulate.closeAllWindows(50);
        await changLangSrv(lang)
        await windowManipulate.openAllWindows(50);
        isLangChanging = false
        return;
    }

    function getAge() {
        const year = 2006
        const month = 7
        const day = 6
        const birthDate = new Date(year, month, day);
        const currentDate = new Date();
        let age = currentDate.getFullYear() - birthDate.getFullYear();
    
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();
        
        if (currentMonth < month || (currentMonth === month && currentDay < day)) {
            age--;
        }
        
        return age;
    }

    const about_links = [
        {
            href: "https://github.com/ZAZiOs",
            tag: "GitHub"
        },
        {
            href: "https://t.me/zazio_subs",
            tag: "Telegram"
        },
        {
            href: "https://www.youtube.com/@zazios",
            tag: "Youtube"
        },
        {
            href: "https://ovk.to/zazios",
            tag: "OpenVK"
        },
        {
            href: "https://zazios.bandcamp.com/",
            tag: "Bandcamp"
        }
    ]

    const friend_links = [
        {
            href: "https://bento.me/sasik",
            tag: "Sasiqq"
        },
        {
            href: "https://ry0.ru/",
            tag: "ry0"
        }
    ]

</script>

<style>
    .body-style {
        font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
        height: 100%;
    }

    .about {
        overflow: hidden;
    }
    .about-left {
        height: 100%;
        padding: 10px;
        background: linear-gradient(to bottom, #B2FFB7, #D9FFDB);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 25%;
        border-right: #94d6b0 2px solid;
    }
    .about-left .window {
        --w7-w-bg: #45c4ba;
        box-shadow: 1px 1px 4px 0px var(--w7-w-bd), inset 0 0 0 1px #fffa;
        aspect-ratio: 1/1;
        padding: 2px;
        width: 100%;
    }
    .about-left .contactimg {
        padding: 3px;
        border-radius: 6px;
    }

    .contactimg {
        display: block;
        aspect-ratio: 1/1;
        width: 100%;
    }

    .about-right {
        width: 75%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .about-phrase {

    }

    .ab-r-top {
        background: linear-gradient(to bottom, #EDF8FF, #CCE1FE);
        flex: 1;
        padding-top: 10px;
        padding-left: 20px;
        overflow-y: auto;
    }

    .ab-r-top h1{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 400;
    }
    .age {
        font-size: 1.5rem;
    }

    .about-phrase {
        font-style: italic;
        font-size: 20px;
        margin-top: -10px;
        margin-bottom: 10px;
        color: rgba(33, 37, 41, 0.6);
    }

    .about-md {
        font-size: 16px;
    }

    .ab-r-bottom {
        background: linear-gradient(to bottom, #CFE4FE, #9DC9FF);
        height: 40px;
        border-top: solid 1px #859fc4;
        padding: 7px;
        padding-left: 16px;
        font-size: 18px;
        gap: 10px;
        display: flex;
    }

    .ab-r-bottom a {
        display: block;
        color: #002963;
    }

    .ab-r-bottom a:hover { color: #0c489c } 


    .icq {
        min-height: 150px;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .icq .toppart {
        height: 30px;
        background: linear-gradient(0deg,rgba(144, 195, 220, 1) 0%, rgba(53, 122, 197, 1) 73%, rgba(53, 122, 197, 1) 84%, rgba(104, 153, 211, 1) 100%);
        border-bottom: 1px solid #939393;
        box-shadow: 0px 1px 3px 0px #939393;
    }

    .icq .bottompart {

    }
    .icq .bottompart img {
        image-rendering: pixelated;
        width: 76px;
        margin-left: 5px;
    }

    .icq .content {
        padding: 10px;
        padding-top: 5px;
        font-size: 15px;
        flex: 1;
    }

    .icq .top {
        width: 100%;
        text-align: center;
        padding-bottom: 5px;
        margin-bottom: 10px;
        color: #555;
        border-bottom: #999 1px solid;
    }

    .browser .md {
        font-family: 'Times New Roman', Times, serif;
    }

</style>

<div class="body-style">
{#if id === 2}
<!-- about me -->
<div class="w-100 d-flex justify-content-between about" style="height: 100%;">
    <div class="about-left">
        <div class="window">
                <img src="pfpic.png" class="contactimg" alt="profile">
        </div>
    </div>
    <div class="about-right">
        <div class="ab-r-top has-scrollbar">
            <div class="about-title">
                <h1>ZAZiOs <span class="age">{t('about.age', getAge())}</span></h1>
            </div>
            <div class="about-phrase">{$getPhrase()}</div>
            <div class="about-md">
                {@html t(`md.about`)}
            </div>
        </div>
        <div class="ab-r-bottom">
            {#each about_links as lnk}
                <a href="{lnk.href}" target="_blank">{lnk.tag}</a>
            {/each}
        </div>
    </div>
</div>


{:else if id === 1}
<!-- my project selection -->
    <p>{t('projects.info')}</p>
    <button on:click={() => selectedProject = 'questbench'}>questbench</button>
    <button on:click={() => selectedProject = 'ovknative'}>OpenVK Native</button>
{:else if id === 3}
<!-- selected project -->
    <div class="browser">
        <div class="md">
            {@html t(`md.${selectedProject}`)}
        </div>
    </div>
    
{:else if id === 4}
    <div class="icq">
        <div class="toppart"></div>
        <div class="content">
            <div class="top">{t('friends.info')}</div>
            {#each friend_links as link}
                <a href={link.href} target="_blank"><img src="/icq-online.gif" alt="icq"> {link.tag}</a> <br>
            {/each}
        </div>
        <div class="bottompart">
            <img src="/ralsei.gif" alt="ralsei">
        </div>
    </div>
{:else if id === 5}
    <center>
        <h4>{t('chooseLang')}</h4>
        <button on:click={() => changeLanguage('ru')}>Russian</button>
        <button on:click={() => changeLanguage('en')}>English</button>
    </center>
{/if}
</div>
