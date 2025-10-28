<script>
    import { browser } from "$app/environment";
    import WindowContents from "$lib/window-contents.svelte";
    import {fade} from "svelte/transition";
    let isMobile = false;
    if (browser) isMobile = window.innerWidth <= 768;

    let resizeTimeout = null;

	const windows = [
		{ id: 1, title: "Мои проекты", top: "2%", left: 0, width: "29%", height: "47%" },
		{ id: 2, title: "Обо мне", top: "2%", left: "30%", width: "70%", height: "47%" },
		{ id: 3, title: "*Выбранный проект*", top: "50%", left: 0, width: "69%", height: "47%" },
		{ id: 4, title: "Мои контакты", top: "50%", left: "70%", width: "30%", height: "47%" },
	];

	let activeWindow = null;
	let offsetX = 0;
	let offsetY = 0;

	function startDrag(e, win) {
        activeWindow = win;
        const el = document.getElementById("win" + win.id);
        const desktop = document.getElementById("desktop");
        const desktopRect = desktop.getBoundingClientRect();

        const rect = el.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        el.style.zIndex = 10;
        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", stopDrag);

        // сохраняем координаты контейнера
        activeWindow.desktopRect = desktopRect;
    }

    function drag(e) {
        if (!activeWindow) return;
        const el = document.getElementById("win" + activeWindow.id);
        const desktopRect = activeWindow.desktopRect;

        let left = e.clientX - desktopRect.left - offsetX;
        let top = e.clientY - desktopRect.top - offsetY;

        // Ограничиваем перемещение границами контейнера
        left = Math.max(0, Math.min(left, desktopRect.width - el.offsetWidth));
        top = Math.max(0, Math.min(top, desktopRect.height - el.offsetHeight));

        el.style.left = left + "px";
        el.style.top = top + "px";
        el.style.right = "auto";
        el.style.bottom = "auto";
    }

	function stopDrag() {
		if (activeWindow) {
			const el = document.getElementById("win" + activeWindow.id);
			el.style.zIndex = 1;
		}
		activeWindow = null;
		document.removeEventListener("mousemove", drag);
		document.removeEventListener("mouseup", stopDrag);
	}

    function onResize() {
        isMobile = window.innerWidth <= 768;
        if (isMobile) return;
        const desktop = document.getElementById("desktop");
        if (!desktop) return;
        const desktopRect = desktop.getBoundingClientRect();

        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeTimeout = null;
        }, 1000);

        windows.forEach(win => {
            const el = document.getElementById("win" + win.id);
            if (!el) return;

            // Получаем текущие координаты относительно контейнера
            let left = parseFloat(el.style.left || 0);
            let top = parseFloat(el.style.top || 0);

            // Ограничиваем границами
            left = Math.min(left, desktopRect.width - el.offsetWidth);
            top = Math.min(top, desktopRect.height - el.offsetHeight);

            el.style.left = win.left
            el.style.top = win.top
        });
    }

    if (browser) {
        window.addEventListener("resize", onResize);
    }

</script>


<style>
#desktop {
	position: relative;
	width: 100%;
	max-width: 1000px;
	height: 100vh;
	margin: 0 auto;
}

#desktop-mobile {
	position: relative;
    display: flex;
	width: 100%;
	max-width: 1000px;
	height: 100vh;
	margin: 0 auto;
}

/* Поверхность окна */
.window {
	position: absolute;
	overflow: hidden;
	user-select: none;
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
    background: rgba(0, 0, 0, 0.5);
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
</style>

{#if resizeTimeout}
<div class="resizing-overlay" transition:fade={{duration: 100}}>
    <div class="resizing-content">
        <img src="/corner-arrow.svg" class="arrow top">
        <img src="/corner-arrow.svg" class="arrow bottom">
        <div class="message">
            <p>Размер окна изменён, окна сброшены.</p>
        </div>
    </div>

</div>
{/if}

{#if isMobile}
    <div id="desktop-mobile">
	{#each windows as win}
		<div
			class="window glass"
			id={"win" + win.id}
			style="
                width: 90%;
                height: fit-content;
			"
		>
			<div class="title-bar" on:mousedown={(e) => startDrag(e, win)}>
				<div class="title-bar-text">{win.title}</div>
			</div>
			<div class="window-body" style="height: calc(100% - 35px);">
                <WindowContents id={win.id} {isMobile}></WindowContents>
			</div>
		</div>
	{/each}
</div>
{:else}
<div id="desktop">
	{#each windows as win}
		<div
			class="window glass"
			id={"win" + win.id}
			style="
				top: {win.top};
				left: {win.left};
				width: {win.width};
				height: {win.height};
			"
		>
			<div class="title-bar" on:mousedown={(e) => startDrag(e, win)}>
				<div class="title-bar-text">{win.title}</div>
			</div>
			<div class="window-body" style="height: calc(100% - 35px);">
				<WindowContents id={win.id} {isMobile}></WindowContents>
			</div>
		</div>
	{/each}
</div>
{/if}