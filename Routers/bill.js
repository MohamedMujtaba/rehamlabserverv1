const router = require('express').Router();
const Bill = require('../Schema/Bill');



// Create Bill
router.post('/', async (req, res) => {
  const newBill = new Bill({
    user: req.body.user,
    tests: req.body.tests,
    total: req.body.total,
    insurance: req.body.insurance,
    insuranceNumber: req.body.insuranceNumber
  });
  try {
    const savedBill = await newBill.save();
    res.status(200).json(savedBill);
  } catch (err) {
    res.status(400).json('Something Whent Wrong');
  }
})



// Get All Bills
router.get('/is/:qra', async (req, res) => {
  try {
    const data = await Bill.find();
    if (req.params.qra === "notready") {
      const bills = data.filter((i) => {
        return i.done === false
      })
      res.status(200).json(bills);
    } if (req.params.qra === "all") {
      res.status(200).json(data);
    }

  } catch (err) {
    res.status(404).json(err);
  }
});


// Get Single Bill
router.get('/:id', async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    res.status(200).json(bill);
  } catch (err) {
    res.status(404).json('err');
  }
});
// Get Single Bill
router.get('/userbills/:userid', async (req, res) => {
  try {
    const data = await Bill.find();
    const allBills = data.filter((i) => {
      return i.user._id === req.params.userid;
    })
    const bills = allBills.filter((i) => {
      return i.done === false
    })
    res.status(200).json(bills);
  } catch (err) {
    res.status(404).json(err);
  }
});


// Update Bill
router.put('/:id', async (req, res) => {
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id,
      { $set: req.body },
      { new: true })
    res.status(200).json(bill)
  } catch (err) {
    res.status(400).json(err)
  }
})

// Delete Bill

router.delete('/:id', async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id)
    res.status(200).json('Bill has been deleted')
  } catch (err) {
    res.status(400).json(err)
  }
})



module.exports = router;