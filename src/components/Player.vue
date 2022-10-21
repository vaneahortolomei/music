<template>
    <div v-if="show" class="player">
        <div class="player__desc">
            <div class="player__vinyl vinyl">
                <div class="vinyl__inside"></div>
            </div>
            <p class="player__title">
                NOW PLAYING
            </p>
            <p class="player__title player__title--song">{{currentSong.modified_name}}</p>
        </div>
        <div class="player__player">
            <button type="button" class="player__button player-control player-control--bottom" @click.prevent="toggleSong">
            <span class="player-control__icon"
                  :class="{'player-control__icon--play' : !playing, 'player-control__icon--paused' : playing }"/>
            </button>
            <div class="player__timeline">
                <span class="player__timer">{{seek}}</span>
                <div class="player__progress-wrapper">
                    <div class="player__song" @click.prevent="updateSeek">
                        <progress :value="playerProgress" max="100" class="player__progress progress"/>
<!--                        <span class="player__round progress__round" :style="{left: playerProgress + '%'}"/>-->
                    </div>
                </div>
                <span class="player__timer">{{duration}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from "pinia";
    import usePlayerStore from "../stores/player";

    export default {
        name: "Player",
        data() {
            return {
                show: false
            }
        },
        methods: {
            ...mapActions(usePlayerStore, ['toggleSong', 'updateSeek']),
        },
        computed: {
            ...mapState(usePlayerStore, {
                playing: 'playing',
                seek: 'seek',
                duration: 'duration',
                playerProgress: 'playerProgress',
                currentSong: 'currentSong'
            })
        },
        move() {
            console.log('change')
        }
    }
</script>
