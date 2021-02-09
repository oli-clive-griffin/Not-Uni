# Not-Uni

 http://not-uni.herokuapp.com/ 

## Getting Started

If you'd like to add to our project here's how to get started:
```
cd workspace
git clone + https link
cd myRepo
git checkout -b feature/yourFeatureName
code .
npm i
npm run knex migrate:latest
npm run knex seed: run
npm run dev
```
You should be good to go! Remember to checkout and pull from the development branch regularly to ensure your feature branch is not too behind updates. Also checkout the Git Protocol at the bottom of this ReadMe for further details.

### Having Problems?
If you're having problems it could be because you do not have the .env file set up correctly. Come and see us or send us a message and we can try and help.


#### Major Components

| Route | Component | Notes |
|---|---|---|
| / | App | Root Component |
| / | Nav | Shows on all pages |
| / | Search Modules | 
| /categories | View All Categories |
| /categories/:name | View all modules for selected category
| /module/:id | View individual module 
| /login | Login | NOT Authenticated |
| /register | Register | NOT Authenticated |
| /profile | User profile, view saved and created modules | Authenticated |
| /create |      | Authenticated |
|---|---|---|



#### Components & Children

App\
\
-- Nav\
-- -- Login\
-- -- Register\
\
Home\
\
Categories\
\
-- Module-Card\
-- -- Module\
\
Profile\
\
-- Module-Card\
-- Create-Module


## Design 

We have used Figma for our design and Wireframe production, check it out below.
https://www.figma.com/file/viw35yDcmX5tLEWZEVabHJ/Dev-Final-Project?node-id=30%3A0


## Database

We have used dbdiagram.io for our database design. Check it out below.
*we have used Firebase for our users table
![database diagram](/pics/database-diagram.png)



## Routes

| Method | Path | Description | NOTES |
|---|---|---|---|
| POST | /api/v1/register | adds a user - registering them | Firebase
| POST | /api/v1/login | logging in a user and getting user info from DB | Firebase
| GET | /api/v1/modules | gets all modules available
| GET | /api/v1/modules/:moduleID | gets one module
| GET | /api/v1/modules/saved | shows the logged in persons saved modules
| GET | /api/v1/modules/created | shows modules created by logged-in user
| POST | /api/v1/modules/saved/:id | saves a module to users profile
| GET | /api/v1/profile (?) | Get the user information
|---|---|---|---|


## Global State


```javascript

hasLoaded: {
  authHasLoaded: false,
  modulesHaveLoaded: false,
 }
 
isAuthenticated: true

user: {
  displayName: str,
  email: str,
  uid: str,
  saved:[module_id,module_id],
  created:[module_id,module_id],
}

modules: [
  {
    id: 101,
    title: 'Intro To JavaScript',
    user_id: 10001,
    category: 'JavaScript',
    duration: 15,
    number_of_elements: 5,
    description: str,
    elements: [
      {
        id: 900000,
        module_id: 101,
        type: 'heading',
        content: 'heading 1',
        order_num: 1
      },
      {
        id: 900001,
        module_id: 101,
        type: 'paragraph',
        content: 'lorum ispum belatio relatio conflatio',
        order_num: 2
      }     
    ]
  }
]

searchModules:[
{
        id: int,
        title: str
        user_id: int,
        catergory: tag, //"javascript"
        duration: int,
        description: str,
        number_of_elements: int,
        elements: []
      },

]
    
```
## Auth

Helper info: https://medium.com/firebase-developers/how-to-setup-firebase-authentication-with-react-in-5-minutes-maybe-10-bb8bb53e8834

## Git Protocol
courtesy of Hortense:

* Clone & Make a branch Steps 1 - 4
* Merge your feature Steps 5 - 11

## 1. Clone
```
cd workspace
git clone + https link
cd myRepo
```
## 2. Make a branch using the name of your feature
```
git checkout -b feature/aFeature  
code .  
```
## 3. Instal modules & reset the database
```
npm i
npm run knex migrate:latest
npm run knex seed:run
```
## 4. Commit & Push your branch
```
git status 
git add .  
git commit -m “commit message”  
git push origin myBranch  
```


# MERGE TIME!! 
* Feature is done, ready to create a pull request to Development?? 

## 5. Commit your branch
```
git add .  
git commit -m “readyToMerge”   
```

## 6. Pull Development into your branch, open VScode & deal with the conflicts there.

```
git pull origin Development
code .
```
## 7. Vscode

* Files marked C = Conflict
* Files marked M = Modified
* <<<<< Head  = This is you! Current changes, you are HEAD
* <<<<<< Incoming change = pulled in from the Development branch

## 8. Any conflicts or changes need to be saved, added, & committed again

```
git add .
git commit -m “mergeTime”
git push origin myBranch
```
## 9. Github - create pull request

* Create pull request from mybranch to Development (on github)
* Tell the git keeper, they will merge the pull request and there should be 0 conflicts as you have already resolved these in your branch.

# Create a new branch with a new name
```
git checkout -b feature/myNextFeature  
code .  
```

* Reset database
```
rm server/db/dev.sqlite3
npm run knex migrate:latest
npm run knex seed:run
```
