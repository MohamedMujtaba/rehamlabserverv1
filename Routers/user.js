const router = require('express').Router();
const User = require('../Schema/User')


router.post('/', async (req,res)=>{
  const newUser = new User ({
    name : req.body.name,
    address: req.body.address,
    age : req.body.age,
    gender: req.body.gender,
    phone: req.body.phone
  })
  try{
    const savedUser = await newUser.save()
    res.status(200).json(savedUser)
  }catch(err){
    res.status(400).json('User Not created')
  }
})



router.get('/',async (req,res)=>{
  try{
    const users = await User.find();
    res.status(200).json(users)
  }catch(err){
    res.status(400).json('Something Whent Wrong')
  }
});

router.get('/:id',async (req,res)=>{
  try{
    const user = await User.findById(req.params.id);
    res.status(200).json(user)
  }catch(err){
    res.status(404).json('User Not Found')
  }
})




// Update User 
router.put('/:id',async (req, res) => {
  try {
    const updetedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true });
    res.status(200).json(updetedUser);
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router;