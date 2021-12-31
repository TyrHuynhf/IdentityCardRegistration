<template >
  <div class="match-height">
    <v-text-field
      style='max-width: 500px'
      dense
      outlined
      :prepend-inner-icon="icons.mdiMagnify"
      class="app-bar-search flex-grow-0"
      hide-details
      v-model='search'
      placeholder='Tìm kiếm'
    ></v-text-field>
    <v-data-table
      style='max-width: 600px'
      :headers="headers"
      :search='search'
      :items="cities"
      sort-by="registrationTime"
      class="elevation-1 "
      :footer-props="{
         'items-per-page-options': [5, 10, 20, 30, 40, 50],
         'items-per-page-text':'Số dòng mỗi trang',
       }"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>QUẢN LÝ TỈNH THÀNH</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <add-city-dialog @refresh='refresh'></add-city-dialog>
        </v-toolbar>
      </template>
      <template #item.detail='{item}'>
        <v-btn x-small color='error' @click='deleteCity(item.id)' ><v-icon small>{{icons.mdiDelete}}</v-icon></v-btn>
      </template>

    </v-data-table>
    <!-- Multiple Column -->
<!--    <v-col cols="12">-->
<!--      <v-card>-->
<!--        <v-card-title class='justify-center font-weight-black' >Quản lý tỉnh/ thành phố</v-card-title>-->
<!--        <template>-->
<!--          <v-simple-table dense>-->
<!--            <template v-slot:default>-->
<!--              <thead>-->
<!--              <tr>-->
<!--                <th class="text-uppercase text-center">-->
<!--                  Tỉnh/Thành phố-->
<!--                </th>-->
<!--                <th class="text-center text-uppercase">-->
<!--                  Mã tỉnh-->
<!--                </th>-->
<!--                <th class="text-center text-uppercase">-->
<!--                  Thao tác-->
<!--                </th>-->
<!--              </tr>-->
<!--              </thead>-->
<!--              <tbody>-->
<!--              <tr-->
<!--                v-for="item in cities"-->
<!--              >-->
<!--                <td class="text-center">{{ item.cityName }}</td>-->
<!--                <td class="text-center">{{ item.currentNumber }}</td>-->
<!--                <td class='text-center' ><v-btn x-small color='error' @click='deleteCity(item.id)' ><v-icon small>{{icons.mdiDelete}}</v-icon></v-btn></td>-->
<!--              </tr>-->
<!--              </tbody>-->
<!--            </template>-->
<!--          </v-simple-table>-->
<!--        </template>-->

<!--      </v-card>-->
<!--    </v-col>-->
  </div>
</template>

<script>
import axios from 'axios'
import addCityDialog from './addCityDialog'
import Swal from 'sweetalert2'
import { adminConfig } from '@/main'
import { mdiEyeOutline, mdiEyeOffOutline,mdiCalendar,mdiMagnify, mdiDelete, mdiMinus } from '@mdi/js'

export default {
  data(){
    return{
      headers:[
        {text: 'Tỉnh/Thành', value:'cityName', sortable: false, align: "start"},
        {text: 'Mã tỉnh', value: 'currentNumber'},
        {text: 'Thao tác', value: 'detail', sortable: false},

      ],
      search:'',
      cities:[],
      componentKey: 0,
      icons:{
        mdiDelete,
        mdiEyeOutline,
        mdiMinus,
        mdiMagnify
      }
    }
  },
  components: {
    addCityDialog
  },
  methods:{
    refresh(){
      this.$emit('refresh')
    },
    forceRerender(){
      this.componentKey += 1;
    },
    deleteCity(id){
      Swal.fire({
        title: 'Bạn có chắc chắn muốn xóa?',
        showConfirmButton: true, showCancelButton: true,
        confirmButtonText: 'Có',
        denyButtonText:'Hủy'
      }).then(result=>{
        let loader = this.$loading.show({
          // Optional parameters
          container: null,
          color: 'blue',
          backgroundColor: 'white',
          loader: 'bars',
          canCancel: false,
        });
        if(result.isConfirmed){
          axios.delete('http://localhost:3000/city/'+id)
          .then(res=>{
            Swal.fire('Xóa tỉnh thành công','','success')
            loader.hide()
            this.$emit('refresh')
          })
        }
        else if(result.isDismissed){
          loader.hide()
          Swal.fire('Đã hủy','','info')
        }
      })
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
        this.cities = data
      })
      .catch(err=>{
        console.log(err)
      })
  }
}
</script>
