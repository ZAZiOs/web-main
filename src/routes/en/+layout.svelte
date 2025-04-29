<script>
import { page } from '$app/stores';
import getLink from '$lib/links'
import { onMount } from 'svelte';

let timeSets = {
    timeZone: 'Europe/Moscow',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
}

let time = new Date().toLocaleTimeString('en-EN', timeSets);

onMount(() => {
	const interval = setInterval(() => {
		time = new Date().toLocaleTimeString('en-EN', timeSets);
	}, 1000);

	return () => {
		clearInterval(interval);
	};
});
</script>

<div class="top px-4 py-2 d-flex">
	<div>
	{@html getLink()}
	</div>
	<div class="d-flex">
	<div class="time pe-2">My time rn is { time }</div>
	<a class="lang ps-2 text-warning" href="/">To Russian</a>
	</div>
	</div>
		<header class="container w-100">
			<img src="/bc-header.png" alt="headerimage" class="header-img"/>
			<ul class="px-5 pt-2 nav nav-tabs rounded-top">
			<li class="nav-item">
				<a class="nav-link" class:active={$page.url.pathname === '/en' ? 'page' : undefined} href="/en">About me</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" class:active={$page.url.pathname === '/en/projects' ? 'page' : undefined}  href="/en/projects">My projects</a>
			</li>
			</ul>
		</header>
		<main class="container pb-5">
			<div class="p-3 main rounded-bottom">
				<slot />
			</div>
		</main>