import { createStore } from 'vuex'

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
    getPlanets({state,commit},{useQuery, useResult, allPlanetsQuery}){
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
