<template>
  <v-footer
    dark
    padless
    class="absolute bottom-0 shadow w-screen"
  >
    <v-card
      flat
      tile
      class="indigo lighten-1 white--text text-center flex items-center justify-between flex-wrap bg-blue-400 p-6"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon.icon"
          class="mx-4 white--text"
          icon.icon
        >
        <a :href="icon.link">
          <v-icon size="24px">
            {{ icon.icon }}
          </v-icon>
        </a>
        </v-btn>
      </v-card-text>


      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Generacion automatica de resumenes de videos para la creacion de spotlights</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>

export default {
    name: "VsmFooter",
    data: () => ({
      icons: [
        {icon:'mdi-github', link:'https://github.com/StevRamos/video_summarization'},
        {icon:'mdi-linkedin', link:'https://www.linkedin.com/in/manuel-harold-stev-huaman-ramos/'}
      ],
    }),
};
</script>