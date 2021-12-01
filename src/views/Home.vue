<template>
<img alt="Vue logo" src="@/assets/logo.png">
  <form @submit.prevent="handleSubmit">
        <label>planet name:</label>
        <input
          type="text"
          v-model="planetname"
          placeholder="Add Entry"
          class="field"
        />
        <label>planet type:</label>
        <input
          type="text"
          v-model="type"
          placeholder="Add Entry"
          class="field"
        />
        <label>planet color:</label>
        <input
          type="text"
          v-model="color"
          placeholder="Add Entry"
          class="field"
        />
        <button type="submit">{{planetButtonText}}!</button>

      </form>
      <button @click="func">func me</button>
  <ul>
    <li v-for="planet in planets" :key="planet.name">
      <h2>
        {{ planet.name }}
        {{ planet.type }}
        {{ planet.color }}
      </h2>
      <button @click="editPlanet(planet)">Edit this planet</button>
      <button @click="deletePlanet(planet)">Delete this planet</button>
      
    </li>
  </ul>
  
</template>

<script>

import { useMutation, useQuery, useResult } from '@vue/apollo-composable'
import allPlanetsQuery from '@/graphql/allPlanets.query.gql' // you can call it whatever you want on import!
import deletePlanetMutation from '@/graphql/deletePlanet.mutation.gql'
import createPlanetMutation from '@/graphql/createPlanet.mutation.gql'
import editPlanetMutation from '@/graphql/editPlanet.mutation.gql'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    


    
    
    const {result} = useQuery(allPlanetsQuery)
    const planets = useResult(result, null, data => data.allPlanets.data)
    const {mutate: deletePlanet} = useMutation(deletePlanetMutation,() => ({
 
      update: (cache, { data: { deletePlanet } }) => {
        const data = cache.readQuery({ query: allPlanetsQuery })
        const newData = data.allPlanets.data.filter(planet => planet._id != deletePlanet._id)
        const newAllPlanets = {...data.allPlanets,data:newData}
        cache.writeQuery({ query: allPlanetsQuery, data: {...data, allPlanets:newAllPlanets}})
      },
    }))

    const { mutate: createPlanet } = useMutation(createPlanetMutation, () => ({
      update: (cache, { data: { createPlanet } }) => {
        const data = cache.readQuery({ query: allPlanetsQuery })
        const newData = [...data.allPlanets.data].concat([createPlanet])
        const newAllPlanets = {...data.allPlanets,data:newData}
        cache.writeQuery({ query: allPlanetsQuery, data: {...data, allPlanets:newAllPlanets}})
      }
    }))

    const { mutate: updatePlanet } = useMutation(editPlanetMutation)

    const planetname = ref('Mercury')
    const type = ref("TERRESTRIAL")
    const color = ref("BROWN")

    const edit = ref(false)

    const planetButtonText = computed(() => {
      if(edit.value) {
        return 'Change Planet!'
      } else {
        return 'New Planet!'
      }
    })

    const handleSubmit = () => {
      if(edit.value){
        console.log(edit.value)
        updatePlanet({id:edit.value, planetData:{name:planetname.value, type:type.value, color:color.value}})
      }else {
        createPlanet({planet:{name:planetname.value, type:type.value, color:color.value}})
      }
      edit.value = false
    }

    const editPlanet = (planet) => {
      edit.value = planet._id
      planetname.value = planet.name
      type.value = planet.type
      color.value = planet.color
    }

    const func =  function() {
      // const response = await fetch('/.netlify/functions/get-planets')
      // console.log(response.text())
      // console.log(sessionStorage.token)
      sessionStorage.token = null
      // console.log(sessionStorage.token)
      router.push({
        name:'Login'
      })
    }


    return {planets, deletePlanet, planetname, handleSubmit, type, color, editPlanet, planetButtonText, func}
  }
}
</script>  

