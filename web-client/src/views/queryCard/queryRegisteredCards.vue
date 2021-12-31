<template>
  <div class="match-height">
    <v-text-field
      style='max-width: 500px'
      dense
      outlined
      :prepend-inner-icon="mdiMagnify"
      class="app-bar-search flex-grow-0"
      hide-details
      v-model='search'
      placeholder='Tìm kiếm'
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :search='search'
      :items="mungedCard"
      sort-by="registrationTime"
      class="elevation-1"
      :footer-props="{
         'items-per-page-options': [10, 20, 30, 40, 50],
         'items-per-page-text':'Số dòng mỗi trang',
       }"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Đăng ký đã thực hiện thành công</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template #item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click='getDate'
        >
          {{mdiPencil}}
        </v-icon>
        <v-icon
          small
          @click='rerender'
        >
          {{ mdiDelete}}
        </v-icon>

      </template>
      <template #item.detail='{item}'>
        <get-card-info :cardInfo='item' @refresh='rerender'></get-card-info>
      </template>
<!--      <template #item.picture='{item}'>-->
<!--          <push-picture :card-info='item' @refresh='rerender'></push-picture>-->
<!--      </template>-->
      <template #item.pictureOf='{item}'>
        <push-picture :card-info='item' @refresh='rerender'></push-picture>
      </template>
      <template #item.fingerPrint='{item}'>
          <push-fingerprint :card-info='item' @refresh='rerender'></push-fingerprint>
      </template>
      <template #item.completeCard='{item}'>
        <creat-card :card-info='item' @refresh='rerender'></creat-card>
      </template>
      <template  class='text-center' #item.state="{ item }">
        <v-chip small :color='statusColor[item.registrationState]' >{{item.regState}}</v-chip>
      </template>
      <template v-slot:item.createdOn="{ item }">
        <span>{{ new Date(item.registrationTime).toLocaleString() }}</span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import AppBarUserMenu from './AppBarUserMenu'
import getCardInfo from './getCardInfo'
import pushFingerprint from './pushFingerprint'
import pushPicture from './pushPicture'
import creatCard from './createCard'
import axios from 'axios'
import {mdiPencil, mdiDelete, mdiMagnify} from '@mdi/js'
import { config } from '@/main'
export default {
  data(){
    return{
      mdiPencil,mdiDelete,mdiMagnify,
      headers:[
      {text: 'Đăng ký', value:'fullName', sortable: false, align: "start"},
      {text: 'Trạng thái', value: 'state', sortable: false},
      {text: 'Chi tiết', value: 'detail', sortable: false},
      {text: 'Ngày đăng ký', value: 'sortable_registrationTime'},
      ],
      search:'',
      test:[],
      statusColor : {
        registered: 'success',
        rejected: 'error',
        pending: 'warning',
        approved: 'info',
      },

    }
  },
  computed:{
    mungedCard(){
      return this.test.map((v)=>{
        return {
          ...v,
          sortable_registrationTime: this.formatDate(v.registrationTime)
        }
      })
    }
  },
  methods:{
    rerender(){
      this.$emit('refresh')
    },
    formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
      let hour, minute
        hour = d.getHours();
        minute =d.getMinutes()
      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;
      return [day, month, year].join('/') + ' '+ [hour, minute].join(':')
    },
    getDate(){
      console.log(this.formatDate(new Date()))
    }
  },
  components: {
    AppBarUserMenu,
    getCardInfo,
    pushFingerprint,
    pushPicture,
    creatCard
  },
  setup() {

    return {

    }
  },
  created() {
    axios.get('http://localhost:3000/cards/registeredCards/test')
    .then(res=>{
      const data = JSON.parse(JSON.stringify(res.data))
      this.test = data
      for(let i=0;i<=this.test.length;i++){
        if(this.test[i].registrationState === 'pending') this.test[i].regState = 'Đang xử lý'
        else{
          if(this.test[i].registrationState === 'registered') this.test[i].regState = 'Thành công'
          else  {
            if(this.test[i].registrationState === 'approved') {
              this.test[i].regState = 'Đã duyệt'
              this.approveCheck = true
            }
            else this.test[i].regState = 'Bị loại bỏ'
          }
        }
      }

    })
    .catch(err=>{
      //console.log(err)
    })
  }
}
</script>
