<template>
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
      :items="test"
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
          <v-toolbar-title>QUẢN LÝ NGƯỜI ĐĂNG KÝ</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>

    </v-data-table>
    <!-- Multiple Column -->
<!--    <v-col cols="12">-->
<!--      <v-card>-->
<!--        <v-card-title class='justify-center font-weight-black' >QUẢN LÝ TÀI KHOẢN NGƯỜI ĐĂNG KÝ</v-card-title>-->
<!--        <template>-->
<!--          <v-simple-table dense>-->
<!--            <template v-slot:default>-->
<!--              <thead>-->
<!--              <tr>-->
<!--                <th class="text-uppercase text-center">-->
<!--                  Tài khoản-->
<!--                </th>-->
<!--                <th class="text-center text-uppercase">-->
<!--                  Số điện thoại-->
<!--                </th>-->
<!--                <th class="text-center text-uppercase">-->
<!--                  Ngày sinh-->
<!--                </th>-->
<!--              </tr>-->
<!--              </thead>-->
<!--              <tbody>-->
<!--              <tr-->
<!--                v-for="item in test"-->
<!--              >-->
<!--                <td class="text-center">{{item.fullName}}</td>-->
<!--                <td class="text-center">{{item.phoneNumber}}</td>-->
<!--                <td class="text-center">{{item.dateOfBirth}}</td>-->
<!--&lt;!&ndash;                <td class="text-center">&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                  <get-user-info></get-user-info>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                </td>&ndash;&gt;-->
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
import getUserInfo from './getUserInfo'
import axios from 'axios'
import { config, policeConfig } from '@/main'
import {mdiMagnify} from "@mdi/js"
export default {
  data(){
    return{
      test:[],
      ty:[],
      headers:[
        {text: 'Tài khoản', value:'fullName', sortable: false, align: "start"},
        {text: 'Số điện thoại', value: 'phoneNumber'},
        {text: 'Ngày sinh', value: 'dateOfBirth', sortable: false},
      ],
      search:'',
      icons:{
        mdiMagnify
      }
    }
  },
  methods:{
    rerender(){
      this.$emit('refresh')
    }
  },
  components: {
    getUserInfo
  },
  setup() {

    return {

    }
  },
  created() {
    axios.get('http://localhost:3000/users/citizens', policeConfig)
    .then(res=>{
      const data = JSON.parse(JSON.stringify(res.data))
      this.test = data

    })
    .catch(err=>{
      console.log(err)
    })
  }
}
</script>
