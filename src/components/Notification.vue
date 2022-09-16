<template>
    <div class="notification">
        <div class="notification__inner">
            <slot name="notification"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Notification"
    }
</script>
