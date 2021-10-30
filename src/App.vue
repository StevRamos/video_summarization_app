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
      <VsmDataTable 
        class="mt-8 mr-20 ml-20"
        v-bind:metrics="metrics"
      />
      <div class="text-center mt-8">
            <v-btn
              :disabled="!isFormValid"
              elevation="2"
              @click="descargarSpotlight"
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
          <v-progress-circular :value="40" indeterminate v-if="cargandoVideo"></v-progress-circular>
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
export default {
  name: 'App',

  components: {
    VsmHeader,
    VsmModalInputVideo,
    VsmAlert,
    VsmFooter,
    VsmDataTable
  },

  data: () => ({
    cargando: false,
    cargandoVideo: false,
    isFormValid: false,
    metrics: []
  }),

  methods: {
    async cargarArchivos(archivosNuevos) {
            this.cargando = true;
            this.isFormValid = false;
            this.metrics.splice(0)
            try{
                this.archivos = archivosNuevos;

                //const resSE = await subirEvidencia(this.archivos, this.idMuestra, this.idActividadEvaluacion);
                //const status = resSE.data.message;
                setTimeout(()=>{
                    this.cargando=false;
                      this.isFormValid = true;
                  this.manejarAlerta(0,1);
                    this.metrics.push(
                  { 
                    name: 'Final UCL 2019',
                    tam: 20,
                    res: "1024x1024",
                    fps: 24,
                    durorig: 15,
                    numseg: 2,
                    durspot: 5,
                  }
                )
                },2000)

                //this.cargando=false;
                
                
                

                //if(status=='Files succesfully processed'){
                  //  this.manejarAlerta(0,1);
                  //  //alert('Se subieron correctamente los evidencias');
                //}
                //else{
                  //  this.manejarAlerta(1,1);
                  //  //alert('No se subieron las evidencias');
                //}
            }
            catch(e){
                this.cargando=false;
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

                //const resSE = await subirEvidencia(this.archivos, this.idMuestra, this.idActividadEvaluacion);
                //const status = resSE.data.message;
                setTimeout(()=>{
                    this.cargandoVideo=false;
                    this.manejarAlerta(0,0);
                },2000)
                //this.cargandoVideo=false;
                //this.manejarAlerta(0,0);
                //if(status=='Files succesfully processed'){
                  //  this.manejarAlerta(0,1);
                  //  //alert('Se subieron correctamente los evidencias');
                //}
                //else{
                  //  this.manejarAlerta(1,1);
                  //  //alert('No se subieron las evidencias');
                //}
            }
            catch(e){
                this.cargandoVideo=false;
                console.log(e);
            }
            //this.getEvidenciasList();
    }
  }

};
</script>
