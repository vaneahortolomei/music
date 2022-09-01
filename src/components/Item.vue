<template>
    <li class="item">
        <div class="song-item">
            <strong>{{song.modified_name}}</strong>
            <strong>{{song.genre}}</strong>
            <span class="song-item__block">
                                <button class="button button--main" @click="song.showForm = !song.showForm"
                                        type="button">R</button>
                                <button class="button button--delete" @click="deleteSong">X</button>
                                </span>
        </div>
        <fieldset v-show="song.showForm">
            <div class="status" v-if="showAlert"
                 :class="messageBg">
                {{showMessage}}
            </div>
            <Form @submit="onSubmit" :validation-schema="songSchema" class="form">
                <div class="form__group">
                    <label>SongTitle</label>
                    <Field name="modified_name" class="form__input" type="text"
                           placeholder="Enter song name" @input="unsavedFlag(true)"/>
                    <ErrorMessage class="error-active" name="modified_name"/>
                </div>
                <div class="form__group">
                    <label>Genre</label>
                    <Field name="genre" class="form__input" type="text" placeholder="Enter genre"
                           @input="unsavedFlag(true)"/>
                    <ErrorMessage class="error-active" name="genre"/>
                </div>
                <div class="form__group">
                    <button class="button button--main" type="submit">Submit</button>
                    <button class="button button--main" type="button" @click="song.showForm = false">Go back
                    </button>
                </div>
            </Form>
        </fieldset>
    </li>
</template>

<script>
    import {storage, auth, songsCollection} from "../includes/firebase.js";

    export default {
        name: "Item",
        props: {
            song: {
                type: Object,
                required: true,
            },
            updateTheSong: {
                type: Function,
            },
            removeSong: {
                type: Function,
                required: true,
            },
            unsavedFlag: {
                type: Function,
                required: true,
            },
            index: {
                type: Number,
                required: true,
            }
        },
        data() {
            return {
                showAlert: false,
                showMessage: 'Process!',
                messageBg: 'message-box--process',
                songSchema: {
                    modified_name: 'required',
                    genre: 'required|alpha_spaces',
                },
            }
        },
        created() {
            console.log(this.index);
            console.log(this.song.modified_name);
        },
        methods: {
            async onSubmit(val) {
                this.showAlert = true;
                this.showMessage = 'Process!';
                this.messageBg = 'message-box--process';

                try {
                    await songsCollection.doc(this.song.docID).update(val);

                } catch (e) {
                    if (e) {
                        this.showAlert = true;
                        this.messageBg = 'message-box--error';
                        this.showMessage = 'Something wrong! Try again please!';
                    }
                }

                this.showAlert = true;
                this.messageBg = 'message-box--success';
                this.showMessage = 'Welcome to music store!';


                this.hideStatus();

                this.updateTheSong(this.index, val);
                this.unsavedFlag(false);
            },
            async deleteSong() {

                //TODO fix bug with double original_name!
                const storageRef = storage.ref();
                const songRef = storageRef.child(`songs/${this.song.original_name}`)

                await songRef.delete();
                await songsCollection.doc(this.song.docID).delete();

                this.removeSong(this.index);
            },
            hideStatus() {
                setTimeout(() => {
                    this.showAlert = false;
                    this.song.showForm = false;
                }, 2000);
            }
        }
    }
</script>
