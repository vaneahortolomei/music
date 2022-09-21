<template>
    <div class="main-page">
        <ContentHeader class="main-page__header">
            <template #content-header>
                <div class="content-header__head">
                    <svg width="25" height="25" class="content-header__icon">
                        <use xlink:href="/src/img/sprite.svg#music"/>
                    </svg>
                    <h2 class="content-header__title">SongsList</h2>
                </div>
            </template>
        </ContentHeader>
        <div class="content-body main-page__body">
            <Loader v-if="loading"/>
            <div class="">
                <ul class="songs-list">
                    <Item v-for="song in songs"
                          :key="song.docID"
                          :song="song"
                    />
                </ul>
            </div>
        </div>
    </div>
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
