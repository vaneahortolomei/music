<template>
    <li class="song-item">
        <div class="song-item__head">
            <router-link class="song-item__link" :to="{name: 'song', params: {id: song.docID}}">
                <strong>{{song.modified_name}}</strong>
            </router-link>
            <p class="song-item__genre">{{song.genre}}</p>
        </div>
        <div class="song-item__count">
            <span>
                Comments: {{song.comment_count}}
            </span>
        </div>
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
