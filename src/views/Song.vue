<template>
    <div class="song-page">
        <ContentHeader class="song-page__header">
            <template #content-header>
                <div class="song-page__control">
                    <button type="button" class="music-page__button player-control player-control--header"
                            @click.prevent="newSong(song)">
                        <span class="player-control__icon"
                              :class="{'player-control__icon--play' : !playing,
                              'player-control__icon--paused' : playing }"
                        />
                    </button>
                </div>
                <div class="song-page__desc">
                    <h1>{{song.modified_name}}</h1>
                    <p>{{song.genre}}</p>
                </div>
            </template>
        </ContentHeader>
        <div class="content-body comment">
            <ul class="comment__list">
                <Notification
                    v-if="showAlert"
                    :class="messageBg">
                    <template #notification>
                        {{showMessage}}
                    </template>
                </Notification>
                <li class="comment__item" v-for="comment in comments" :key="comment.docID">
                    <figure class="comment__avatar">
<!--                        <img src="#" alt="avatar" class="comment__img"/>-->
                    </figure>
                    <div class="comment__wrap">
                        <strong class="comment__name">User</strong>
                        <time datetime="" class="comment__time">
                            <b>{{comment.date}}</b>
                        </time>
                    </div>
                    <p class="comment__message">{{comment.content.message}}</p>
                </li>
            </ul>
<!--            <p class="comment__count">comments: {{song.comment_count}}</p>-->
            <div class="comment__form" v-if="this.isLogged">
                <figure class="comment__avatar comment__avatar--form">
<!--                    <img src="#" alt="avatar" class="comment__img"/>-->
                </figure>
                <Form @submit="submitMessage" :validation-schema="messageSchema" class="form">
                    <Field as="textarea" name="message" id="text" class="form__input"
                           placeholder="Reply" rows="15"/>
                    <div class="comment__form-footer">
                        <ErrorMessage ref="error" class="form__error error-active" name="message"/>
                        <button class="button button--main">Submit</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
    import useUserStore from "../stores/user";
    import usePlayerStore from "../stores/player"
    import {mapActions, mapWritableState, mapState} from "pinia";
    import {auth, songsCollection, commentsCollection, usersCollection} from "../includes/firebase.js";
    import ContentHeader from "../components/ContentHeader.vue";
    import Notification from "../components/Notification.vue";

    export default {
        name: "Song",
        components: {Notification, ContentHeader},
        data() {
            return {
                song: '',
                showAlert: false,
                messageBg: 'notification--process',
                showMessage: 'Process!',
                messageSchema: {
                    message: 'required|min:3|max:200'
                },
                comments: [],
                commentDate: new Date(),
            }
        },
        async created() {
            const snapshot = await songsCollection.doc(this.$route.params.id).get();
            if (!snapshot.exists) {
                await this.$router.push({
                    name: 'main'
                });
                return;
            }

            this.song = snapshot.data();
            this.getComments();
        },
        computed: {
            ...mapWritableState(useUserStore, ['isLogged']),
            ...mapState(usePlayerStore, {
                playing: 'playing',
            })
        },
        methods: {
            ...mapActions(usePlayerStore, ['newSong']),
            async submitMessage(val) {
                this.showAlert = true;
                this.showMessage = 'Process!';
                this.messageBg = 'notification--process';

                try {
                    console.log(auth.currentUser);
                    const comment = {
                        user: auth.currentUser.displayName,
                        date: this.formatData(this.commentDate).toString(),
                        content: val,
                        uid: auth.currentUser.uid,
                        sid: this.$route.params.id
                    };

                    await commentsCollection.add(comment);

                    this.song.comment_count += 1;
                    await songsCollection.doc(this.$route.params.id).update({
                        comment_count: this.song.comment_count,
                    });
                    this.getComments();


                } catch (e) {
                    if (e) {
                        this.showAlert = true;
                        this.messageBg = 'notification--error';
                        this.showMessage = 'Something wrong! Try again please!';
                    }
                }

                this.showAlert = true;
                this.messageBg = 'notification--success';
                this.showMessage = 'Comment added';

                this.hideAlert();
            },
            async getComments() {
                const snapshot = await commentsCollection.where('sid', '==', this.$route.params.id).get();
                this.comments = [];

                snapshot.forEach(document => {
                    this.comments.push({
                        ...document.data(),
                        docID: document.id,
                    });
                });
            },
            hideAlert() {
                setTimeout(() => {
                    this.showAlert = false;
                }, 2000);
            },
            formatData(dataObject) {
                const parts = {
                    date: dataObject.getDate(),
                    month: dataObject.getMonth() + 1,
                    year: dataObject.getFullYear(),
                    hour: (dataObject.getHours() % 12) || 12,
                    minutes: dataObject.getMinutes(),
                    seconds: dataObject.getSeconds(),
                    amOrPm: dataObject.getHours() < 12 ? 'AM' : 'PM',
                };

                return `${parts.date}/${parts.month}/${parts.year} ${parts.hour}/${parts.minutes}/${parts.seconds}: ${parts.amOrPm}`
            },
        }
    }
</script>
