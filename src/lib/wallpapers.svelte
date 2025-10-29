<script>
    import { fade } from "svelte/transition"
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";
    let wp_template = "/wp/win7-%s.jpg"
    let wp_count = 6;
    let change_time = 1000 // ms
    let current_wp = ""
    let next_wp = ""

    let timeoutID = 0;
    let intervalID = 0;

    let wallpapers = [
      {link: "/wp/win7-1.jpg", color: "#7f45c4"},
      {link: "/wp/win7-2.jpg", color: "#58c1d5"},
      {link: "/wp/win7-3.jpg", color: "#4580c4"},
      {link: "/wp/win7-4.jpg", color: "#bb544bc4"},
      {link: "/wp/win7-5.jpg", color: "#2ea778"},
      {link: "/wp/win7-6.jpg", color: "#c44553"}
    ]

    let isTransitioning = false;
    function getWallpaperIndex() {
        const now = new Date();
        const minutes = now.getMinutes(); // 0-59
        return Math.floor(minutes / 1) % wp_count; // меняем каждую минуту
    }

    function changeWP() {
        if (!browser) return
        const newIndex = getWallpaperIndex();
        const newWP = wallpapers[newIndex].link;
        if (newWP !== current_wp) {
            next_wp = newWP;
            isTransitioning = true;
            setTimeout(() => {
                current_wp = next_wp;
                next_wp = "";
                isTransitioning = false;
            }, change_time);
        }
        document.documentElement.style.setProperty('--w7-w-bg', wallpapers[newIndex].color);
    }

    function getTimeUntilNextMinute() {
        const now = new Date();
        const secondsUntilNextMinute = 60 - now.getSeconds();
        return secondsUntilNextMinute * 1000; // в миллисекундах
    }

    function initTimers() {
        // Устанавливаем начальную обоину
        let wp = wallpapers[getWallpaperIndex()]
        current_wp = wp.link;
        document.documentElement.style.setProperty('--w7-w-bg', wp.color);
        // Запускаем первый таймаут на начало следующей минуты
        timeoutID = setTimeout(() => {
            changeWP(); // Сразу меняем на следующую минуту
            
            // Затем запускаем интервал каждую минуту
            intervalID = setInterval(changeWP, 60000);
        }, getTimeUntilNextMinute());
    }

    onMount(() => {
        initTimers();
        
        // Также обновляем при возвращении на вкладку
        document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            // Перезапускаем таймеры при возвращении
            if (timeoutID) clearTimeout(timeoutID);
            if (intervalID) clearInterval(intervalID);
            initTimers();
        }
        });
    });

    onDestroy(() => {
        if (browser) {
            if (timeoutID) clearTimeout(timeoutID);
            if (intervalID) clearInterval(intervalID);
            document.removeEventListener('visibilitychange', initTimers);
        }
    });

</script>


<style>
  :global(.window) {
    transition: background-color 1s linear;
  }
  .wallpaper-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    overflow: hidden;
  }
  
  .wallpaper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  
  .current {
    z-index: 1;
  }
  
  .next {
    z-index: 2;
  }
</style>

<div class="wallpaper-container">
  {#if current_wp}
    <div 
      class="wallpaper current"
      style="background-image: url('{current_wp}')"
      in:fade={{ duration: 1000 }}
    ></div>
  {/if}
  
  {#if isTransitioning && next_wp}
    <div 
      class="wallpaper next"
      style="background-image: url('{next_wp}')"
      in:fade={{ duration: 1000 }}
    ></div>
  {/if}
</div>