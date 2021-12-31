<template>
  <v-row class="match-height">

    <!-- Multiple Column -->
    <v-col cols="12">
      <v-card>
        <v-card-title class='justify-center font-weight-black' >QUẢN LÝ TÀI KHOẢN CÔNG AN</v-card-title>
        <template>
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-uppercase text-center">
                  Tài khoản
                </th>
                <th class="text-center text-uppercase">
                  Số điện thoại
                </th>
                <th class="text-center text-uppercase">
                  Ngày sinh
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                v-for="item in policeUsers"
              >
                <td class="text-center">{{item.fullName}}</td>
                <td class="text-center">{{item.phoneNumber}}</td>
                <td class="text-center">{{item.dateOfBirth}}</td>
<!--                <td class="text-center">-->
<!--&lt;!&ndash;                  <get-user-info></get-user-info>&ndash;&gt;-->
<!--                </td>-->
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title class='justify-center font-weight-black' >QUẢN LÝ TÀI KHOẢN CÔNG DÂN</v-card-title>
        <template>
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-uppercase text-center">
                  Tài khoản
                </th>
                <th class="text-center text-uppercase">
                  Số điện thoại
                </th>
                <th class="text-center text-uppercase">
                  Ngày sinh
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                v-for="item in citizenUsers"
              >
                <td class="text-center">{{item.fullName}}</td>
                <td class="text-center">{{item.phoneNumber}}</td>
                <td class="text-center">{{item.dateOfBirth}}</td>
                <!--                <td class="text-center">-->
                <!--&lt;!&ndash;                  <get-user-info></get-user-info>&ndash;&gt;-->
                <!--                </td>-->
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'
import { adminConfig } from '@/main'
export default {
  data(){
    return{
      citizenUsers:[],
      policeUsers:[],
      statusColor : {
        registered: 'success',
        rejected: 'error',
        pending: 'warning',
        approved: 'info',
      },
      status: {
        1: 'Current',
        2: 'Professional',
        3: 'Rejected',
        4: 'Resigned',
        5: 'Applied',
      },
    }
  },
  methods:{
    rerender(){
      this.$emit('refresh')
    }
  },
  components: {

  },
  setup() {
    return {

    }
  },
  created() {
    axios.get('http://localhost:3000/users/citizens', adminConfig)
    .then(res=>{
      const data = JSON.parse(JSON.stringify(res.data))
      this.citizenUsers = data
    })
    .catch(err=>{
      console.log(err)
    })

    axios.get('http://localhost:3000/users/polices', adminConfig)
      .then(res=>{
        const data = JSON.parse(JSON.stringify(res.data))
        this.policeUsers = data
      })
      .catch(err=>{
        console.log(err)
      })
  }
}
</script>
