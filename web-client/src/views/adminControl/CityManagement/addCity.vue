<template>
  <v-row class="match-height">
    <v-col cols="12">
      <v-card>
        <v-card-title class='justify-center font-weight-black' >Them Thanh Pho</v-card-title>
        <br>
        <v-card-text>
          <v-form class="multi-col-validation" ref='form'>
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="payload.cityName"
                  label="Tinh Thanh"
                  outlined
                  :rules='defaultRules'
                  dense
                  placeholder="Can Tho"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="payload.currentNumber"
                  label="So hieu"
                  outlined
                  dense
                  type='number'
                  :rules='defaultRules'
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-btn color="primary" @click.prevent='addCity'>
                  Them
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import axios from 'axios'
import { adminConfig } from '@/main'
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      payload: {
        citiName: '',
        currentNumber: '',
      },
      defaultRules: [
        v => !!v || 'Required'
      ]
    }
  },
  methods: {
    addCity() {
      let loader = this.$loading.show({
        // Optional parameters
        container: null,
        color: 'blue',
        backgroundColor: 'white',
        loader: 'bars',
        canCancel: false,
      });

      if (this.$refs.form.validate()) {
        axios.post('http://localhost:3000/city', this.payload, adminConfig)
          .then(res => {
            loader.hide()
            Swal.fire({
              title: 'Them tinh thanh cong!',
              icon: 'success',
            })

          })
          .catch(err => {
            loader.hide()
            console.log(err)
          })
      }
    },
  }
}
</script>