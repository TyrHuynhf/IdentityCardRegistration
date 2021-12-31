<template >
  <query-citizen :key='componentKey' @refresh='forceRerender'></query-citizen>
</template>

<script>
import axios from 'axios'
import queryCitizen from './queryCitizen'
import { adminConfig } from '@/main'
export default {
  data(){
    return{
      cards:[],
      componentKey: 0,

    }
  },
  components: {
    queryCitizen
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
}
</script>
