<div class="mb-3 mobiles">
<div>
    <div>
    <h1><a href="http://qb.zazios.ru/">Questbench</a></h1>
    The project is under active development.<br>
    The idea is to rethink the well-known in Russia service, <a href="https://ficbook.net/">ficbook.net</a> but with the ability to create fully interactive stories<br>
    Currently available old, buggy version - 0.1.0
    </div>
</div>
<div>
    <img src="/qb.png" alt="qblogo">
</div>
</div>
<div class="mb-3 mobiles">
    <div>
        <div>
        <h1><a href="https://github.com/ZAZiOs/MediaHoster">MediaHoster</a></h1>
        Simple and convenient media hosting site (for pictures, videos and GIFs) with <a href="https://github.com/ZAZiOs/MediaHoster">open source code</a><br>
        You can find an active instance, not administered by me, at <a href="http://piss.sdzk.xyz/">piss.sdzk.xyz</a>.<br>
        <small>Access password: <code><mc>blackniggersex<mc></code></small>
        </div>
    </div>
    <div>
        <img src="/mh.jpg" alt="mediahoster">
    </div>
</div>

<svelte:head>
<title>ZAZiOs</title>
<meta name="title" content="ZAZiOs">
<meta name="description" content="Hi, I'm just a guy, who makes many things.">
<meta property="og:title" content="ZAZiOs">
<meta property="og:description" content="Hi, I'm just a guy, who makes many things.">
<meta property="twitter:title" content="ZAZiOs">
<meta property="twitter:description" content="Hi, I'm just a guy, who makes many things.">
</svelte:head>

<style>
    img {
        width: 250px;
        margin-left: 20px;
    }
    .mobiles {
        display: flex;
    }
    @media (max-width: 768px) {
        .mobiles {
            flex-direction: column-reverse;
        }
        img {
            border-top: white 4px solid;
            padding-top: 1.3rem;
            margin-bottom: .5rem;
            margin-left: 0;
            width: 100%;
        }
    }
</style>