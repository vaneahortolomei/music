<template>
    <div class="music-page">
        <div class="music-page__header">
            <div class="container">
                <h1>Listen the music!</h1>
                <p>Working voltage: the working voltage of the electromagnetic buzzer can be 1.5-24 V, and the working
                    voltage range of the piezoelectric buzzer can be 3v-220v. However, under normal circumstances, the
                    working voltage range of the piezoelectric buzzer is recommended to be above 9V to obtain a larger
                    sound</p>
            </div>
        </div>
        <div class="music-page__main">
            <div class="container">
                <div v-if="loading" class="loader-default" style="margin-top: 20px">
                    <div class="loader-default--spinner"></div>
                </div>
                <div class="music-page__box">
                    <header>
                        <h2>Songs</h2>
                    </header>
                    <ul class="music-list">
                        <Item v-for="song in songs"
                              :key="song.docID"
                              :song="song"
                        />
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Item from "../components/Main/Item.vue";
    import {songsCollection} from "../includes/firebase.js";

    export default {
        name: "Home",
        components: {Item},
        data() {
            return {
                loading: false,
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
<style scoped>
    .music-page__header {
        background-color: #f5b5bf;
        padding: 30px 0;
    }

    .music-page__header h1, p {
        margin: 0
    }

    .music-page__box {
        background: #fff;
        box-shadow: 0 15px 30px rgb(31 51 136 / 15%);
        border: 1px solid #dbe1e9;
        border-radius: 5px;
        margin: 20px 0;
    }

    .music-item__head {
        text-align: left;
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    li {
        padding: 15px;
        display: flex;
        justify-content: space-between;
    }

    li:hover {
        background-color: #8080800f;
        cursor: pointer;
    }

    .loader-default {
        width: 100%;
        height: 100%;
        opacity: 1;
        z-index: 11;
        background: white;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 10px;
        transition: opacity .5s;
    }

    .loader-default--spinner {
        display: inline-block;
        width: 100px;
        height: 100px;
        border: 15px solid #a39fa16e;
        border-radius: 50%;
        border-top-color: #fff;
        border-bottom-color: #fff;
        animation: spin 1s ease-in-out infinite;
        -webkit-animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }

    @-webkit-keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }
</style>
