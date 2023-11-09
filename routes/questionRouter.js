const express = require('express')
const router = express.Router()
const Question = require('../models/question')



//CREATE
router.post('/createQuestion', async (req, res) => {
    const question = new Question({
        title: req.body.title
    })

    try {
        const newQuestion = await question.save()  //Save the question into database
        res.status(201).json(newQuestion)  //Succesful



    } catch (error) {
        res.status(400).json({ message: error.message })  //Something wrong with user's input

    }

})



//DISPLAY ALL
router.get('/showQuestions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions)

    } catch (error) {
        req.status(400).json({message: error.message})        

    }

})


//DISPLAY BY ID
router.get('/:id/showQuestion', getQuestion, async (req, res) => {
    try {
        res.json(res.question)

    } catch (error) {
        req.status(400).json({message: error.message})        

    }

})




//UPDATE
router.patch('/:id/updateQuestion', getQuestion, async (req, res) => {
    if(req.body.title != null){
        res.question.title = req.body.title
    }


    try {
        const updatedQuestion = await res.question.save()
        res.json(updatedQuestion)
    } catch (error) {
        req.status(400).json({message: error.message})
        
    }

})



//DELETE
router.delete('/:id/deleteQuestion', getQuestion, async (req, res) => {
    try {
        await res.question.deleteOne()
        res.json({message: "Question deleted"})
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }

})


//middleware
async function getQuestion(req, res, next){
    let question
    try {
        question = await Question.findById(req.params.id)
        if (question == null){
            return res.status(400).json({message: "Cannot find question"})
        }
    } catch (error) {
        return res.status(500).json({messgage: err.message})
        
    }

    res.question = question
    next() //allows us to move to actual request of method

}




module.exports = router