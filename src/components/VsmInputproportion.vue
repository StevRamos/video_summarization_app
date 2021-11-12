<template>
  <v-card flat>
    <v-snackbar
      v-model="snackbar"
      absolute
      top
      right
      color="success"
      :timeout="2000"
    >
      <span>Spotlight Generado!</span>
      <v-icon dark>
        mdi-checkbox-marked-circle
      </v-icon>
    </v-snackbar>
    <v-form
      ref="form"
      @submit.prevent="submit"
    >
      <v-container fluid>
        <v-row>
            <v-slider
              v-model="form.age"
              :rules="rules.age"
              color="orange"
              label="Proporcion Spotlight"
              min="0"
              max="1"
              step="0.05"
              :thumb-size="30"
              thumb-label="always"
              @input="cambioProportion"
              :disabled="disabledProportion"
            ></v-slider>
            <v-btn
            :disabled="!formIsValid"
            text
            color="primary"
            type="submit"
            >
            GENERAR SPOTLIGHT
            </v-btn>
        </v-row>
        <div class="flex justify-center">
          <v-progress-circular class="mt-8 flex justify-center" :value="40" indeterminate v-if="cargando"></v-progress-circular>
        </div> 
      </v-container>
    </v-form>
  </v-card>
</template>


<script>

import {
  getSpotlight
} from '@/services/index';

  export default {
    name: 'VsmInputproportion',
    props: [
        'disabledProportion',
        'videoId',
        'summaryId'
    ],
    data () {
      const defaultForm = Object.freeze({
        age: null,
      })

      return {
        form: Object.assign({}, defaultForm),
        rules: {
          age: [
            val => (val !== 0 && val!==1) || `La proporcion del spotlight debe estar entre 1 y 0`,
          ]
        },
        snackbar: false,
        defaultForm,
        proportion: 0,
        cargando: false,
      }
    },
    
    computed: {
      formIsValid () {
        return (
          this.form.age && this.proportion<1
        )
      },
    },

    methods: {
      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      submit () {
        this.cargando = true;
        this.$emit('spotlightDone', { spotlightValid: false , spotlightId:"",
                                      durSpotlight: "Genere el spotlight",
                                      nSegments: "Genere el spotlight"})
        
        this.generarSpotlight(this.videoId, this.summaryId, this.proportion);

        //alert(this.proportion)
        //this.snackbar = true
        //this.$emit('spotlightDone', { spotlightValid: true , spotlightId:"xdspotlgiht123"})
        //this.resetForm()
      },
      cambioProportion(dato){
          this.proportion = dato;
      },
      async generarSpotlight(videoId, summaryId, proportion) {
          try{
            const resGS = await getSpotlight(videoId, summaryId, proportion);
            const status = resGS.status;
            this.cargando = false;
            if(status==201){

                this.snackbar = true;
                this.$emit('spotlightDone', { spotlightValid: true , 
                                              spotlightId: resGS.data.spotlight_id,
                                              durSpotlight: `${Math.floor(Math.round(resGS.data.dur_spotlight)/60)} m ${Math.round(Math.round(resGS.data.dur_spotlight, -1)%60)} s`,
                                              nSegments: resGS.data.n_segments})
                this.resetForm()
            }
            else {
                this.resetForm()
            }
          }
          catch(e){
              this.cargando = false;
              this.resetForm()
          }
      }
    },
  }
</script>