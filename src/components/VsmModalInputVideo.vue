<template>
    <div class="modalCard">
        <v-dialog
            v-model="dialog"
            max-width="35rem"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="btnImportar"
                v-bind="attrs"
                v-on="on"
                >
                <v-icon dark left>mdi-file-import-outline</v-icon>
                Importar video
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span>Subir video de deporte</span>
                </v-card-title>
                <hr>
                <v-card-text>
                    <br>
                    <div class="inputFile">
                        <VsmInputVideo v-model="datos"
                        v-on:entregarDatos="recibirDatos"/>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                    color=#F95F62 
                    outlined
                    class="btnCancelarModal"
                    @click="cancelar"
                    ><v-icon left>mdi-close</v-icon>
                        Cancelar
                    </v-btn>
                    <v-btn
                    color=#3DBEAB 
                    outlined
                    class="btnGuardarModal"
                    @click="importarDatos"
                    ><v-icon left>mdi-check</v-icon>
                        GENERAR SPOTLIGHT
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>  
    </div>  
</template>


<script>
import VsmInputVideo from '@/components/VsmInputVideo';

export default {
    name: 'VsmModalInputVideo',
    components: {
        VsmInputVideo,
    },
    data: () => ({
      dialog: false,
      archivo: null,
      success: false,
      datos: [],
      files: [],
    }),

    methods: {
        cancelar() {
            this.dialog = false;
        },

        recibirDatos(datos) {
            this.datos = datos;
        },

        importarDatos() {
            this.$emit("importarDatos", this.datos);
            this.dialog = false;
            console.log("datos en modalinput::", this.datos);
        },
    }
}
</script>

