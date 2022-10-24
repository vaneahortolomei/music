<template>
    <div class="container">
        <div class="not-found">
            <div class="not-found__container">
                <div class="not-found__img">
                    <picture>
                        <source srcset="/src/img/404/404-page.webp" type="image/webp">
                        <img decoding="sync" src="/src/img/404/404-page.png" alt="404">
                    </picture>
                </div>
                <div class="not-found__text">
                    <h1 class="not-found__title">Looking for something?</h1>
                    <p class="not-found__subtitle">Sorry, We can’t find this page...</p>
                    <router-link class="not-found__link button button--second" :to="{name: 'main'}">Home</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "404"
    }
</script>
