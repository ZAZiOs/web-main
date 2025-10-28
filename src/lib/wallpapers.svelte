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

    let isTransitioning = false;
    function getWallpaperIndex() {
        const now = new Date();
        const minutes = now.getMinutes(); // 0-59
        return Math.floor(minutes / 1) % wp_count; // меняем каждую минуту
    }

    function changeWP() {
        const newIndex = getWallpaperIndex();
        const newWP = wp_template.replace("%s", String(newIndex + 1));
        if (newWP !== current_wp) {
            next_wp = newWP;
            isTransitioning = true;
            setTimeout(() => {
                current_wp = next_wp;
                next_wp = "";
                isTransitioning = false;
            }, change_time);
        }
    }

    function getTimeUntilNextMinute() {
        const now = new Date();
        const secondsUntilNextMinute = 60 - now.getSeconds();
        return secondsUntilNextMinute * 1000; // в миллисекундах
    }

    function initTimers() {
        // Устанавливаем начальную обоину
        current_wp = wp_template.replace("%s", String(getWallpaperIndex() + 1));
        
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