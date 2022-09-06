<template>
    <div class="player">
        <button type="button" class="player__button button button--main" @click.prevent="toggleSong">
            <span class="player__icon"
                  :class="{'player__icon--play' : !playing, 'player__icon--paused' : playing }"/>
        </button>
        <span class="player__timer">{{seek}}</span>
        <div class="player__progress-wrapper">
            <p class="player__title-song">{{currentSong.modified_name}}</p>
            <div class="player__song" @click.prevent="updateSeek">
                <progress :value="playerProgress" max="100" class="player__progress progress-bar"/>
                <span class="player__round" :style="{left: playerProgress + '%'}"/>
            </div>
        </div>
        <span class="player__timer">{{duration}}</span>
    </div>
</template>

<script>
    import {mapActions, mapState} from "pinia";
    import usePlayerStore from "../stores/player";

    export default {
        name: "Player",
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
        move(){
            console.log('change')
        }
    }
</script>

<style scoped>
    .player {
        z-index: 10;
        width: 100%;
        padding: 15px;
        display: flex;
        align-items: center;
        /*justify-content: space-between;*/
        position: fixed;
        bottom: 0;
        background-color: #fff;
        border-top: 1px solid black;
    }

    .player__button {
        position: relative;
        border-radius: 50%;
        height: 50px;
        width: 50px;
    }

    .player__icon {
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
        width: 10px;
        height: 10px;
    }

    .player__icon--play {
        background-color: green;
    }

    .player__icon--paused {
        background-color: red;
    }

    .player__timer {
        flex: 1 1 100px;
    }

    .player__progress-wrapper {
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 100%;
    }
    .player__song {
        position: relative;
        cursor: pointer;
    }

    .player__round {
        width: 25px;
        height: 25px;
        background: black;
        border-radius: 50%;
        position: absolute;
        top: -4px;
        left: 0;
        bottom: 0;
        cursor: pointer;
    }

    .player__progress {
        width: 100%;
    }

    .progress-bar {
        display: flex;
        background-color: gray;
        height: 15px;
        margin: 0;
        overflow: hidden;
        position: relative;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        transition: width 0.2s ease;
    }
</style>
