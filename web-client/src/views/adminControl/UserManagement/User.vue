<template >
  <div>
    <add-police-dialog @refresh='forceRerender'></add-police-dialog>
    <query-user :key='componentKey' @refresh='forceRerender'></query-user>
  </div>
</template>

<script>
import axios from 'axios'
import queryUser from './queryUser'
import addPoliceDialog from './addPoliceDialog'
import { adminConfig } from '@/main'
export default {
  data(){
    return{
      cards:[],
      componentKey: 0,

    }
  },
  components: {
    queryUser,
    addPoliceDialog
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
