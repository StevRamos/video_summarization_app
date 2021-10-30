<template>
    <v-file-input
    :rules="rules"
    chips
    counter
    show-size
    small-chip
    label="Video de deporte"
    truncate-length="50"
    prepend-icon="mdi-video"
    accept="video/*"
    @change="filesChanged"
    >
    </v-file-input>
</template>


<script>
export default{
    name: 'VsmInputVideo',
    data: () => ({
        rules: [
            value => !value || value.size < 200000000 || 'Tamaño de video deberia ser menor a 200MB!',
        ],
        success: false,
        datos: [],
    }),
    methods: {
        filesChanged(file) {
            this.datos = file;
            this.success = true;
            this.$emit("entregarDatos", this.datos);
        },
    }
}
</script>


<style scoped>
</style>
