<template >
  <query-card :key='componentKey' @refresh='forceRerender'></query-card>
</template>

<script>
import axios from 'axios'
import queryCard from './queryCard'
import { adminConfig } from '@/main'
export default {
  data(){
    return{
      cards:[],
      componentKey: 0,

    }
  },
  components: {
    queryCard
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
    axios.get('http://localhost:3000/city/allCity/getCities')
      .then(res=>{
        const data = JSON.parse(JSON.stringify(res.data))
        this.cards = data
      })
      .catch(err=>{
        console.log(err)
      })
  }
}
</script>
