<script>
    import { browser } from "$app/environment";
    import WindowContents from "$lib/window-contents.svelte";
    import { fade, slide } from 'svelte/transition';
    import { cubicIn, cubicOut } from 'svelte/easing';

    import { t as trans, changeLanguage } from '$lib/i18n.js';
    $: t = $trans;

    // --------- CUSTOM ANIMATIONS ---------
    function fadeZoom(node, params) {
        const { duration = 250, scale = 0.9, direction = "in" } = params;
        const easing = direction === 'in' ? cubicOut : cubicIn;
        return { duration, easing, css: (t, u) => {
                const s = scale + (1 - scale) * t
                return `opacity: ${t}; transform: scale(${s});`;
            }
        };
    }



    // --------- VARIABLES INIT ---------
    let isMobile = false;
    if (browser) isMobile = window.innerWidth <= 768;

    let resizeTimeout = null;

    // такой странный порядок не по айди из-за того как мобильный лайаут рендерится сверху вниз
	const windows = [
        { id: 2, title: "Обо мне", top: "2%", left: "30%", width: "70%", height: "47%" },
		{ id: 1, title: "Мои проекты", top: "2%", left: "1%", width: "28%", height: "47%" },
		{ id: 3, title: "*Выбранный проект*", top: "50%", left: "1%", width: "68%", height: "47%" },
		{ id: 4, title: "Мои друзья", top: "50%", left: "70%", width: "30%", height: "47%" },
        { id: 5, title: "Справка", top: "25%", left: "30%", width: "39%", height: "50%" },
	];

    const desktopIcons = [
        {id: 1, title: "Мои проекты", icon: "/icons/folder-icon.ico"},
        {id: 2, title: "Обо мне", icon: "/icons/system-icon.ico"},
        {id: 4, title: "Мои друзья", icon: "/icons/friends-icon.ico"},
    ]
    let activeIcon = null;
    
	let activeWindow = null;
    let lastActiveWindowId = 2;
    let zIndexCounter = 10;
    let baseWidth = 1000;
    let baseHeight = browser ? window.innerHeight : 1000;
    let scaleX = browser ? Math.min(window.innerWidth / baseWidth, 1) : 1; 
    let scaleY = browser ? Math.min(window.innerHeight / baseHeight, 1) : 1; 
    let leftOffset = browser ? window.innerWidth > baseWidth ? (window.innerWidth - baseWidth)/2 : 0 : 0;
	let offsetY = 0;
    let offsetX = 0;
    
    let initWindows = windows.map(win => {
        const topPercent = parseFloat(win.top);    // 2
        const leftPercent = parseFloat(win.left);  // 30
        const widthPercent = parseFloat(win.width);
        const heightPercent = parseFloat(win.height);

        return {
            ...win,
            top: topPercent / 100 * baseHeight * scaleY + 'px',        // пропорционально baseWidth
            left: leftOffset + leftPercent / 100 * baseWidth * scaleX + 'px',
            width: widthPercent / 100 * baseWidth * scaleX + 'px',
            height: heightPercent / 100 * baseHeight * scaleY + 'px'
        };
    });


    let openedWindows = [];


    // --------- WINDOWS MOVING SYSTEM ---------


    async function moveWindowOnTop(e, win) {
        if (!browser) return;
        await new Promise(resolve => setTimeout(resolve, 100))
        const el = document.getElementById("win" + win.id);
        el.style.zIndex = zIndexCounter++;
        lastActiveWindowId = win.id;
    }

	function startDrag(e, win) {
        if (!browser) return;
        activeWindow = win;
        lastActiveWindowId = win.id;
        const el = document.getElementById("win" + win.id);

        // координаты мыши внутри окна
        offsetX = e.clientX - el.getBoundingClientRect().left;
        offsetY = e.clientY - el.getBoundingClientRect().top;

        el.style.zIndex = zIndexCounter++;

        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", stopDrag);
    }

    function drag(e) {
        if (!activeWindow) return;
        if (!browser) return;
        const el = document.getElementById("win" + activeWindow.id);

        let left = e.clientX - offsetX;
        let top = e.clientY - offsetY;

        // Ограничиваем границами layoutWidth
        left = Math.max(0, Math.min(left, window.innerWidth - el.offsetWidth));
        top = Math.max(0, Math.min(top, window.innerHeight - el.offsetHeight));

        el.style.left = left + "px";
        el.style.top = top + "px";
    }

	function stopDrag() {
		if (activeWindow) {
			const el = document.getElementById("win" + activeWindow.id);
		}
		activeWindow = null;
		document.removeEventListener("mousemove", drag);
		document.removeEventListener("mouseup", stopDrag);
	}


    // --------- RESIZE WINDOW SPLASH ---------

    function onResize() {
        isMobile = window.innerWidth <= 768;
        if (isMobile) return;
        if (!browser) return;
        const desktop = document.querySelector(".layout-content");
        if (!desktop) return;
        const desktopRect = desktop.getBoundingClientRect();

        scaleX = browser ? Math.min(window.innerWidth / baseWidth, 1) : 1; 
        scaleY = browser ? Math.min(window.innerHeight / baseHeight, 1) : 1; 
        leftOffset = browser ? window.innerWidth > baseWidth ? (window.innerWidth - baseWidth)/2 : 0 : 0;
        baseHeight = browser ? window.innerHeight : 1000;

        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeTimeout = null;
        }, 1200);

        windows.forEach(win => {
            const el = document.getElementById("win" + win.id);
            if (!el) return;

            const topPercent = parseFloat(win.top);
            const leftPercent = parseFloat(win.left);
            const widthPercent = parseFloat(win.width);
            const heightPercent = parseFloat(win.height);

            el.style.top = (topPercent / 100 * baseHeight) + "px";
            el.style.left = (leftOffset + leftPercent / 100 * baseWidth * scaleX) + "px";
            el.style.width = (widthPercent / 100 * baseWidth * scaleX) + "px";
            el.style.height = (heightPercent / 100 * baseHeight) + "px";
        });

        initWindows = windows.map(win => {
            const topPercent = parseFloat(win.top);    // 2
            const leftPercent = parseFloat(win.left);  // 30
            const widthPercent = parseFloat(win.width);
            const heightPercent = parseFloat(win.height);

            return {
                ...win,
                top: topPercent / 100 * baseHeight * scaleY + 'px',        // пропорционально baseWidth
                left: leftOffset + leftPercent / 100 * baseWidth * scaleX + 'px',
                width: widthPercent / 100 * baseWidth * scaleX + 'px',
                height: heightPercent / 100 * baseHeight * scaleY + 'px'
            };
        });
    }


    // --------- WINDOWS CLOSING / OPENING API ---------


    async function closeWindow(id) {
        if (id === 3) {
            openedWindows = openedWindows.filter(winId => winId !== 3);
            await new Promise(r => setTimeout(r, 200));
            openedWindows = openedWindows.filter(winId => winId !== 1);
            return
        } else if (id === 1) {
            openedWindows = openedWindows.filter(winId => winId !== 1);
            await new Promise(r => setTimeout(r, 200));
            openedWindows = openedWindows.filter(winId => winId !== 3);
            return
        }
        openedWindows = openedWindows.filter(winId => winId !== id);
    }

    async function openWindow(id) {
        if (id === 1) {
            openedWindows = [...openedWindows, 1];
            await new Promise(r => setTimeout(r, 50));
            openedWindows = [...openedWindows, 3];
            moveWindowOnTop(null, {id})
            return
        }
        openedWindows = [...openedWindows, id];
        moveWindowOnTop(null, {id})
    }

    if (browser) {
        window.addEventListener("resize", onResize);
    }

    // START ANIMATION
    async function openAllWindows(timeout = 100) {
        for await (let win of initWindows) {
            //if (win.id === 5) continue;
            await new Promise(resolve => setTimeout(resolve, timeout))
            openWindow(win.id)
        }
    }

    openAllWindows()


    // --------- GLOBAL FOR CONTENTS OF WINDOWS ---------

    let selectedProject = 'questbench';
    let projectNames = {
        questbench: "QuestBench",
        ovknative: "OpenVK Native"
    }

    const closeAllWindows = async (timeout = 100) => {
        await Promise.all(initWindows.map((win, i) =>
            new Promise(resolve => {
                setTimeout(async () => {
                    await closeWindow(win.id);
                    resolve();
                }, i * timeout);
            })
        ));
        await new Promise(resolve => setTimeout(resolve, 100))
        return;
    }

    const windowManipulate = {
        closeWindow, openWindow, closeAllWindows, openAllWindows
    }

</script>


<style>
#desktop {
	position: relative;
	width: 100%;
	height: 100vh;
	margin: 0 auto;
}

#desktop-mobile {
	position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
	width: 100%;
	min-height: 100vh;
	margin: 0 auto;
    z-index: 10
}

/* Поверхность окна */
.window:not(.mobile) {
	position: absolute;
	overflow: hidden;
	user-select: none;
}

.window-body {
    overflow-y: auto;
}

/* Тело окна в стиле Win7 */
.window .window-body {
	padding: 10px;
}

.resizing-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 10000;
}

.message {
    position: fixed;
    z-index: 10001;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 2em;
    text-align: center;
    font-weight: 800;
}

.arrow {
    position: fixed;
    width: 75px;
    aspect-ratio: 1/1;
    filter: invert(100%)
}

.arrow.top {
    top: 90px;
    left: 90px;
    transform: rotate(0deg);
}

.arrow.bottom {
    bottom: 90px;
    right: 90px;
    transform: rotate(180deg);
}

.resizing-content {
    width: calc(100% - 100px);
    height: calc(100% - 100px);
    position: fixed;
    top: 50px;
    left: 50px;
    border: white 20px dashed;
}

.desktop-icons {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 4;
    display: flex;
    flex-direction: column;
    padding: 20px;
}

.desktop-icon {
    user-select: none;
    margin: 2px;
    padding: 10px;
    width: 120px;
    cursor: pointer;
    outline-color: #377ac78e;
    transition: 0.05s;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.desktop-icon.active {
    --w7-bg: #4580c459;
    --w7-grad: linear-gradient(to right, #ffffff66, #0000001a, #ffffff33), var(--w7-bg);
    background: linear-gradient(transparent 20%, #ffffff5b 40%, transparent 41%), var(--w7-grad);
    background-color: var(--w7-bg);
    outline: #377ac78e 2px solid;
    transition: 0.05s;
}

.desktop-icon img {
    margin: 10px;
    display: block;
    width: 80px;
    aspect-ratio: 1/1;
}

img         { opacity: 1; transition: all .2s; }
img.hideimg { opacity: 0; transition: all .2s; }

.desktop-icon .text {
    color: #fff;
    display: block;
    width: 100%;
    text-align: center;
    --spread: 4px;
    text-shadow:
        1px 1px var(--spread) #000,
        1px 1px var(--spread) #000,
        1px 1px var(--spread) #000,
        1px 1px var(--spread) #000;
}


</style>

{#if resizeTimeout}
<div class="resizing-overlay" transition:fade={{duration: 100}}>
    <div class="resizing-content">
        <img src="/corner-arrow.svg" class="arrow top">
        <img src="/corner-arrow.svg" class="arrow bottom">
        <div class="message">
            <p>Размер окна браузера изменён. Окошки на странице сброшены</p>
        </div>
    </div>
</div>
{/if}

{#if isMobile}
<div id="desktop-mobile">
	{#each windows as win}
		<div
			class="window glass mobile"
			id={"win" + win.id}
			style=""
            in:fadeZoom={{duration: 200, direction: 'in'}}
		>
			<div class="title-bar">
				<div class="title-bar-text">{win.title}</div>
			</div>
			<div class="window-body" style="height: calc(100% - 35px);">
                <WindowContents id={win.id} {isMobile} bind:selectedProject></WindowContents>
			</div>
		</div>
	{/each}
</div>
{:else if t('language') != 'language'}

<div class="desktop-icons" in:slide={{duration: 300}}>
    {#each desktopIcons as icon}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="desktop-icon" class:active={activeIcon == icon.id} role="menu" tabindex={icon.id + 10} on:dblclick={() => openWindow(icon.id)} on:click={() => activeIcon = icon.id}>
            <img src={icon.icon} alt={icon.title} class="desktop-icon-image hideimg" on:load={(e) => e?.target?.classList ? e?.target?.classList.remove('hideimg') : ""}>
            <span class="text">{t(`win.${icon.id}`)}</span>
        </div>
    {/each}
</div>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="desktop" on:click={() => activeIcon = null}>
	{#each initWindows as win}
        {#if openedWindows.includes(win.id)}
		<!-- svelte-ignore a11y-interactive-supports-focus -->
		<div
			class="window glass"
			id={"win" + win.id}
            class:active={lastActiveWindowId === win.id}
			style="
				top: {win.top};
				left: {win.left};
				width: {win.width};
				height: {win.height};
                z-index: 10;
			"
            out:fadeZoom={{duration: 200, direction: 'out'}}
            in:fadeZoom={{duration: 200, direction: 'in'}}
            on:mousedown={(e) => moveWindowOnTop(e, win)}
            role="toolbar"
		>
			<div class="title-bar" on:mousedown={(e) => startDrag(e, win)} role="toolbar" tabindex={win.id} aria-roledescription="Draggable Window">
                {#if win.id === 3}
                    <div class="title-bar-text">{t('projects.win_prefix', projectNames[selectedProject] || t('projects.unknown_project'))}</div>
                    <div class="title-bar-controls">
                        <button aria-label="Close" on:click={() => closeWindow(win.id)}></button>
                    </div>
                {:else}
				    <div class="title-bar-text">{t(`win.${win.id}`)}</div>
                    <div class="title-bar-controls">
                        <button aria-label="Close" on:click={() => closeWindow(win.id)}></button>
                    </div>
                {/if}
			</div>
			<div class="window-body has-scrollbar" style="height: calc(100% - 35px); padding: 0;">
				<WindowContents id={win.id} {isMobile} bind:selectedProject {windowManipulate}></WindowContents>
			</div>
		</div>
        {/if}
	{/each}

</div>
{/if}