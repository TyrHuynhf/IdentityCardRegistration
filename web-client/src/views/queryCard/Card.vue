<template >
  <div>
<!--    <FullCalendar></FullCalendar>-->
    <v-card id="account-setting-card">
      <!-- tabs -->
      <v-tabs
        v-model="tab"
        show-arrows
      >
        <v-tab
          v-for="tab in tabs"
          :key="tab.title"
        >
<!--          <v-icon-->
<!--            size="20"-->
<!--            class="me-3"-->
<!--          >-->
<!--            {{ tab.icon }}-->
<!--          </v-icon>-->
          <span>{{ tab.title }}</span>
        </v-tab>
      </v-tabs>

      <!-- tabs item -->
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <query-card-with-d-t :key='componentKey' @refresh='forceRerender'></query-card-with-d-t>
        </v-tab-item>

        <v-tab-item>
          <query-registered-card :key='componentKey' @refresh='forceRerender'></query-registered-card>
        </v-tab-item>

        <v-tab-item>
          <query-rejected-card :key='componentKey' @refresh='forceRerender'></query-rejected-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>


  </div>
<!--  <query-card :key='componentKey' @refresh='forceRerender'></query-card>-->
</template>

<script>
import axios from 'axios'
import queryCard from './queryCard'
import queryCardWithDT from './queryCardwithDatatable'
import queryRejectedCard from './queryRejectedCards'
import queryRegisteredCard  from './queryRegisteredCards'
import { adminConfig } from '@/main'
import  FullCalendar  from './fullCalendar'
export default {
  data(){
    return{
      events: [
        {
          title  : 'event1',
          start  : '2010-01-01',
        },
        {
          title  : 'event2',
          start  : '2010-01-05',
          end    : '2010-01-07',
        },
        {
          title  : 'event3',
          start  : '2021-12-23T12:30:00',
          allDay : false,
        },
      ],
      tab:'',
      tabs: [
        { title: 'Đăng ký đang đợi xử lý' },
        { title: 'Đăng ký đã duyệt thành công' },
        { title: 'Đăng ký đã bị loại bỏ' },
        // { title: 'Info', icon: mdiInformationOutline },
      ],
      cards:[],
      componentKey: 0,
      componentKeyv2: 1000000,
      componentKeyv3: 10000000,
    }
  },
  components: {
    queryCard,
    queryCardWithDT,
    queryRejectedCard,
    queryRegisteredCard,
    FullCalendar
  },
  methods:{
    handleSelect(arg){
      alert("Hi")
    },
    forceRerender(){
      let loader = this.$loading.show({
        // Optional parameters
        container: null,
        color: 'blue',
        backgroundColor: 'white',
        loader: 'bars',
        canCancel: false,
      });
      this.componentKey++;
      this.componentKeyv2++;
      this.componentKeyv3++;
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
