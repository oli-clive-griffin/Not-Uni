const { response } = require('express')
const express = require('express')
const router = express.Router()

const commentsDB = require('../db/commentsDB')

//  GET /api/comments/created
router.get('/:id', (req, res) => {
  const id = req.params.id
  return commentsDB.displayComment(id)
    .then(modules => {
      res.json(modules)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Something is broken' })
    })
})

router.post('/:id', (req, res) => {
  const module_id = req.params.id
  const user_name = req.body.userName
  const content = req.body.content
  const comment = {
    module_id,
    user_name,
    content
  }
  console.log(comment)

  return commentsDB.addComment(comment)
    .then(response => {
      res.json(response)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Something is broken' })
    })
})
module.exports = router
