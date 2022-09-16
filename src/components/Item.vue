<template>
    <li class="song-item song-item--manage">
        <div class="song-item__desc">
            <div class="song-item__head">
                <p class="song-item__name">{{song.modified_name}}</p>
                <p class="song-item__genre">{{song.genre}}</p>
            </div>
            <div class="song-item__btn-group">
                <button class="button
                button--main
                song-item__button
                song-item__button--edit"
                        @click="song.showForm = !song.showForm"
                        type="button"/>
                <button class="button
                button--delete
                song-item__button
                song-item__button--remove"
                        @click="deleteSong"/>
            </div>
        </div>
        <fieldset class="song-item__form-edit" v-show="song.showForm">
            <Notification class="notification"
                          v-if="showAlert"
                          :class="messageBg">
                <template #notification>
                    {{showMessage}}
                </template>
            </Notification>
            <Form @submit="onSubmit" :validation-schema="songSchema" class="form">
                <div class="form__group">
                    <label class="form__label">Title</label>
                    <Field name="modified_name" class="form__input" type="text"
                           placeholder="Enter song name" @input="unsavedFlag(true)"/>
                    <ErrorMessage class="form__error error-active" name="modified_name"/>
                </div>
                <div class="form__group">
                    <label class="form__label">Genre</label>
                    <Field name="genre" class="form__input" type="text" placeholder="Enter genre"
                           @input="unsavedFlag(true)"/>
                    <ErrorMessage class="form__error error-active" name="genre"/>
                </div>
                <div class="form__group song-item__btn-group">
                    <button class="button button--main song-item__button-submit" type="submit">Submit</button>
                    <button class="button button--main song-item__button-return" type="button"
                            @click="song.showForm = false">Go back
                    </button>
                </div>
            </Form>
        </fieldset>
    </li>
</template>

<script>
    import {storage, auth, songsCollection} from "../includes/firebase.js";
    import Notification from "./Notification.vue";

    export default {
        name: "Item",
        components: {Notification},
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
                messageBg: 'notification--process',
                songSchema: {
                    modified_name: 'required',
                    genre: 'required|alpha_spaces',
                },
            }
        },
        methods: {
            async onSubmit(val) {
                this.showAlert = true;
                this.showMessage = 'Process!';
                this.messageBg = 'notification--process';

                try {
                    await songsCollection.doc(this.song.docID).update(val);

                } catch (e) {
                    if (e) {
                        this.showAlert = true;
                        this.messageBg = 'notification--error';
                        this.showMessage = 'Something wrong! Try again please!';
                    }
                }

                this.showAlert = true;
                this.messageBg = 'notification--success';
                this.showMessage = 'Success!';


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
