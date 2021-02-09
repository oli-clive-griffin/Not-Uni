const express = require('express')
const router = express.Router()

const modulesDb = require('../db/modulesDb')
const savedModulesDb = require('../db/savedModulesDb')

// GET /api/modules
router.get('/', (req, res) => {
  modulesDb.getAllModules()
    .then(modules => {
      modules = modules.map(module => {
        return modulesDb.getModuleElements(module.id)
          .then(elements => {
            module.elements = elements
            return module
          })
      })
      return Promise.all(modules)
    })
    .then(modules => {
      res.json(modules)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Something is broken' })
    })
})

//  GET /api/modules/created
// shows modules created by logged-in user
router.get('/created', (req, res) => {
  const user_id = 10001
  return modulesDb.getModulesByUserId(user_id)
  .then( createdModules => {
    res.json(createdModules)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: 'Something is broken' })
  })
})

// DEL /api/module/del/id

router.delete('/del/:id', (req, res) => {
  return modulesDb.deleteModule(req.params.id)
    .then(savedModules => {
      res.json(savedModules)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Something is broken' })
    })
})

//  GET /api/modules/saved
// shows the logged in person saved modules
router.get('/saved/:id', (req, res) => {
  return savedModulesDb.getSavedModules(req.params.id)
    .then(savedModules => {
      res.json(savedModules)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Something is broken' })
    })
})

// POST a saved module to the savedModulesDb
// saves a module to the users profile
router.post('/saved', (req, res) => {
  const newSave = req.body
  return savedModulesDb.addSavedModule(newSave)
  .then((id) => {
    newSave.id = id[0]
    res.json(newSave)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: 'Something is broken' })
  })
})

// CREATE A MODULE
router.post('/', (req, res) => {
  let { title, user_id, category, description, difficulty, duration, number_of_elements, elements} = req.body

  let moduleMeta = {
    title, 
    user_id, 
    category, 
    difficulty,
    description,
    duration, 
    number_of_elements
  }

  let moduleElements = [...elements]

  return modulesDb.createModuleMeta(moduleMeta)
    .then(module_id => {
      moduleElements.map((item, i) => {
        item.module_id = module_id[0]
        item.order_num = i
        // converts video links to "embed/"
        if (item.type === 'video'){
          let oldURL = item.content
          let newURL = oldURL.replace("watch?v=", "embed/")
          item.content = newURL
        }
      })

      moduleElements.map((element) => {
        console.log(element)

        return modulesDb.createModuleElement(element)
          .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Something is broken' })
          })
      })
    })
    .then(response => {
      res.json(response)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Something is broken' })
    })
})

//Update a module 
router.patch('/:id',(req,res) =>{
  const updatedModule = req.body
  const moduleID = req.params.id

  const updatedModuleMeta = {
    user_id: updatedModule.user_id,
    title: updatedModule.title,
    description: updatedModule.description,
    duration: updatedModule.duration,
    category: updatedModule.category,
    difficulty: updatedModule.difficulty,
    number_of_elements: updatedModule.number_of_elements,
  }
 

  const updatedElements = updatedModule.elements.map((item, i) => {
    item.module_id = moduleID
    item.order_num = i
    // converts video links to "embed/"
    if (item.type === 'video'){
      let oldURL = item.content
      let newURL = oldURL.replace("watch?v=", "embed/")
      item.content = newURL
    }
    return item
  })

  const deletedElements = updatedModule.deletedElements

  modulesDb.updateModuleMeta(moduleID, updatedModuleMeta)
    .then(() => {
      const elementUpdatePromises = updatedElements.map((element) => {
        if (element.id) {
          return modulesDb.updateElement(element)
        } else {
          return modulesDb.createModuleElement(element)
        }
      })

      return Promise.all(elementUpdatePromises)
      
    })
    .then(() => {
      const elementDeletePromises = deletedElements.map((id) => {
        return modulesDb.deleteElement(id)
      })
      
      return Promise.all(elementDeletePromises)
    })
    .then(response =>{
      res.json({response})
    })
    .catch((err)=>{
      console.log(err)
      res.status(500).json({ message:'something went wrong' })
    })
})


//delete Saved module
router.delete('/saved/:id', (req,res)=>{

  const id = req.params.id
  savedModulesDb.deleteSavedModule(id)
    .then(module =>{
      res.json({ module })
    })
    .catch((err)=>{
      console.log(err)
      res.status(500).json({ message:'something went wrong' })
    })
})



//Update a module's likes

router.patch('/likes/:id',(req,res) =>{
 
  const updatedModule = req.body
  const id = req.params.id

  modulesDb.updateModule(id, updatedModule)
    .then(updatedItems =>{
      res.json({updatedItems})
    })
    .catch((err)=>{
      console.log(err)
      res.status(500).json({message:'something went wrong'})
    })
})

module.exports = router
