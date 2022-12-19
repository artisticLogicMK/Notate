<script setup>
defineProps({
    data: Object
})

const colors = ['#0ea5e9','#ef4444','#22c55e','#eab308','#a855f7','#14b8a6','#64748b','#f43f5e','#84cc16','#d946ef','#10b981','#f97316','#3b82f6','#ec4899','#78716c']
const ballpinColor = (index) => {
    let random = Math.floor(Math.random() * 15)
    return index > colors.length - 1 ? 'background-color:'+colors[random] : 'background-color:'+colors[index]
}
</script>


<template>
    <div class="cards group cursor-pointer">
        <!--<img src="../../assets/img/square.png" class="hidden xsm:block w-full">-->
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="hidden xsm:block w-full" viewBox="0 0 10 8"></svg>
        <div class="absolute1 xsm:group-hover:-rotate-[3deg]"></div>

        <div class="absolute2 xsm:group-hover:rotate-[3deg]">
            <div class="ballpin" :style="ballpinColor(data.index)">
                <img src="../../assets/img/ball.png">
            </div>
            
            <div class="title">
                <p>{{data.title.substring(0, 53)}}{{data.title.length > 52 ? '...' : ''}}</p>
            </div>

            <div class="flex justify-between items-center text-neutral-500 dark:text-neutral-400">
                <span class="text-xs">{{data.date}}</span>
                <i class="la la-trash dark:text-neutral-400/90 cursor-pointer hover:scale-110 text-[1.8rem] leading-[0]" @click.stop="$emit('showDeletePrompt')"></i>
            </div>
        </div>
    </div>
</template>


<style>
.noteContainer {
    @apply grid grid-cols-1 xsm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 md2:grid-cols-3 lg:grid-cols-2 lg2:grid-cols-3 xl:grid-cols-3 gap-3 py-4 pb-6 xsm:py-6 
}
.noteContainer .cards {
    @apply h-fit inline w-[96%] xsm:w-[90%] lg:w-[85%] lg2:w-[93%] xl:w-[90%] mx-auto xsm:mx-1.5 mb-2 xsm:mb-5 rounded-lg xsm:relative
}
.noteContainer .cards .absolute1, .noteContainer .cards .absolute2 {
    @apply xsm:absolute top-0 w-full h-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-900/70
}
.noteContainer .cards .absolute1 {
    @apply xsm:rotate-[3deg] shadow-md rounded-md hidden xsm:block
}
.noteContainer .cards .absolute2 {
    @apply flex flex-col xsm:-rotate-[3deg] p-3 shadow-md shadow-black/5 rounded-md
}
.noteContainer .cards .absolute2 .ballpin {
    @apply w-3 h-3 xsm:w-3.5 xsm:h-3.5 rounded-full mx-auto
}
.noteContainer .cards .absolute2 .ballpin img {
    @apply w-full rounded-full
}
.noteContainer .cards .absolute2 .title { @apply grow flex items-center justify-center text-center }
.noteContainer .cards .absolute2 .title p {
    @apply text-sm text-neutral-700 dark:text-neutral-300/90 font-semibold py-3 xsm:py-2
}
.noteContainer .activeNote .absolute2, .noteContainer .activeNote .absolute1 {
    @apply border-neutral-400 dark:border-neutral-400/80
}
</style>