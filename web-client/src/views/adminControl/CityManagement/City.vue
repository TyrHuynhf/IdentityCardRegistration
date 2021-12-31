<template >
  <v-row class="match-height justify-center">
    <!-- Multiple Column -->
    <v-col cols="12"   >
      <query-city  :key='componentKey'  @refresh='forceRerender'></query-city>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'
import addCityDialog from './addCityDialog'
import queryCity from './queryCity'
import { adminConfig } from '@/main'
export default {
  data(){
    return{
      cards:[],
      componentKey: 0,

    }
  },
  components: {
    addCityDialog,
    queryCity
  },
  methods:{
    forceRerender(){
      let loader = this.$loading.show({
        // Optional parameters
        container: null,
        color: 'blue',
        backgroundColor: 'white',
        loader: 'bars',
        canCancel: false,
      });
      this.componentKey ++;
      loader.hide()
    }
  },
  setup() {

    return {

    }
  },
  created() {

  }
}
</script>
