<script>
import random from '$lib/random.json'

function getPhrase() {
	let index = Math.floor(Math.random() * random.en.length)
	return random.en[index]
}
</script>

<svelte:head>
<title>ZAZiOs</title>
<meta name="title" content="ZAZiOs">
<meta name="description" content="Hi, I'm just a guy, who makes many things.">
<meta property="og:title" content="ZAZiOs">
<meta property="og:description" content="Hi, I'm just a guy, who makes many things.">
<meta property="twitter:title" content="ZAZiOs">
<meta property="twitter:description" content="Hi, I'm just a guy, who makes many things.">
</svelte:head>

<div class="flexed">
<div>
	<h1>Hi! I'm Daniel</h1>
	<phrase>{@html getPhrase()}</phrase>
	<p>I'm just a guy from Rostov, which at some point decided to try himself in everything... and now I know how to do a lot of things, but in fact I do everything in questionable quality xd</p>
	List of my hobbies:
	<ol>
		<li>Development of web projects</li>
		<li>Creating videos on Youtube (RU)</li>
		<li>Dubbings</li>
		<li>Writing music</li>
	</ol>
</div>
<div class="right-column">
	<img src="/bc-pfpic.png" class="img-fluid" alt="Аватар">
</div>
</div>

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