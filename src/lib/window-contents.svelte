<script>
    import { mdConvert } from '$lib/md-convert.js';
    export let id = 0, isMobile = false, selectedProject = 'questbench';
    export let windowManipulate;
    import {onMount, onDestroy} from 'svelte';
    import { writable } from 'svelte/store';

    // language
    import { t as trans, changeLanguage as changLangSrv, getPhrase, getLangCode, formatLocalizedDate, projects } from '$lib/i18n.js';

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
            href: "https://t.me/zazios_ch",
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
            tag: "Sasikqq"
        },
        {
            href: "https://ry0.ru/",
            tag: "Ry0"
        },
        {
            href: "https://t.me/cozy_inn",
            tag: "Cozy Inn"
        },
        {
            href: "https://myslivets.com/",
            tag: "Daniel Myslivets"
        },
        {
            href: "https://t.me/eversiege",
            tag: "Eversiege"
        },
        {
            href: "https://kiffaknife.space",
            tag: "Kiffa"
        },
        {
            href: "https://fayzetwin.xyz",
            tag: "Fayzetwin"
        },
        {
            href: "https://cat8753.ru",
            tag: "Muralmaks"
        },
        {
            href: "https://veselcraft.ru/",
            tag: "Veselcraft"
        },
        {
            href: "https://lisikpng.com/",
            tag: "TheFox"
        }
    ]

    const lang_list = [
        {code: "ru", tag: "Russian"},
        {code: "en", tag: "English"}
    ]
    
    let opened_categories = [];

    const toggleCategory = (category) => {
        if (opened_categories.includes(category)) {
            opened_categories = opened_categories.filter(cat => cat !== category);
        } else {
            opened_categories = [...opened_categories, category];
        }
    };

    let projects_updated_at = "07.12.2025"

    let selected_browser_style = 'sans'
    let browser_fs = 16

    const browser_fs_change = (mod) => {
        const max_size = 30;
        const min_size = 9;
        switch (mod) {
            case "+":
                if (browser_fs >= max_size) return;    
                browser_fs += 2
                return;
            case "-":
                if (browser_fs <= min_size) return;
                browser_fs -= 2
                return;
        }
    }

    let customMdHTML = "";
    let mdFileInput;

    let md_address_string = `/lang/${getLangCode()}/${selectedProject}.md`;

    

    function openFileSelector() {
        mdFileInput.click();
    }

    async function handleMdFileChange(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        md_address_string = `/external/${file.lastModified}/${file.name}`;

        const text = await file.text();
        customMdHTML = mdConvert(text);
    }

    const selectProject = (proj) => {
        selectedProject = proj;
        customMdHTML = "";
        md_address_string = `/lang/${getLangCode()}/${selectedProject}.md`;
    }

    let timeString = '';
    let timer;

    function updateTime() {
		const now = new Date();

        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const timeOffset = 3 * 60 * 60 * 1000; // UTC+3
        const timeUTC3 = new Date(utc + timeOffset);

		const hh = timeUTC3.getHours();
		const mm = String(timeUTC3.getMinutes()).padStart(2, '0');
		const ss = String(timeUTC3.getSeconds()).padStart(2, '0');

        const day = String(timeUTC3.getDate()).padStart(2, '0');
		const month = String(timeUTC3.getMonth() + 1).padStart(2, '0'); // Месяцы с 0
		const year = timeUTC3.getFullYear();

		timeString = `${hh}:${mm}:${ss} (${year}.${month}.${day})`;
	}

	onMount(() => {
		updateTime(); // сразу отображаем время
		timer = setInterval(updateTime, 1000); // обновляем каждую секунду
	});

	onDestroy(() => {
		clearInterval(timer);
	});

</script>

<input
  type="file"
  accept=".md,.txt"
  bind:this={mdFileInput}
  on:change={handleMdFileChange}
  style="display: none;"
/>

<style>
    .body-style {
        font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
        height: 100%;
    }

    .about {
        overflow: hidden;
    }
    .about-left {
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

    .mobile-about-header {
        display: flex;
        margin-top: 5px;
        padding-bottom: 5px;
        margin-bottom: 4px;
        border-bottom: solid 1px #ccc;
    }

    .mobile-about-header .pfpic {
        margin-left: -3px;
        margin-right: 13px;
        max-width: 25%;
    }

    .pfpic .window {
        --w7-w-bg: #45c4ba;
        box-shadow: 1px 1px 2px 0px var(--w7-w-bd), inset 0 0 0 1px #fffa;
        aspect-ratio: 1/1;
        padding: 2px;
        width: 100%;
    }

    .pfpic .contactimg {
        padding: 3px;
        border-radius: 6px;
    }



    .about-right {
        width: 75%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .about-right.mobile {
        width: 100%;
    }

    .ab-r-top {
        background: linear-gradient(to bottom, #EDF8FF, #CCE1FE);
        flex: 1;
        padding-top: 10px;
        padding-left: 20px;
        padding-right: 10px;
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

    :global(b), :global(strong) {
        font-weight: 500;
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

        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;      /* Firefox */
        -ms-overflow-style: none;
    }

    .ab-r-bottom::-webkit-scrollbar {
        display: none;
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
        color: white;
        padding: 5px;
        text-align: center;
        font-size: 14px;
        font-style: italic;
    }

    .icq .bottompart {
        background: linear-gradient(to bottom, #e6e6e6, #cccccc);
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: solid 2px #555;
    }

    .icq .bottompart img {
        display: block;
        max-width: min(90%, 150px);
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

    .browser { height: 100%; display: flex; flex-direction: column;}
    .browser .md {
        overflow: auto;
        padding: 8px;
        padding-top: 0;
        background-color: white;
        flex: 1;
        transition: font-family 0.25s ease, color 0.25s ease;
        line-height: 1.6;
        color: var(--text-color, #222);
    }

    .browser .md.serif {
        font-family: 'Times New Roman', Georgia, 'Noto Serif', serif;
    }

    .browser .md.sans {
        font-family: 'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    }

    .browser .md.mono {
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
    }

    .browser .md-address {
        display: block;
        position: relative;
        z-index: auto;
        width: 100%;
        background-color: white;
        color: black;
        border-radius: 0;
        border-left: 0;
        border-right: 0;
        box-shadow: inset 0px 1px 3px 0px #93939393;
    }

    .lang {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100%;
    }

    .projects {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .projects .top {
        background: linear-gradient(180deg, #F3FAFF 0%, #E0EEFF 100%);
        font-family: Segoe UI;
        font-weight: 400;
        font-style: Regular;
        font-size: 32px;
        line-height: 100%;
        letter-spacing: 0%;
        padding: 10px;
        padding-bottom: 15px;
        border-bottom: 1px solid rgba(72, 72, 72, 1);
        margin: 0;
    }

    .projects .data {
        flex: 1;
        overflow-y: auto;
        background: linear-gradient(180deg, #EBF7FF 65.73%, #A2CBFF 100%);
        padding-bottom: 20px;
    }

    .projects .data::-webkit-scrollbar {
        display: none;
    }

    .projects .data {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .projects .category {
        display: flex;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid rgba(72, 72, 72, 1);
        cursor: pointer;
        background: linear-gradient(180deg, #F3FAFF 0%, #E0EEFF 100%);
    }

    .projects .category .icon {
        width: 22px;
        height: 22px;
        background-image: var(--icon);
        background-size: cover;
        /*background-color: rgba(72, 72, 72, 1);*/
        margin-right: 10px;
    }

    .projects .category .name {
        font-family: Segoe UI;
        font-weight: 400;
        font-style: Regular;
        font-size: 22px;
        leading-trim: NONE;
        line-height: 100%;
        letter-spacing: 0%;
    }

    .projects .category .opened, .projects .category .closed {
        background-image: url('/arrow.svg');
        background-size: 100% 100%;
        width: 12px;
        height: 8px;
    }

    .projects .category .closed {
        transform: rotate(180deg);
    }

    .projects .project-list .project {
        display: flex;
        padding: 10px;
        font-family: Segoe UI;
        font-weight: 400;
        font-style: Regular;
        font-size: 20px;
        leading-trim: NONE;
        line-height: 100%;
        letter-spacing: 0%;
        vertical-align: middle;
        border-bottom: 1px solid rgba(62, 82, 110, 1);
        cursor: pointer;
    }

    .projects .project-list .project .status {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: linear-gradient(180deg, #2360B7 0%, #75AAF4 100%);
        border: 1px solid rgba(55, 94, 148, 1);
        margin-right: 10px;
        margin-top: 4px;
    }

    .projects .project-list .project.archived {
        color: rgba(86, 90, 96, 1);
        background: linear-gradient(180deg, #C8CCD0 0%, #E8F0FB 100%);
    }
    .projects .project-list .project.archived .status {
        background: linear-gradient(180deg, #99A8BD 0%, #D9E4F4 100%);
        border: 1px solid rgba(86, 90, 96, 1)
    }

    .projects .project-list .project.done {
        color: rgba(66, 110, 62, 1);
        background: linear-gradient(360deg, #DAFFD5 0%, #98f098 100%);

    }
    .projects .project-list .project.done .status {
        background: linear-gradient(180deg, #3CB723 0%, #8AF475 100%);
        border: 1px solid rgba(66, 110, 62, 1)
    }

    .projects .project-list .project.wip {
        color: rgba(55, 94, 148, 1);
        background: linear-gradient(360deg, #D5E6FF 0%, #92bef6 100%);
    }
    .projects .project-list .project.wip .status {
        background: linear-gradient(180deg, #2360B7 0%, #75AAF4 100%);
        border: 1px solid rgba(55, 94, 148, 1)
    }

    .projects .bottom {
        background: linear-gradient(180deg, #D3E7FF 0%, #C7E2FF 100%);
        text-align: center;
        font-family: Segoe UI;
        font-weight: 400;
        font-style: Regular;
        font-size: 13px;
        leading-trim: NONE;
        line-height: 100%;
        letter-spacing: 0%;
        text-align: center;
        padding: 10px;
        border-top: 1px solid rgba(72, 72, 72, 1);
    }

    .lang-notice {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        padding: 15px;
        font-size: 16px;
        padding-top: 5px;
    }

    .lang-notice ul {
        list-style: none;
        padding-left: 20px;
    }

    .lang-notice li {
        position: relative;
        padding-left: 15px;
    }

    .lang-notice li::before {
        content: "";
        position: absolute;
        left: 0;
        top: 8px;
        width: 0;
        height: 0;
        border-left: 5px solid currentColor;
        border-top: 3px solid transparent;
        border-bottom: 3px solid transparent;
    }

    .about-page {
        width: 100%;
        height: 100%;
        padding: 0;
    }

    .about-page img {
        width: 100%;
        height: auto;
    }
</style>

<div class="body-style">
{#if id === 2}
<!-- about me -->
<div class="w-100 d-flex justify-content-between about" style="height: 100%;">
    {#if !isMobile}
    <div class="about-left">
        <div class="window">
                <img src="pfpic.png" class="contactimg" alt="profile">
        </div>
    </div>
    {/if}
    <div class="about-right" class:mobile={isMobile}>
        
        <div class="ab-r-top has-scrollbar">
            {#if isMobile}
            <div class="mobile-about-header">
                <div class="pfpic">
                    <div class="window">
                        <img src="pfpic.png" class="contactimg" alt="profile">
                    </div>
                </div>
                <div>
                    <div class="about-title">
                        <h1>ZAZiOs <span class="age">{t('about.age', getAge())}</span></h1>
                    </div>
                    <div class="about-phrase">{t('timenow')} {timeString}</div>
                </div>
            </div>
            {:else}
            <div class="about-title">
                <h1>ZAZiOs <span class="age">{t('about.age', getAge())}</span></h1>
            </div>
            <div class="about-phrase">{t('timenow')} {timeString}</div>
            {/if}
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
<div class="projects">
    <h3 class="top">{t('projects.sel.title')}</h3>
    <div class="data">
        {#each projects as category}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="category" on:click={() => toggleCategory(category.category)}>
            <div class="icon" style="--icon: {category.icon}"></div>
            <div class="name">{t(`projects.sel.${category.category}`)}</div>
            <div style="flex: 1;" />
            {#if opened_categories.includes(category.category)}
                <div class="opened"></div>
            {:else}
                <div class="closed"></div>
            {/if}
        </div>
        {#if opened_categories.includes(category.category)}
        <div class="project-list">
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            {#each category.files as proj}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="project {proj.status}" on:click={() => selectProject(proj.name)}>
                <div class="status"></div>
                <div class="name">{t(`projects.sel.${proj.name}`)}</div>
            </div>
            {/each}
        </div>
        {/if}
        {/each}
    </div>
    <div class="bottom">
        {formatLocalizedDate(projects_updated_at)}
    </div>
</div>
    
{:else if id === 3}
<!-- selected project -->
    <div class="browser">
        {#if !isMobile}
        <ul role="menubar" class="can-hover">
            <li role="menuitem" tabindex="0" aria-haspopup="true">
              {t('projects.menu.file')}
              <ul role="menu">
                <!--li role="menuitem">
                  Требует доработок, загрузки файла например и тд.
                  <button on:click={openFileSelector}>
                    {t('projects.menu.open')}
                  </button>
                </li-->
                <li role="menuitem"><a href="/projects">{t('projects.menu.open_in_new_window')}</a></li>
                <li role="menuitem">
                  <a href="/lang/{getLangCode()}/{selectedProject}.md"  target="_blank">
                    {t('projects.menu.save')}
                  </a>
                </li>
                <li role="menuitem"><button on:click={() => windowManipulate.closeWindow(id)}>{t('projects.menu.exit')}</button></li>
              </ul>
            </li>
            <li role="menuitem" tabindex="0" aria-haspopup="true">
            {t('projects.menu.view')}
              <ul role="menu">
                <li role="menuitem" tabindex="0" aria-haspopup="true">
                    {t('projects.menu.zoom')}
                  <ul role="menu">
                    <li role="menuitem"><img src="https://img.icons8.com/color/20/000000/plus" alt="+" ><button on:click={() => browser_fs_change("+")}>{t('projects.menu.zoom_in')}</button></li>
                    <li role="menuitem"><img src="https://img.icons8.com/color/20/000000/minus" alt="-" ><button on:click={() => browser_fs_change("-")}>{t('projects.menu.zoom_out')}</button></li>
                  </ul>
                </li>
                <li role="menuitem" tabindex="0" aria-haspopup="true">
                    {t('projects.menu.style')}
                    <ul role="menu">
                        <li role="menuitem">
                            <input type="radio" name="icon-size" id="style1" checked bind:group={selected_browser_style} value="serif">
                            <label for="style1">Serif</label>
                        </li>
                        <li role="menuitem">
                            <input type="radio" name="icon-size" id="style2" bind:group={selected_browser_style} value="sans">
                            <label for="style2">Sans</label>
                        </li>
                        <li role="menuitem">
                            <input type="radio" name="icon-size" id="style3" bind:group={selected_browser_style} value="mono">
                            <label for="style3">Mono</label>
                        </li>
                    </ul>
                  </li>
              </ul>
            </li>
            <li role="menuitem" tabindex="0" aria-haspopup="true">
                {t('projects.menu.help')}
              <ul role="menu">
                <li role="menuitem"><a href="#lang" on:click={() => windowManipulate.openWindow(5)}>{t('projects.menu.change_lang')}</a></li>
                <li role="menuitem"><a href="#about" on:click={() => windowManipulate.openWindow(10)}>{t('projects.menu.about')}</a></li>
              </ul>
            </li>
          </ul>
        {/if}
        {#if selectedProject !== ""}
        <input type="text" class="md-address" placeholder=".md address" value='/lang/{getLangCode()}/{selectedProject}.md' disabled/>
        {:else}
        <input type="text" class="md-address" placeholder=".md address" value='/' disabled/>
        {/if}
        <style>
            .browser .md h1 { font-size: calc(var(--fsize) + 24px); }
            .browser .md h2 { font-size: calc(var(--fsize) + 18px); }
            .browser .md h3 { font-size: calc(var(--fsize) + 13px); }
            .browser .md h4 { font-size: calc(var(--fsize) + 9px); }
            .browser .md h5 { font-size: calc(var(--fsize) + 5px); }
            .browser .md h6 { font-size: calc(var(--fsize) + 2px); }
            .browser .md img { 
                display: block;
                border-radius: 3px; 
                max-width: 100%; 
                max-height: 50vH;
                border: 2px dashed #666;
                margin-bottom: 5px;
            }
            .browser .md code { background-color: #1e1e1e10; padding: 2px 4px; border-radius: 4px; font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace; color: #111}
            .browser .md pre { 
                background-color: #2d2d2d; 
                border-radius: 6px; 
                overflow: auto; 
                width: 100%;
                margin-left: 2px;
                margin-bottom: 5px;
                padding-bottom: 5px;
            }
            .browser .md pre .language-name {
                display: block;
                background-color: #1e1e1e;
                color: #ccc;
                padding: 4px 8px;
                font-size: 12px;
                margin-bottom: 5px;
            }
            .browser .md pre code { background-color: transparent; color: #f8f8f2; padding: 0px 10px;}
        </style>
        <div class="md {selected_browser_style} has-scrollbar" style="--fsize: {browser_fs}px; font-size: {browser_fs}px">
            {#if customMdHTML !== ""}
                {@html customMdHTML}
            {:else if selectedProject === ""}
                {@html t('projects.no_project_selected', t('win.1'))}
            {:else if t(`md.${selectedProject}`).startsWith('str.')}
                <i>No markdown file found for project "{selectedProject}" in language "{getLangCode()}".</i>
            {:else}
                {@html t(`md.${selectedProject}`)}
            {/if}
        </div>
    </div>
    
{:else if id === 4}
    <div class="icq">
        <div class="toppart">
        </div>
        <div class="content">
            <div class="top">{t('friends.info')}</div>
            {#each friend_links as link}
                <a href={link.href} target="_blank"><img src="/icq-online.gif" alt="icq"> {link.tag}</a> <br>
            {/each}
        </div>
        <div class="bottompart">
            <img src="/cicq-label.png" alt="cicq">
        </div>
    </div>
{:else if id === 5}
    <div class="lang">
        <h4>{t('chooseLang')}</h4>
        <select on:change={(e) => changeLanguage(e.target.value)}>
            <option disabled selected>Select...</option>
            {#each lang_list as lang}
                <option value={lang.code}>{lang.tag}</option>
            {/each}
        </select>
        <h4 style="opacity: 0;">{t('chooseLang')}</h4>
    </div>
{:else if id === 10}

<div class="about-page has-scrollbar">

    <img src="/about.png" alt="about">

</div>

{:else if id === 11}
<div class="lang-notice">
    {t('notice')}
    <ul>
        <li>
            {t('projects.menu.help')}
            <ul>
                <li>{t('projects.menu.change_lang')}</li>
            </ul>
        </li>
    </ul>
</div>
{/if}
</div>
