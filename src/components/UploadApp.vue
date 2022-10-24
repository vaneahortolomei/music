<template>
    <div class="manage__upload">
        <picture class="upload-box__img">
            <source srcset="/src/img/manage/nouras.webp" type="image/webp">
            <img decoding="sync" src="/src/img/manage/nouras.png" alt="404">
        </picture>
        <div class="upload-box upload-box--manage"
             @drag.prevent.stop=""
             @dragstart.prevent.stop=""
             @dragend.prevent.stop="is_dragover = false"
             @dragenter.prevent.stop="is_dragover = true"
             @dragover.prevent.stop="is_dragover = true"
             @dragleave.prevent.stop="is_dragover = false"
             @drop.prevent.stop="uploadFiles($event)"
             :class="{'upload-box--active': is_dragover}">
            <p class="upload-box__title">Drag & Drop
                files here to upload</p>
        </div>
        <div class="upload-file">
            <div class="upload-file__custom">
                <input ref="file" id="files" type="file" class="upload-file__input" @change="uploadFiles($event)"
                       multiple/>
                <button class="button button--responsive button--second">BrowseFiles</button>
                <span class="upload-file__file-name" ref="fileName"/>
            </div>
        </div>
        <div class="manage__progress progress-bar" v-for="upload in uploads" :key="upload.name">
            <p class="progress-bar__title">{{upload.name}}</p>
            <span class="progress-bar__line">
                                <span class="progress-bar__inside"
                                      :style="{backgroundColor: upload.variant, width: upload.current_progress + '%'}"/>
                            <span class="progress-bar__percentage">{{upload.text}}</span>
                            </span>
        </div>
    </div>
</template>

<script>
    import {storage, auth, songsCollection, usersCollection} from "../includes/firebase.js";
    import useUserStore from "../stores/user";
    import {mapWritableState} from "pinia";

    export default {
        name: "UploadApp",
        props: ['addSong'],
        data() {
            return {
                is_dragover: false,
                uploads: [],
            }
        },
        computed: {
            ...mapWritableState(useUserStore, ['user']),
        },
        methods: {
            uploadFiles($event) {
                // this.$refs['fileName'].textContent = $event.target.value.split(/(\\|\/)/g).pop();
                this.is_dragover = false;
                const files = $event.dataTransfer ?
                    [...$event.dataTransfer.files] :
                    [...$event.target.files];

                files.forEach(file => {
                    if (file.type !== 'audio/x-m4a' &&
                        file.type !== 'audio/mpeg' &&
                        file.type !== 'audio/mp3' &&
                        file.type !== 'audio/flac' &&
                        file.type !== 'audio/wav') {
                        console.log(auth.currentUser.email)
                        this.$emit('showNotification', Boolean);
                        return null;
                    }

                    const storageRef = storage.ref();
                    const songsRef = storageRef.child(`songs/${file.name}`);
                    const task = songsRef.put(file);

                    const uploadIndex = this.uploads.push({
                        task,
                        current_progress: 0,
                        name: file.name,
                        variant: '#EEC38E',
                        text: 'Loading...',
                    }) - 1;

                    task.on('state_changed', (snapshot) => {
                        this.uploads[uploadIndex].current_progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    }, () => {
                        this.uploads[uploadIndex].variant = '#C5634E';
                        this.uploads[uploadIndex].text = 'Error';
                    }, async () => {
                        const song = {
                            uid: auth.currentUser.uid,
                            display_name: auth.currentUser.displayName,
                            original_name: task.snapshot.ref.name,
                            modified_name: task.snapshot.ref.name,
                            genre: '',
                            comment_count: 0,
                        };

                        song.url = await task.snapshot.ref.getDownloadURL();
                        const songsRef = await songsCollection.add(song);
                        const songGet = await songsRef.get();

                        this.addSong(songGet);

                        this.uploads[uploadIndex].variant = '#60B682';
                        this.uploads[uploadIndex].text = 'Complete';
                    });
                });
            },
        }
    }
</script>

