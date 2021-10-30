<template>
  <v-data-table
    :headers="headers"
    :items="metrics"
    hide-default-footer
    class="elevation-1"
    no-data-text="Genere el spotlight para ver la informacion."
    loading-text="Generando spotlight...Espere por favor."
  ></v-data-table>
</template>

<script>
  export default {
    name: "VsmDataTable",
    props: [
        'metrics',
    ],
    data () {
      return {
        headers: [
          {
            text: 'Nombre del video',
            align: 'start',
            value: 'name',
          },
          { text: 'Tamaño (MB)', value: 'tam' },
          { text: 'Resolucion', value: 'res' },
          { text: 'FPS', value: 'fps' },
          { text: 'Duracion total (min)', value: 'durorig' },
          { text: 'Numero segmentos spotlight', value: 'numseg' },
          { text: 'Duracion spotlight (min)', value: 'durspot' },
        ],
      }
    },
  }
</script>