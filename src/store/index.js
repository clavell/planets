import { createStore } from 'vuex'
import { useQuery, useResult } from '@vue/apollo-composable'
import allPlanetsQuery from '@/graphql/allPlanets.query.gql' // you can call it whatever you want on import!
import deletePlanetMutation from '@/graphql/deletePlanet.mutation.gql'
import createPlanetMutation from '@/graphql/createPlanet.mutation.gql'
import editPlanetMutation from '@/graphql/editPlanet.mutation.gql'

export default createStore({
  state: {
    online:true,
    planets: []
  },
  mutations: {
    SET_PLANETS(state,{planets}){
      state.planets = planets
    }
  },
  actions: {
    getPlanets({commit},){
      try{
        const {result} = useQuery(allPlanetsQuery)
        const planets = useResult(result, [], data => data.allPlanets.data)
        commit('SET_PLANETS', {planets}) 
      }catch(err){
        console.log(err)
      }
    }
  },
  modules: {
  }
})
