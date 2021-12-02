var faunadb = require('faunadb'),
  q = faunadb.query

  const online = true
  const secret = online ? process.env.onlineSecret : process.env.offlineSecret

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

exports.handler = async function(event, context, callback) {

  return client.query(
    Map(
      Paginate(Documents(Collection("Spaceships"))),
      Lambda('ref', Get(Var('ref')))
    )
  ).then((response) => {
    console.log("success", response)
    /* Success! return the response with statusCode 200 */
    return  callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    })
  }).catch((error) => {
    console.log("error", error)
    /* Error! return the error with statusCode 400 */
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}