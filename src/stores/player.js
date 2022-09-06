import {defineStore} from "pinia";
import {Howl} from 'howler'
import {formatData} from '../includes/helper';

export default defineStore('player', {
    state: () => ({
        currentSong: {},
        sound: {},
        seek: '00:00',
        duration: '00:00',
        playerProgress: '0'
    }),
    actions: {
        async newSong(song) {
            if (this.sound instanceof Howl) {
                this.sound.unload();
            }
            this.currentSong = song;

            this.sound = new Howl({
                src: [song.url],
                html5: true,
                volume: 0.7,
            });

            this.sound.play();

            this.sound.on('play', () => {
                requestAnimationFrame(this.progress);
            })
        },
        async toggleSong() {
            if (!this.sound.playing) {
                return;
            }
            if (this.sound.playing()) {
                this.sound.pause();
            } else {
                this.sound.play();
            }
        },
        progress() {
            this.seek = formatData(this.sound.seek());
            this.duration = formatData(this.sound.duration());

            this.playerProgress = `${this.sound.seek() / this.sound.duration() * 100}`;

            if (this.sound.playing()) {
                requestAnimationFrame(this.progress);
            }
        },
        updateSeek(e){
            if(!this.sound.playing){
                return;
            }

            const {x, width} = e.currentTarget.getBoundingClientRect();

            const cx = e.clientX - x;
            const percentage = cx / width;
            const seconds = this.sound.duration() * percentage;

            this.sound.seek(seconds);
            this.sound.once('seek', this.progress);
        },
    },
    getters: {
        playing: (state) => {
            if (state.sound.playing) {
                return state.sound.playing();
            }

            return false;
        },
    }
});
