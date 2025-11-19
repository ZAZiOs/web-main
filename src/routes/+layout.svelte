<script>
	import Wallpapers from "$lib/wallpapers.svelte";
	import { browser } from "$app/environment";

	import { page } from "$app/stores";

	let isMobile = false;

	if (browser) {
		isMobile = window.innerWidth <= 768;
	}
</script>

<!-- Фон всегда за контентом -->

{#if $page.url.pathname === '/projects'}
	<slot></slot>
{:else}
<div class="layout-root">
	<Wallpapers />

	<!-- Контент поверх фона -->
	<div class="layout-content">
		<slot {isMobile} />
	</div>
</div>
{/if}

<style>
	.layout-root {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	/* Wallpapers сам ставит fixed, z-index: 0 */
	.layout-content {
		position: relative;
		z-index: 5; /* контент поверх */
	}
</style>
