<template>
    <div class="content-body manage">
        <div class="container">
            <Notification v-if="notification"
                          class="notification notification--format">
                <template #notification>
                    <p>Only audio files</p>
                </template>
            </Notification>
            <ContentHeader class="manage__header">
                <template #content-header>
                    <h1 class="manage__title">Drag & Drop files here to upload</h1>
                </template>
            </ContentHeader>
            <UploadApp ref="upload"
                       :addSong="addSong"
                       @showNotification="showNotification"/>
            <div class="manage__main">
                <Loader v-if="loading"/>
                <ul class="songs-list">
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
</template>

<script>
    import useUserStore from "../stores/user";
    import UploadApp from "../components/UploadApp.vue";
    import {auth, songsCollection} from "../includes/firebase.js";
    import Item from "../components/Item.vue";
    import ContentHeader from "../components/ContentHeader.vue";
    import Loader from "../components/Loader.vue";
    import Notification from "../components/Notification.vue";

    export default {
        name: "Manage",
        components: {Notification, Loader, ContentHeader, Item, UploadApp},
        data() {
            return {
                loading: true,
                showForm: true,
                songs: [],
                leaveFlag: false,
                notification: false,
                user: '',
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
            },
            showNotification() {
                this.notification = true;
                setTimeout(() => {
                    this.notification = false;
                }, 3000);
            }
        }
    }
</script>
