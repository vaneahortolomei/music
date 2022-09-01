<template>
    <div class="container">
        <div class="manage">
            <UploadApp ref="upload" :addSong="addSong"/>
            <div class="manage__container">
                <header class="manage__container-title">
                    <strong>My Songs</strong>
                </header>
                <div class="manage-container__box">
                    <div v-if="loading" class="loader-default">
                        <div class="loader-default--spinner"></div>
                    </div>
                    <ul>
                        <Item v-for="(song, i) in songs"
                              :key="song.docID"
                              :song="song"
                              :updateTheSong="updateTheSong"
                              :removeSong="removeSong"
                              :unsavedFlag="unsavedFlag"
                              :index="i"/>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import useUserStore from "../stores/user";
    import UploadApp from "../components/UploadApp.vue";
    import {storage, auth, songsCollection} from "../includes/firebase.js";
    import Item from "../components/Item.vue";

    export default {
        name: "Manage",
        components: {Item, UploadApp},
        data() {
            return {
                loading: true,
                showForm: false,
                songs: [],
                leaveFlag: false,
            }
        },
        async created() {
            const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get();
            snapshot.forEach(this.addSong);

            this.loading = false;
        },
        beforeRouteLeave(to, from, next) {
            if (!this.leaveFlag) {
                next();
            } else {
                const leave = confirm('Do u really want to leave this page?');
                next(leave);
            }
        },
        beforeRouteEnter(to, from, next) {
            const store = useUserStore();
            if (store.isLogged) {
                next();
            } else {
                next({name: 'notFoundPage'})
            }
        },
        methods: {
            updateTheSong(i, val) {
                this.songs[i].modified_name = val.modified_name;
                this.songs[i].genre = val.genre;
            },
            removeSong(i) {
                return this.songs.splice(i, 1);
            },
            unsavedFlag(val) {
                this.leaveFlag = val;
            },
            addSong(document) {
                this.song = {
                    ...document.data(),
                    docID: document.id,
                };
                this.songs.push(this.song);
            }
        }
    }
</script>
<style>
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    .error-active {
        color: red;
    }

    .manage {
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: auto;
        column-gap: 15px;
        margin-top: 20px;
    }

    .manage__container {
        background: #fff;
        box-shadow: 0 15px 30px rgb(31 51 136 / 15%);
        border: 1px solid #dbe1e9;
        border-radius: 15px;
    }

    .manage__container-title {
        padding: 20px;
    }

    .manage-container__box {
        border-top: 1px solid #dbe1e9;
        padding: 20px;
    }

    .manage-container__box fieldset {
        border: none;
        border-radius: 15px;
        padding: 15px;
    }

    .upload-box {
        display: grid;
        border: 1px dashed #dbe1e9;
        border-radius: 10px;
        height: 200px;
        background-color: #fff;
        transition: background-color 0.2s ease;
        color: #9c9ea0;
    }

    .upload-active {
        background-color: green;
        color: #fff;
    }

    .upload-box p {
        align-self: center;
        margin: 0;
    }

    .manage-container__list {
        margin: 20px 0 0 0;
        padding: 20px 0 0 0;
        text-align: left;
        border-top: 1px solid #dbe1e9;
    }

    .upload-list {
        list-style-type: none;
    }

    .upload-list__item +
    .upload-list__item {
        margin-top: 20px;
    }

    .song-list {
        list-style-type: none;
    }

    .song-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .song-item__title {
        margin: 0;
    }

    .song-item .button + .button {
        margin-left: 10px;
    }

    .button--delete {
        background-color: #f54a4a;
        color: #fff;
        border: none;
    }

    .progress-bar__line {
        display: flex;
        background-color: gray;
        height: 15px;
        margin: 0;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
    }

    .progress-bar__line + .progress-bar__line {
        margin-top: 20px;
    }

    .progress-bar__inside {
        display: flex;
        height: 100%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        transition: width 0.2s ease;
    }

    .progress-bar__title {
        margin-bottom: 2px;
    }

    .progress-bar__percentage {
        position: absolute;
        left: 50%;
        font-size: 11px;
        top: 7px;
        transform: translate(-50%, -50%);
        color: #fff;
    }

    .progress-bar__title, .progress-bar__percentage {
        text-align: left;
        display: inherit;
    }

    .item {
        border: 1px dashed #dbe1e9;
        border-radius: 20px;
        padding: 15px;
    }

    .item + .item {
        margin-top: 20px;
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

    .status {
        padding: 20px;
        text-align: center;
        font-weight: bold;
        color: #fff;
        margin-bottom: 15px;
    }

    .status--pending {
        background-color: #1e90ff;
    }

    .status--error {
        background-color: #ff444b;
    }

    .status--success {
        background-color: rgba(46, 255, 172, 0.7);
    }
</style>
