# apollo

## About
This is a vue 3 project based on the tutorial by Natalia Tepluhina that was featured on Jason Lengstorf's learn with Jason: https://www.learnwithjason.dev/build-apps-with-vue-3-apollo-client-3
(they used vue-apollo version 4 although it says version 3 in the title) 

I modified their code to use FaunaDB (https://faunadb.com) for the database, using the FQL endpoint for authentication and the GraphQL enpoint for CRUD operations. The site is hosted on netlify and uses netlify functions for serverside authentication.

Here are some screenshots showing operation, but go to https://focused-volhard-5cc142.netlify.app to try it out!


Here is the screen on load.  This is a bespoke application for Darth Vader is to keep track of planets to destroy! He's not good at remembering passwords, so we made it easy for him to log in. We feel fear of strangulation will keep malicious users out!

<img width="1280" alt="Screen Shot 2021-12-13 at 5 12 31 PM" src="https://user-images.githubusercontent.com/12875280/145914524-675d9ff1-d970-4d88-b392-53673f151bf3.png">

Upon logging in we see the planets he is already keeping track of:
<img width="1280" alt="Screen Shot 2021-12-13 at 5 12 38 PM" src="https://user-images.githubusercontent.com/12875280/145914791-45c86a38-5b24-459c-b149-f64b24a29dbe.png">

Let's add a planet


<img width="1280" alt="Screen Shot 2021-12-13 at 5 13 17 PM" src="https://user-images.githubusercontent.com/12875280/145915201-85f50430-c68f-4c34-a270-523a6952daf2.png">

Oops we mispelled Alderaan. If he finds out we're screwed! Let's edit it:

<img width="1280" alt="Screen Shot 2021-12-13 at 5 19 31 PM" src="https://user-images.githubusercontent.com/12875280/145915217-f1a988ba-ff19-4427-8b78-d0b8effb73f5.png">
<img width="1280" alt="Screen Shot 2021-12-13 at 5 20 16 PM" src="https://user-images.githubusercontent.com/12875280/145915235-b01a8694-6b7e-4f25-9ad6-7b2ca49578c4.png">

Okay fixed! What?? Alderaan's already been destroyed??? OK. Lets' remove it:
<img width="1280" alt="Screen Shot 2021-12-13 at 5 22 32 PM" src="https://user-images.githubusercontent.com/12875280/145915340-f6b22045-a48b-46e9-851c-636f76dec8c9.png">

There.. On to the next!
<img width="1280" alt="Screen Shot 2021-12-13 at 5 22 35 PM" src="https://user-images.githubusercontent.com/12875280/145915354-4ac28e5f-f2f4-4363-8b8c-5e4abedc8b25.png">

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
