const express = require('express')
const router = express.Router()
const Option = require('../models/option')
const Question = require('../models/question')

//ADD A VOTE
router.post('/:id/addVote', async (req, res) => {

    try {
        let id = req.params.id;

        // check if the option exists for the question, add a new vote by incrementing 1
        await Option.findByIdAndUpdate(id, { $inc: { votes: 1 } });

        return res.status(200).json({

            message: "Voted Successfully!!"

        });



    } catch (error) {
        res.status(400).json({ message: error.message })  //Something wrong with user's input

    }


})




//CREATE
router.post('/:id/createOption', getQuestion, async (req, res) => {
    const option = new Option({
        title: req.body.title,
        question: req.body.id
    })

    try {
        const newOption = await option.save()  //Save the option into database
        res.question.options.push(option); //Save option in array
        res.question.save();
        res.status(201).json(newOption)  //Successful



    } catch (error) {
        res.status(400).json({ message: error.message })  //Something wrong with user's input

    }


})


//DISPLAY ALL
router.get('/:id/showOptions', async (req, res) => {
    let question
    let option
    let optionsArray = []
    try {
        question = await Question.findById(req.params.id)
        if (question == null){
            return res.status(400).json({message: "Cannot find question"})
        }

        const options = question.options;
        for( let i = 0; i < options.length; i++ ){
            option = await Option.findById(options[i])
            optionsArray.push(option)
        }
        
        res.json(optionsArray)

    } catch (error) {
        res.status(400).json({ message: error.message })        

    }

})




//UPDATE
router.patch('/:id/updateOption', async (req, res) => {

    try {
        //Check if option exists
        let option
        option = await Option.findById(req.params.id)
        if (option == null) {
            return res.status(400).json({ message: "Cannot find option" })
        }else{
            res.option = option;
        }


        if (req.body.title != null) {
            res.option.title = req.body.title
        }
        if (req.body.votes != null) {
            res.option.votes = req.body.votes
        }



        const updatedOption = await res.option.save()
        res.json(updatedOption)

        res.question.options.push(updatedOption); //Save option in array
        res.question.save();

    } catch (error) {
        res.status(400).json({ message: error.message })

    }

})



//DELETE
router.delete('/:id/deleteOption', async (req, res) => {

    try {
        //Check if option exists
        let option
        option = await Option.findById(req.params.id)
        if (option == null) {
            return res.status(400).json({ message: "Cannot find option" })
        }else{
            res.option = option;
        }
        


        await res.option.deleteOne()
        res.question.options.pull(option); //Delete option from array
        res.question.save();
        res.json({message: "Option deleted"})

    } catch (error) {
        res.status(400).json({ message: error.message })

    }

})



//middleware
async function getQuestion(req, res, next) {
    let question
    try {
        question = await Question.findById(req.params.id)
        if (question == null) {
            return res.status(400).json({ message: "Cannot find question" })
        }
    } catch (error) {
        return res.status(500).json({ messgage: err.message })

    }

    res.question = question
    next() //allows us to move to actual request of method

}




module.exports = router