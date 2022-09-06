<template>
    <div class="music-page">
        <div class="music-page__header">
            <div class="container">
                <div class="music-page__wrap">
                    <div>
                        <button type="button" class="music-page__button play-button button" @click.prevent="newSong(song)"/>
                    </div>
                    <div>
                        <h1>{{song.modified_name}}</h1>
                        <p>{{song.genre}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="music-page__main">
                <p>comments: {{song.comment_count}}</p>
                <Form @submit="submitMessage" :validation-schema="messageSchema" class="form" v-if="this.isLogged">
                    <label>Message</label>
                    <Field as="textarea" name="message" class="form__input"
                           placeholder="Enter a message" rows="15"/>
                    <div class="music-page__footer">
                        <ErrorMessage ref="error" class="error-active" name="message"/>
                        <button class="button button--main">SubmitMessage</button>
                    </div>
                </Form>
                <ul class="comment-list">
                    <li class="status" v-if="showAlert"
                        :class="messageBg">
                        {{showMessage}}
                    </li>
                    <li class="comment-item" v-for="comment in comments" :key="comment.docID">
                        <strong class="comment-item__name">{{comment.user}}</strong>
                        <time datetime="" class="comment-item__time">
                            <b>{{comment.date}}</b>
                        </time>
                        <p class="comment-item__message">{{comment.content.message}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import useUserStore from "../stores/user";
    import usePlayerStore from "../stores/player"
    import {mapActions, mapWritableState} from "pinia";
    import {auth, songsCollection, commentsCollection} from "../includes/firebase.js";

    export default {
        name: "Song",
        data() {
            return {
                song: '',
                showAlert: false,
                messageBg: 'message-box--process',
                showMessage: 'Process!',
                messageSchema: {
                    message: 'required|min:3|max:200'
                },
                comments: [],
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
        },
        methods: {
            ...mapActions(usePlayerStore, ['newSong']),
            async submitMessage(val) {
                this.showAlert = true;
                this.showMessage = 'Process!';
                this.messageBg = 'message-box--process';

                try {
                    const comment = {
                        user: auth.currentUser.displayName,
                        date: new Date().toString(),
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
                        this.messageBg = 'message-box--error';
                        this.showMessage = 'Something wrong! Try again please!';
                    }
                }

                this.showAlert = true;
                this.messageBg = 'message-box--success';
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
            }
        }
    }
</script>

<style scoped>
    .comment-list {
        list-style-type: none;
        margin: 20px 0;
        padding: 0;
    }

    .comment-item + .comment-item {
        margin-top: 20px;
    }

    .comment-item {
        border: 1px dashed #dbe1e9;
        border-radius: 20px;
        padding: 15px;
        text-align: left;
    }

    .comment-item__name {
        display: block;
    }

    .comment-item__message {
        margin-top: 20px;
    }

    .music-page__main {
        background-color: #fff;
        box-shadow: 0 15px 30px rgb(31 51 136 / 15%);
        border: 1px solid #dbe1e9;
        border-radius: 15px;
        padding: 20px;
        margin-top: 50px;
    }

    .music-page__header {
        background-color: #f5b5bf;
        padding: 30px 0;
    }

    .music-page__header h1, p {
        margin: 0
    }

    .music-page__wrap {
        text-align: left;
        display: flex;
        align-items: center;
    }

    .music-page__button {
        margin-right: 10px;
        position: relative;
    }

    .music-page__button:before {
        content: '';
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
        width: 20px;
        height: 20px;
        background-color: black;
    }

    .music-page__footer .error-active {
        display: block;
        margin: 10px 0;
    }

    .status {
        padding: 20px;
        text-align: center;
        font-weight: bold;
        color: #fff;
        margin-bottom: 15px;
    }

    .play-button {
        border-radius: 50%;
        height: 100px;
        width: 100px;
        background: #fff;
    }
</style>
