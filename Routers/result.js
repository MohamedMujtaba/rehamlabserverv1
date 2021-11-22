const router = require('express').Router();
const Result = require('../Schema/Result');


router.post('/', async (req, res) => {
  const newResult = new Result({
    // userid:req.body.userid,
    user: req.body.user,
    tests: req.body.tests
  });
  try {
    const savedResult = await newResult.save();
    res.status(200).json(savedResult);
  } catch (err) {
    res.status(400).json(err);
  }
});


// Get All Results
// router.get('/is/:qur', async (req, res) => {
//   const date = new Date();
//       const year = date.getFullYear();
//       const month = date.getMonth() + 1;
//       const day = date.getDay();
//       const fullDate = `${year}-${month}-${day}`;
//   try {
//     const data = await Result.find();
//     if (req.params.qur === "today") {
//       const arr = data.filter((i) => {
//         let d = i.createdAt.toString().split(" ")
//         return `${i.createdAt.toString().split(" ")[3]}-${'10'}-${i.createdAt.toString().split(" ")[2]}` === fullDate
//       })
//       // const arr = data.map((i) => {
//       //   let d = i.createdAt.toString().split(" ")
//       //   return `${d[3]}-${d[1]}-${d[2]}`
//       // })
//       res.status(200).json(arr);
//   }
//   if (req.params.qur === "all") {
//     res.status(200).json(data);
//   }
//   } catch (err) {
//     res.status(404).json(err)
//   }
// });

router.get('/', async (req, res) => {
  try {
    const results = await Result.find();
    res.status(200).json(results)
  } catch (err) {
    console.log(err);
  }
})


// Get Singel Result 
router.get('/:id', async(req, res) => {
  try {
    const result = await Result.findById(req.params.id);
    res.status(200).json(result)
  } catch (err) {
    res.status(404).json(err)
  }
})

// Get User Results 
router.get('/userres/:userid', async (req, res) => {
  try {
    const data = await Result.find();
    const results = data.filter((i) => {
      return i.user._id === req.params.userid;
    });
    res.status(200).json(results)
  } catch (err) {
    res.status(400).json(err)
  }
})


// Update Result 
router.put('/:id', async (req, res) => {
  try {
    const updatedRes = await Result.findByIdAndUpdate(req.params.id, {
      $set:req.body
    }, { new: true });
    res.status(200).json(updatedRes)
  } catch (err) {
    res.status(400).json(err)
  }
})


module.exports = router