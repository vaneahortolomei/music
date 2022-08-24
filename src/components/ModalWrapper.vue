<template>
    <transition name="fade">
        <div class="modal-overlay" :class="hiddenClass">
            <div class="modal-dialog">
                <div class="modal-window">
                    <div class="modal-window__content">
                        <button type="button" class="modal-window__close-btn"
                                @click.prevent="visibility = false">X
                        </button>
                        <slot name="modal-content"/>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mapWritableState, mapState} from 'pinia';
    import modalStore from "../stores/modal.js";

    export default {
        name: "ModalWrapper",
        computed: {
            ...mapState(modalStore, ['hiddenClass']),
            ...mapWritableState(modalStore, {
                'visibility': 'isOpen'
            }),
        },
    }
</script>
