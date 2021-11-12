<template>
  <v-app>
    <v-main>
      <VsmHeader />
      <VsmModalInputVideo 
        class="mt-8 flex justify-center" 
        v-on:importarDatos="cargarArchivos" 
      />
      <div class="flex justify-center">
        <v-progress-circular class="mt-8 flex justify-center" :value="40" indeterminate v-if="cargando"></v-progress-circular>
      </div> 
      <VsmInputproportion 
        class="mt-8 mr-20 ml-20"
        v-bind:disabledProportion="!isFormValid"
        v-bind:videoId="videoId"
        v-bind:summaryId="summaryId"
        @spotlightDone="spotlightDone" 
      /> 
      <VsmDataTable 
        class="mt-8 mr-20 ml-20"
        v-bind:metrics="metrics"
      />
      <div class="text-center mt-8 mr-20 ml-20" :disabled="!spotlightValues.spotlightValid">
        <!-- -->
          <a 
          >
          <v-btn
              :disabled="!spotlightValues.spotlightValid"
              elevation="2"
              @click="descargarSpotlight"
              class="text-center mt-8 mr-20 ml-20"
          >

              Descargar Spotlight
              <v-icon
                  medium
                  dark
                  right
              >  
                mdi-download
              </v-icon>
          </v-btn>
          </a>
        <!---->    
        <v-progress-circular :value="40" indeterminate v-if="cargandoVideo" class="text-center mt-8 mr-20 ml-20"></v-progress-circular>
      </div>
      <VsmAlert
        v-bind:senalAlerta="senalAlerta"
        v-bind:textoAlerta="textoAlerta"
        v-bind:hayAlert="hayAlerta"
        class="mt-8 mr-20 ml-20"
      />
      <VsmFooter 
      />
    </v-main>
  </v-app>
</template>

<script>
import VsmHeader from '@/components/VsmHeader';
import VsmFooter from '@/components/VsmFooter';
import VsmModalInputVideo from '@/components/VsmModalInputVideo';
import VsmAlert from "@/components/VsmAlert";
import VsmDataTable from "@/components/VsmDataTable";
import VsmInputproportion from "@/components/VsmInputproportion";
import {
  summarizeVideo,
  downloadSpotlight
} from '@/services/index';

export default {
  name: 'App',

  components: {
    VsmHeader,
    VsmModalInputVideo,
    VsmAlert,
    VsmFooter,
    VsmDataTable,
    VsmInputproportion
  },

  data: () => ({
    cargando: false,
    cargandoVideo: false,
    isFormValid: false,
    disabledProportion: true,
    metrics: [],
    nameSpotlight: "spotlight.mp4",
    spotlightValues: { spotlightValid: false,  spotlightId:"" },
    videoId: "",
    summaryId: ""
  }),

  methods: {
    spotlightDone(value) {
      this.spotlightValues = value;

      const video_name = this.metrics[0].name;
      const tam = this.metrics[0].tam;
      const res = this.metrics[0].res;
      const fps = this.metrics[0].fps;
      const dur_orig = this.metrics[0].durorig;

      this.metrics.splice(0)
      this.metrics.push(
        { 
          name: video_name,
          tam: tam,
          res: res,
          fps: fps,
          durorig: dur_orig,
          numseg: this.spotlightValues.nSegments,
          durspot: this.spotlightValues.durSpotlight
        }
      ) 
    },

    async cargarArchivos(archivosNuevos) {
            this.cargando = true;
            this.isFormValid = false;
            this.spotlightValues = { spotlightValid: false,  spotlightId:""}
            this.metrics.splice(0)
            try{
                const resVS = await summarizeVideo(archivosNuevos);
                this.cargando=false;
                console.log(resVS);
                const status = resVS.status;
                              
                if(status==201){
                    this.metrics.push(
                      { 
                        name: resVS.data.video_name,
                        tam: Math.round(resVS.data.tam/1000000, -1),
                        res: `${resVS.data.res_w} x ${resVS.data.res_h}`,
                        fps: Math.round(resVS.data.fps, -1),
                        durorig: `${Math.floor(Math.round(resVS.data.dur_orig)/60)} m ${Math.round(Math.round(resVS.data.dur_orig, -1)%60)} s`,
                        numseg: "Genere el spotlight",
                        durspot: "Genere el spotlight"
                      }
                    ) 

                    this.videoId = resVS.data.video_id;
                    this.summaryId = resVS.data.summary_id;

                   this.manejarAlerta(0,1);
                   this.isFormValid = true;
                  //  //alert('Se subieron correctamente los evidencias');
                }
                else{
                  this.manejarAlerta(1,1);
                  //  //alert('No se subieron las evidencias');
                }
            }
            catch(e){
                this.cargando=false;
                this.manejarAlerta(1,1);
                console.log(e);
            }
            //this.getEvidenciasList();
        },
    manejarAlerta(tipo, accion) {
            if (tipo == 0) {
                this.hayAlerta=!this.hayAlerta;
                this.senalAlerta=tipo;
                if(accion==0) {//descargar
                    this.textoAlerta="Se descargó exitosamente el spotlight";
                } else if (accion==1) {//subir
                    this.textoAlerta="Se generó exitosamente el spotlight";
                } else {//eliminar
                    this.textoAlerta="Se eliminó exitosamente la evidencia";
                }
            } else {
                this.hayAlerta=!this.hayAlerta;
                this.senalAlerta=tipo;
                if (accion==0) {//descargar
                    this.textoAlerta='Hubo un error al descargar el spotlight';
                } else if(accion==1) {//subir
                    this.textoAlerta="Hubo un error al generar el spotlight";
                } else {//eliminar
                    this.textoAlerta="Hubo un error al eliminar la evidencia";
                }
            }
        },
    async descargarSpotlight(){
            this.cargandoVideo = true;
            try{
                const resDS = await downloadSpotlight(this.spotlightValues.spotlightId)
                //const resSE = await subirEvidencia(this.archivos, this.idMuestra, this.idActividadEvaluacion);
                //const status = resSE.data.message;
                this.cargandoVideo=false;
                console.log("resDS::", resDS)
                const status = resDS.status;

                
          
                if(status==200){
                  const blob = new Blob([resDS.data], {type: 'video/mp4'})
                  const link = document.createElement('a');

                  link.href = URL.createObjectURL(blob);
                  link.setAttribute('download', this.nameSpotlight);
                  link.click();
                  URL.revokeObjectURL(link.href);
                    this.manejarAlerta(0,0);
                  //  //alert('Se subieron correctamente los evidencias');
                }
                else{
                    this.manejarAlerta(1,0);
                  //  //alert('No se subieron las evidencias');
                }
            }
            catch(e){
                this.cargandoVideo=false;
                this.manejarAlerta(1,0);
                console.log(e);
            }
            //this.getEvidenciasList();
    }
  }

};
</script>
