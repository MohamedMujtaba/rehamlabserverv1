const router = require('express').Router();
const Test = require('../Schema/Test');


//  Create Test
router.post('/', async (req, res) => {
  const newTest = new Test({
    testName: req.body.testName,
    normal: req.body.normal,
    price: req.body.price,
    comments: req.body.comments
  });
  try {
    const savedTest = await newTest.save();
    res.status(200).json(savedTest);
  } catch (err) {
    res.status(400).json('Test Has not Been Created');
  }
})


// Get All Tests
router.get('/', async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (err) {
    res.status(400).json('Something Went Wrong');
  }
})


// Get One Test
router.get('/:id', async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    res.status(200).json(test);
  } catch (err) {
    res.status(404).json('Test Not Found');
  }
})


// Update A Test 
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await Test.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json('Test Has Not Been Updated');
  }
})

module.exports = router;