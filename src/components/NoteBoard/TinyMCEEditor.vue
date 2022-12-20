<script setup>
import { useNoteStore } from '../../stores/noteboard'
import Editor from '@tinymce/tinymce-vue'

const noteStore = useNoteStore()

const theme = localStorage.theme == 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches === true ? 'dark' : 'light'
</script>

<template>
    <div class="grow h-full md2:h-[90%] bg-white dark:bg-[#d9d9d9]">
        <editor

            class="h-full"
            api-key="q9i5915bgf2zeqvmqylxcm97ztznewvkfjt5nho9ax0ievr0"
            v-model="noteStore.noteEditor.data"
            :init="{
                menubar: false,
                statusbar: false,
                icons: 'small',
                plugins: [
                    'lists link image charmap emoticons',
                    'table paste'
                ],
                toolbar:
                'undo redo formatselect bold italic underline forecolor backcolor alignleft aligncenter alignright alignjustify bullist numlist table emoticons charmap removeformat link',
                toolbar_sticky: true,
                contextmenu: false,
                content_style: theme == 'dark' ? 'body {margin:0 0.75rem 1rem 0.75rem;}*::-webkit-scrollbar{width:7px;background:transparent;}*::-webkit-scrollbar-thumb{border-radius:10px;background:rgba(0,0,0,.4)}' : 'body {border-top:1px solid #eaeaea;margin:0 0.75rem 1rem 0.75rem;}*::-webkit-scrollbar{width:7px;background:transparent;}*::-webkit-scrollbar-thumb{border-radius:10px;background:rgba(0,0,0,.12)}',
                skin: 'naked',
                skin_url: theme == 'dark' ? './assets/tinymce' : null,
            }"
        />
    </div>
</template>

<style scoped>
textarea { @apply bg-white dark:bg-neutral-800 w-full }
</style>