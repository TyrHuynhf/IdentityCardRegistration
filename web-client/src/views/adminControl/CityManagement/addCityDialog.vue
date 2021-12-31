<template>
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="800"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="#1E88E5"
            v-bind="attrs"
            v-on="on"
            style='color: #f4f5fa'
          > <v-icon left>{{icons.mdiPlus}}</v-icon>Thêm tỉnh/thành phố</v-btn>
        </template>
        <template v-slot:default="dialog">
            <v-card class='justify-content: center' >
              <v-toolbar
                color="primary"
                dark
                style='justify-items: center; color: White'

              ><h3 >Thêm tỉnh/thành phố</h3></v-toolbar>
              <br>
              <v-form class="multi-col-validation" ref='form'>
                <v-row style='padding: 10px'>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="payload.cityName"
                      label="Tỉnh/Thành phố"
                      outlined
                      :rules='defaultRules'
                      dense
                      placeholder="Cần Thơ"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="payload.currentNumber"
                      label="Mã tỉnh"
                      outlined
                      dense
                      type='number'
                      :rules='currentNumberRules'
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
              <v-divider></v-divider>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="addCity"
                  color='primary'
                >Thêm</v-btn>
                <v-btn
                  text
                  @click="dialog.value = false"
                  color='#E1BEE7'
                >Đóng</v-btn>
              </v-card-actions>
            </v-card>

        </template>
      </v-dialog>

</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { adminConfig } from '@/main'
import {mdiPlus} from '@mdi/js'
export default {
  data(){
    return{
      payload: {
        cityName: '',
        currentNumber: '',
      },
      icons:{
        mdiPlus
      },
      defaultRules: [
        v => !!v || 'Bắt buộc'
      ],
      currentNumberRules: [
        v=> (v.length == 3) || "Mã tỉnh gồm 3 chữ số",
        v=> !!v || "Bắt buộc"
      ]

    }
  },
  methods: {
    addCity() {
      if (this.$refs.form.validate()) {
        let loader = this.$loading.show({
          // Optional parameters
          container: null,
          color: 'blue',
          backgroundColor: 'white',
          loader: 'bars',
          canCancel: false,
        });
        axios.post('http://localhost:3000/city', this.payload, adminConfig)
          .then(res => {
            loader.hide()
            Swal.fire({
              title: 'Thêm tỉnh thành công!',
              icon: 'success',
            })
            this.$emit('refresh')
          })
          .catch(err => {
            loader.hide()
            Swal.fire({
              title: 'Thêm tỉnh không thành công',
              icon: 'error',
            })
            console.log(err)
          })
      }
      // }

    },
  }
 }
</script>
<style>
.v-toolbar__content, .v-toolbar__extension {
  justify-content: center;
}
</style>