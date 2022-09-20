<template>
    <div class="user-avatar">
        <div class="user-avatar__avatar">{{user.charAt(0)}}</div>
        <span class="user-avatar__name">{{user}}</span>
    </div>
</template>

<script>
    import {auth} from "../includes/firebase.js";

    export default {
        name: "UserAvatar",
        data(){
            return {
                user: auth.currentUser.displayName,
            }
        },
    }
</script>
