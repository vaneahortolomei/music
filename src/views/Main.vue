<template>
    <main class="main-page">
        <div class="container">
            <div class="main-page__body">
                <Loader v-if="loading"/>
                <ul class="songs-list">
                    <Item v-for="song in songs"
                          :key="song.docID"
                          :song="song"
                    />
                </ul>
            </div>
        </div>
    </main>
</template>

<script>
    import Item from "../components/Main/Item.vue";
    import {songsCollection} from "../includes/firebase.js";
    import ContentHeader from "../components/ContentHeader.vue";
    import Loader from "../components/Loader.vue";

    export default {
        name: "Home",
        components: {Loader, ContentHeader, Item},
        data() {
            return {
                loading: true,
                songs: [],
            }
        },
        async created() {
            const snapshot = await songsCollection.get();

            snapshot.forEach((document) => {
                const song = {
                    ...document.data(),
                    docID: document.id,
                };
                this.songs.push(song);
            });

            this.loading = false;
        },
    }
</script>
