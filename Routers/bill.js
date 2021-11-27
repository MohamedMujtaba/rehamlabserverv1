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
// Get user Bill
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


// Get Stats

router.get('/get/stats', async (req, res) => {
  var start = new Date();
  start.setHours(0, 0, 0, 0);
  var end = new Date();
  end.setHours(23, 59, 59, 999);
  start.setHours(0, 0, 0, 0);
  var month = new Date().getMonth() + 1;
  const year = new Date().getFullYear()
  console.log(year);
  try {
    // Today
    const dayBills = await Bill.find({ createdAt: { $gte: start, $lt: end } });
    const dayIncome = dayBills.map((i) => {
      return i.total
    }).reduce((partial_sum, a) => partial_sum + a, 0)


    // Yesterday


    // This Week
    const weekBills = await Bill.find({
      timestamp: {
        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
      }
    });
    const weekIncome = weekBills.map((i) => {
      return i.total
    }).reduce((partial_sum, a) => partial_sum + a, 0)
    // This month
    const monthBills = await Bill.find({
      $expr: {
        $eq: [{ $month: "$createdAt" }, month]
      }
    });
    const monthIncome = monthBills.map((i) => {
      return i.total
    }).reduce((partial_sum, a) => partial_sum + a, 0)

    // This year
    const yearBills = await Bill.find({
      $expr: {
        $eq: [{ $year: "$createdAt" }, year]
      }
    });
    const yearIncome = yearBills.map((i) => {
      return i.total
    }).reduce((partial_sum, a) => partial_sum + a, 0)
    res.status(200).json({ dayIncome, weekIncome, monthIncome, yearIncome })
  } catch (err) {
    res.status(404).json(err);
  }
})



module.exports = router;