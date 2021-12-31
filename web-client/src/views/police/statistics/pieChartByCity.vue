<template>
  <div >
    <div v-if='pickCity.registrationCity'>
      <v-col cols='12' >
        <v-card-title>Thống kê đăng ký của tỉnh, thành phố {{pickCity.registrationCity}}</v-card-title>
      </v-col>
      <apexchart width="500" type="pie" :options="chartOptionsv3" :series="seriesv3"></apexchart>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import {mdiPlus,mdiPlusCircle,mdiCheckBoxOutline} from "@mdi/js"
import { policeConfig } from '@/main'
export default {
  props:{
    chosenCity:{
    }
  },
  data(){
    return{
      pickCity:{
        registrationCity:'HỒ CHÍ MINH'
      },
      test:[],
      pendingCount:0,
      approvedCount: 0,
      registeredCount:0,
      rejectedCount:0,
      seriesv3: [],
      chartOptionsv3: {
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            return opts.w.config.series[opts.seriesIndex]
          },
          style: {
            fontSize: "20px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "bold"
          }
        },
        labels: ['Đã duyệt', 'Thành công', 'Đang xử lý', 'Bị loại bỏ']
      }
    }
  },
  methods:{

  },
  async created() {
    if(this.chosenCity){
      this.pickCity.registrationCity =  this.chosenCity
    }
    await axios.get("http://localhost:3000/cards/cardByCity/test/"+ this.pickCity.registrationCity)
    .then(res=>{
      const data = JSON.parse(JSON.stringify(res.data))
      this.seriesv3 =[data.approvedCount, data.registeredCount, data.pendingCount, data.rejectedCount]
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
</script>
<style>
.v-toolbar__content, .v-toolbar__extension {
  justify-content: center;
}
</style>