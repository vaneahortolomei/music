<template>
    <li class="song-item clickable">
        <div class="song-item__head">
            <router-link class="song-item__link clickable__button" :to="{name: 'song', params: {id: song.docID}}">
                {{song.modified_name}}
            </router-link>
            <p class="song-item__genre">{{song.genre}}</p>
        </div>
        <div class="song-item__arrow"/>
    </li>
</template>

<script>
    export default {
        name: "Item",
        props: {
            song: {
                type: Object,
                required: true,
            },
        }
    }
</script>
