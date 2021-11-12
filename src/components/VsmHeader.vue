<template>
   <header class="shadow w-screen">

       <nav>
           <nav class="flex items-center justify-between flex-wrap bg-blue-400 p-6">
               <div class="flex items-center flex-shrink-0 text-white mr-6">
                    <v-img
                        alt="App Logo"
                        class="shrink ml-1 mr-2"
                        contain
                        src="@/assets/video.svg"
                        transition="scale-transition"
                        width="31"
                    />
                   <span class="font-semibold text-xl tracking-tight">Generacion Automatica de Resumenes de videos</span>
               </div>
               <div class="hidden sm:block w-full blok flex-grow lg:flex lg:items-center lg:wauto">
                   <div class="text-sm lg:flex-grow"></div>
               </div>
           </nav>
       </nav>
    </header> 
</template>


<script>

export default {
    name: "VsmHeader",
};
</script>
