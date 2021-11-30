import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, createHttpLink, InMemoryCache, } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import App from './App.vue'
import { offlineSecret, onlineSecret } from './secrets';

//switch for whehter online or offline database
const online = true

const secret = online ? process.env.onlineSecret : offlineSecret 

var faunadb = require('faunadb'),
  q = faunadb.query

  var client = new faunadb.Client({
    secret,
    domain: online ? 'db.fauna.com' : 'localhost',
    // NOTE: Use the correct domain for your database's Region Group.
    scheme: online ? 'https' : 'http',
    port: online ? 443 : 8443
  })


const { Create, Collection, CreateCollection, Ref, Get, Update,Map, Documents, Paginate,Var,Lambda, Delete, Collections, CreateIndex, Index, Match, Indexes } = q

const PicardId = "316441675078566400"
const enterpriseId = "316443571709280768"
const enterpriseDId ="316442075040055808"
const JanewayId = "316467714116813312"
const VoyagerId = "316473288806105600"
const SoloId = "316467779572072960"
const falconID = "316473370558333440"

//CREATE COLLECTION
// client.query(CreateCollection({name:"Spaceships"}))


//CREATE DOCUMENT
// client.query(
// Create(
//   Collection("Spaceships"),
//     {
//       data: {
//         name: "Falcon",
//         pilot: Ref(Collection('Pilots'), SoloId)
//       }
//     })
// ).then((res) => {
//   console.log(res)
// })

//GET DOCUMENT
// client.query(
// Get(Ref(Collection("Spaceships"), enterpriseId))
// ).then((res) => {
//   console.log(res)
// })

//UPDATE DOCUMENT
// client.query(
//   Update(Ref(Collection("Spaceships"), enterpriseId),{
//     data: {
//       name: 'Enterprise E'
//     }
//   })
// ).then((res) => {
//   console.log(res)
// })

//GET EVERYTHING FROM A COLLECTION (this just returns the references)
// client.query(
//   Paginate(Documents(Collection("Pilots")))
// ).then((res) => {console.log(res)})

//GET EVERYTHING FROM A COLLECTION AND RETURN THE INFORMATION INSIDE
// client.query(
//   Map(
//     Paginate(Documents(Collection("Spaceships"))),
//     Lambda('ref', Get(Var('ref')))
//   )
// ).then((res) => {console.log(res)})

//LIST THE COLLECTIONS
// client.query(Paginate(Collections())).then((res => {console.log(res)}))

//DELETE
// client.query(
//   Delete(Ref(Collection('Pilots'), "316467941636833792"))
// ).then((res) => {
//   console.log(res)
// })

//CREATE AN INDEX
// client.query(
//   CreateIndex({
//     name: 'allPilots',
//     source: Collection('Pilots')
//   })
// ).then((res) => {
//   console.log(res)
// })


//RETRIEVE ALL RESULTS FROM AN INDEX
// client.query(
//   Map(
//     Paginate(Match(Index('allPilots'))),
//     // (ref) => {return Get(ref)}
//     Lambda('ref',Get(Var('ref')))
//   )
// ).then((res) => {console.log(res)})

//CREATE INDEX THAT SORTS BY NAME
// client.query(
//   CreateIndex({
//     name:'allPilotsSortedByName',
//     source: Collection("Pilots"),
//     values: [
//       {field: ['data', 'name']},
//       {field: ['ref']}
//     ]
//   })
// ).then((res) => {console.log(res)})

//INDEX THAT RETRIEVES PLANET BY color 
// client.query(
//   CreateIndex({
//     name:'planetByColor',
//     source: Collection('Planet'),
//     terms:[
//       {field: ['data','color']}
//     ]
//   })
//   ).then((res) => {console.log(res)})

//DELETE AN INDEX
// client.query(
//   Delete(Index('planetByColor'))
// ).then((res) => {console.log(res)})

//USE AN INDEX that has an input term
// client.query(
//   Map(
//     Paginate(Match(Index('planetsByType'), 'GAS')),
//     Lambda('ref', Get(Var('ref')))

//   )
// ).then((res) => {console.log(res)})

//NEW THOUGHT FOR QUERY
client.query(
  Map(
    Paginate(Match(Index('planetsByType'), 'GAS')),
    Lambda('ref', Get(Var('ref')))

  )
).then((res) => {console.log(res)})



//SHOW ALL INDEXES
// client.query(
//   Paginate(Indexes())
// ).then((res) => {console.log(res)})



//RETRIEVE RESULTS FROM ANOTHER INDEX
// client.query(
//   Paginate(Match(Index('allPilotsSortedByName')))
// ).then((res) => {
//   console.log(res)
// })





//HERE IS SOME FAUNADB FQL STUFF THAT I DON'T THINK EVER WORKED
  // var createP = client.query(
  //   q.Create(
  //     q.Collection('Planet'),
  //     { data: { name:'Mercury',type:'TERRESTRIAL', Color:'BROWN' } }
  //   )
  // )

  // var fetchP = client.query(
  //   q.Map(
  //     q.Paginate(q.Documents(q.Collection("Planet"))),
  //     q.Lambda(planet=> q.Get(planet))
  //   )
  // )

  // var fetchP = client.query(
  //     q.Get(q.Ref(q.Collection('Planet'), '316001830436864593'))
  //   )

  // fetchP.then((ret) => console.log(ret))
  // .catch((err) => console.error('Error: %s', err))
//


//HERE WE CREATE AN APOLLO CLIENT THAT WORKS
  const httpLink = createHttpLink({
    uri: online ? 'https://graphql.fauna.com/graphql' : 'http://localhost:8084/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('token');
    // const token = 'fnAEYqm3KmACQaJXMvNR-5GykOqml1g-mnS6FCdN' //online secret
    // const token = 'fnAEYqiyOZACAHeAJMih8z46VBNKnhVxA5QLvLia' //offline secret
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${secret}`,
      }
    }
  });
  
const defaultClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

//HERE IS AN ATTEMPTE AT A MUTATION THAT FAILED
// const PlanetCreate = gql`
// mutation CreateAPlanet {
//   createPlanet(data: {
//   name: "Venus"
//   type: "TERRESTRIAL"
//   color: "GREEN"
//   }) {
//       name
//       color
//   }
// }
// `

// defaultClient.mutate({
//   query: PlanetCreate
// }).then(res => console.log(res))

//THE BELOW QUERY WORKS
// const query1 = gql`
//  query allPlanets{
//         allPlanets{
//           data {
//             name
//             type
//             color
//           }
//         }
//       }
// `

// defaultClient.query({
//   query: query1
// }).then(res => console.log(res))
//ABOVE WORKS UP TO WHERE IT SAYS 'BELOW QUERY WORKS'

//HERE IS A QUERY TO THE GRAPHQL ENDPOINT THAT WORKS WITH JUST THE STANDARD JAVASCRIPT FETCH API
// fetch('https://graphql.fauna.com/graphql', {
//   method: 'POST',

//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "Bearer fnAEYqm3KmACQaJXMvNR-5GykOqml1g-mnS6FCdN"
//   },

//   body: JSON.stringify({
//     query: `
      // query{
      //   allPlanets{
      //     data {
      //       name
      //     }
      //   }
      // }
//     `
//   })
// })
// .then(res => {
//   console.log(res)
//   console.log(res.json())
// })
// .then(data => console.log(data.data))





createApp({
  setup () {
    provide(DefaultApolloClient, defaultClient)
  },

  render: () => h(App),
}).mount('#app')
