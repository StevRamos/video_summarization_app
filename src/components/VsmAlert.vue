<template>
    <v-alert
        :value="hayAlerta"
        v-bind:type="tipoAlerta"
        transition="scroll-x-transition"
        >
        {{textoAlerta}}    
    </v-alert>
</template>
<script>


export default {
    name:"VsmAlert",
    props:[
        'senalAlerta',
        'textoAlerta',
        'hayAlert',
    ],
    data(){
        return{
            hayAlerta:false,
            tipoAlerta:"success",
        };
    },
    methods:{

    },
    watch:{
        hayAlert:function(){
            switch(this.senalAlerta){
                case 0: 
                    this.tipoAlerta="success";
                    break;
                case 1:
                    this.tipoAlerta="error";
                    break;
                case 2: 
                    this.tipoAlerta="warning";
                    break;
                case 3: 
                    this.tipoAlerta="info";
                    break;
            }
            this.hayAlerta=true;
                setTimeout(()=>{
                    this.hayAlerta=false;
                },2000)
        }
    },
    created(){

    }
}
</script>
