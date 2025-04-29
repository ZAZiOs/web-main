<script>
import random from '$lib/random.json'
import Layout from '$lib/ru-lyt.svelte'

function getPhrase() {
	let index = Math.floor(Math.random() * random.ru.length)
	return random.ru[index]
}

</script>

<svelte:head>
<title>ZAZiOs</title>
<meta name="title" content="ZAZiOs">
<meta name="description" content="Привет, я просто парень что делает разные штуки.">
<meta property="og:title" content="ZAZiOs">
<meta property="og:description" content="Привет, я просто парень что делает разные штуки.">
<meta property="twitter:title" content="ZAZiOs">
<meta property="twitter:description" content="Привет, я просто парень что делает разные штуки.">
</svelte:head>

<Layout> 
<div class="flexed">
<div>
	<h1><span style="padding-right: 15px;">Меня зовут Зазя</span><i style="font-size: 15px;">Или Даня, как хотите))</i></h1>
	<phrase>{@html getPhrase()}</phrase>
	<p>Я просто парень из Ростова, что в какой-то момент решил пробовать себя во всём... и теперь знаю как делать много чего, но по факту делаю всё сомнительного качества)</p>
	Список моих увлечений:
	<ol>
		<li>Разработка сайтов и веб-проектов</li>
		<li>Создание видосов на Youtube</li>
		<li>Запись озвучек</li>
		<li>Написание музыки</li>
	</ol>
</div>
<div class="right-column">
	<img src="/bc-pfpic.png" class="img-fluid" alt="Аватар">
</div>
</div>
</Layout>

<style>
	.right-column {
		margin-left: 30px;
		min-width: 25%
	}
	.flexed {
		display: flex;
	}
	@media (max-width: 768px){
	.flexed {
		flex-direction: column-reverse;
	}
	.right-column {
		margin-left: 0px;
		min-width: 100%
	}
	}
</style>