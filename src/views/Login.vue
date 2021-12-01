<template>
  <div class="about">
    <h1>Log Darth Vader in with a click!</h1>
    <button @click="log_darth_in">Login</button>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'
export default {
  name:'Login',
  setup() {
    const router = useRouter()
    const log_darth_in = async () => {
      const response = await fetch('/.netlify/functions/log-in-darth')
      // console.log(sessionStorage.token)
      sessionStorage.token = await response.text()
      // console.log(sessionStorage.token)
      router.push({name: 'HomeRoute'})
    }

    return { log_darth_in}
  },
}
</script>

