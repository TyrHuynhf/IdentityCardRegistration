<template >
  <div>
    <v-row>
      <div >
        <v-col cols='12' >
          <v-card-title>Thống kê đăng ký</v-card-title>
        </v-col>
        <apexchart width="500" type="bar" :options="chartOptions" :series="series"></apexchart>
      </div>
      <v-spacer></v-spacer>
    <div>
      <v-col cols='12' >
        <v-card-title>Thống kê tài khoản và tỉnh, thành</v-card-title>
      </v-col>
      <apexchart width="500" type="bar" :options="chartOptionsv2" :series="seriesv2"></apexchart>
    </div>
      <div>
        <v-col
          cols="12"

        >
          <v-combobox
            v-model='pickCity'
            :items='cities'
            solo
            dense
            outlined
            label='Chọn tỉnh thành cần thống kê'
            @change='changeValue'
          >
          </v-combobox>
        </v-col>

        <pie-chart-by-city :chosenCity='chosenCity' :key='componentKey' ></pie-chart-by-city>
      </div>
      </v-row>




  </div>
</template>

<script>
import axios from 'axios'
import { policeConfig } from '@/main'
import pieChartByCity from "./pieChartByCity"
export default {

  data(){
    return{
      componentKey: 0,
      pickCity:'',
      cities: [],
      chosenCity:'',
      cityCount:0,
      pendingCount:0,
      registeredCount:0,
      rejectedCount: 0,
      approvedCount:0,
      citizenCount:0,
      policeCount:0,
      chartOptions: {
        chart: {
          id: 'vuechart-example'
        },

        xaxis: {
          color: "white",
          categories: ["Đang chờ xử lý","Thành công","Đã loại bỏ"]
        }
      },
      series: [{
        name: 'Số lượng',
        data: []
      }],
      chartOptionsv2: {
        chart: {
          id: 'vuechart-example'
        },

        xaxis: {
          color: "white",
          categories: ["Tài khoản công dân","Tài khoản công an"]
        }
      },
      seriesv2: [{
        name: 'Số lượng',
        data: []
      }],


    }
  },
  components: {
    pieChartByCity
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
      this.componentKey ++
      console.log(this.componentKey)
      loader.hide()
    },
    changeValue(){
      this.chosenCity = this.pickCity
      this.componentKey ++
    }
  },
  async created() {
    await axios.get('http://localhost:3000/city/allCity/getCities')
        .then(res => {
          const data = JSON.parse(JSON.stringify(res.data))
          for(let i= 0; i <= data.length; i++){
            this.cities.push(data[i].cityName)
          }
          this.cityCount = data.length
        })
        .catch(err => {
          //console.log(err)
        })
    await axios.get('http://localhost:3000/cards/pendingCards/test')
      .then(res=>{
        const pending = JSON.parse(JSON.stringify(res.data))
        this.pendingCount = pending.length
      })
      .catch(err=>{
        console.log(err)
      })
    await axios.get('http://localhost:3000/cards/registeredCards/test')
      .then(res=>{
        const registered = JSON.parse(JSON.stringify(res.data))
        this.registeredCount = registered.length
      })
      .catch(err=>{
        console.log(err)
      })
    await axios.get('http://localhost:3000/cards/rejectedCards/test')
      .then(res=>{
        const rejected = JSON.parse(JSON.stringify(res.data))
        this.rejectedCount = rejected.length
      })
      .catch(err=>{
        console.log(err)
      })
    await axios.get('http://localhost:3000/users/citizens', policeConfig)
      .then(res=>{
        const data = JSON.parse(JSON.stringify(res.data))
        this.citizenCount = data.length
      })
      .catch(err=>{
        console.log(err)
      })

    await axios.get('http://localhost:3000/users/polices', policeConfig)
      .then(res=>{
        const data = JSON.parse(JSON.stringify(res.data))
        this.policeCount = data.length
      })
      .catch(err=>{
        console.log(err)
      })
    this.series= [{
      data:[this.pendingCount,this.registeredCount,this.rejectedCount]
    }]
    this.seriesv2= [{
      data:[this.citizenCount,this.policeCount]
    }]
  }
}
</script>
