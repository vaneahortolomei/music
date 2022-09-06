<template>
    <li class="music-item">
        <div class="music-item__head">
            <router-link :to="{name: 'song', params: {id: song.docID}}">
                <strong>{{song.modified_name}}</strong>
            </router-link>
            <p>{{song.name}}</p>
        </div>
        <div class="music-item__count">
            <span>Comments: {{song.comment_count}}</span>
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
