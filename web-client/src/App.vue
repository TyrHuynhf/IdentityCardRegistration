<template>
  <component :is="resolveLayout">
    <router-view></router-view>
  </component>
</template>

<script>
import { computed } from '@vue/composition-api'
import { useRouter } from '@/utils'
import LayoutBlank from '@/layouts/Blank.vue'
import LayoutContent from '@/layouts/Content.vue'
import LayoutAdmin from '@/layouts/AdminContent.vue'
import LayoutPolice from '@/layouts/PoliceContent.vue'
import { USER_REQUEST } from '@/store/actions/authAction'

export default {
  components: {
    LayoutBlank,
    LayoutContent,
    LayoutAdmin,
    LayoutPolice
  },
  setup() {
    const { route } = useRouter()

    const resolveLayout = computed(() => {
      // Handles initial route
      // const user = localStorage.getItem('user')
      // if(user.role == 'adminControl' || user.role == 'police') return route.value.meta.layout = 'adminControl'
      if (route.value.name === null) return null

      if (route.value.meta.layout === 'blank') return 'layout-blank'
      if (route.value.meta.layout === 'police') return 'layout-police'
      if (route.value.meta.layout === 'admin') return 'layout-admin'
      return 'layout-content'
    })

    return {
      resolveLayout,
    }
  },
  created() {
    // if (this.$store.getters.isAuthenticated) {
    //   this.$store.dispatch(USER_REQUEST)
    // }
    // const user = localStorage.getItem('user');
    // console.log(user)
    // if(user.role == 'adminControl' || user.role == 'police') return this.route.value.meta.layout = 'adminControl'
  },
}
</script>
