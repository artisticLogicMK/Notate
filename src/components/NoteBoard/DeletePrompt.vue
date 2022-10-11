<script setup>
import { useNoteStore } from '../../stores/noteboard'

//initialize pinia stores
const noteStore = useNoteStore()
</script>

<template>
    <transition enter-active-class="ans an-fadeIn an-fast" leave-active-class="ans an-fadeOut an-fast">
        <div class="modal" v-if="noteStore.deleteNotePrompt"></div>
    </transition>

    <transition enter-active-class="ans an-zoomIn an-faster" leave-active-class="ans an-zoomOut an-fast">
        <div class="dialogue-con"
            v-if="noteStore.deleteNotePrompt"
            @click.self="noteStore.deleteNotePrompt = false"
        >
            <div class="dialogue text-center">
                <i class="la la-trash ans an-headShake an-infinite ic"></i>
                <div class="nt">Sure to remove this note?</div>
                <div>
                    <button
                        class="modalBtns yes"
                        @click="$emit('deleteNote', noteStore.deleteNotePrompt)"
                        v-wave
                    >
                        Yes
                    </button>
                    <button
                        class="modalBtns no"
                        @click="noteStore.deleteNotePrompt = false"
                        v-wave
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    </transition>
    
</template>

<style>
.dialogue .ic { @apply text-6xl text-neutral-400 dark:text-neutral-300/50 }
.dialogue .nt { @apply text-lg font-semibold text-neutral-500 dark:text-neutral-300/90 py-2 }
.dialogue .yes { @apply bg-neutral-700 text-white dark:text-neutral-300 mr-5 }
.dialogue .no { @apply hover:bg-neutral-400 dark:hover:bg-neutral-500 hover:text-white dark:hover:text-neutral-900  text-neutral-700 dark:text-neutral-300/90 }
</style>