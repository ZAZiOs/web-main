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

let time = new Date().toLocaleTimeString('ru-RU', timeSets);

onMount(() => {
	const interval = setInterval(() => {
		time = new Date().toLocaleTimeString('ru-RU', timeSets);
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
<div class="time pe-2">У меня сейчас { time }</div>
<a class="lang ps-2 text-danger" href="/en">Switch to EN</a>
</div>
</div>

<header class="container w-100">
	<img src="/bc-header.png" alt="headerimage" class="header-img"/>
	<ul class="px-5 pt-2 nav nav-tabs rounded-top">
	<li class="nav-item">
		<a class="nav-link" class:active={$page.url.pathname === '/' ? 'page' : undefined} href="/">Обо мне</a>
	</li>
	<li class="nav-item">
		<a class="nav-link" class:active={$page.url.pathname === '/projects' ? 'page' : undefined}  href="/projects">Мои проекты</a>
	</li>
	</ul>
</header>
<main class="container">
	<div class="p-3 main rounded-bottom">
		<slot />
	</div>
</main>