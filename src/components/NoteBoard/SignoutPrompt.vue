<script setup>
import { useNoteStore } from '../../stores/noteboard'

//initialize pinia stores
const noteStore = useNoteStore()
</script>

<template>
    <transition enter-active-class="ans an-fadeIn an-fast" leave-active-class="ans an-fadeOut an-fast">
        <div class="modal" v-if="noteStore.signoutPrompt"></div>
    </transition>

    <transition enter-active-class="ans an-zoomIn an-faster" leave-active-class="ans an-zoomOut an-fast">
        <div class="dialogue-con"
            v-if="noteStore.signoutPrompt"
            @click.self="noteStore.signoutPrompt = false"
        >
            <div class="dialogue text-center">
                <i class="la la-door-open ans an-flipInY an-infinite ic"></i>
                <div class="nt">Sure to sign out?</div>
                <div>
                    <button
                        class="modalBtns yes"
                        @click="$emit('signout')"
                        v-wave
                    >
                        Yes
                    </button>
                    <button
                        class="modalBtns no"
                        @click="noteStore.signoutPrompt = false"
                        v-wave
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>