# IE213.M22-backend
Kỹ thuật phát triển hệ thống web - backend

In the project directory, you can run:
```
npm i
npm run dev
```
Runs the app in the development mode.
Open http://localhost:4000 to view it in the browser. Then, copy and paste some syntax below in a single tab

# I created 2 queries and 3 mutations
## getAllUsers
``
query getAllUsers {
  users {
    username
    password
  }
}
``
## getUserById 
``
query getUserById {
  user (_id:"6268031873d6d8a919fc5aed") {
    username
  }
}
``
## createUser
``
mutation createUser {
  createUser (username:"huutamcbt", password:"asdfgghjkl", email:"senshopdottech@gmail.com"){
    username
    password
    email
  }
}
``
## updateUser 
``
mutation updateUser {
  updateUser(username:"huutamcbt", newUsername:"huutamcbt") {
    username
    password
  }
}
``
## deleteUser
``
mutation deleteUser {
  deleteUser(username:"huutamcbt") {
    username
  }
}
``
