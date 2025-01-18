const { Router } = require('express');
const router = Router();
const { Sequelize, Op } = require("sequelize");
const {  getDbBills} = require('./Controllers');
const { Bills, Jobs } = require('../db'); 


router.get("/", async (req, res) => {
   const title = req.query.title;
   let billsTotal = await getDbBills();
   if (title) {
     let billTitle = await billsTotal.filter((elem) =>
       elem.title.toLowerCase().includes(title.toLowerCase())
     );
     billTitle.length
       ? res.status(200).send(billTitle)
       : res.status(404).send("there is no that bill");
   } else {
     res.status(200).send(billsTotal);
   }
 });

 router.post("/", async (req, res) => {
  const {
    bill,
      title,
      payto, 
      billamount,
      invoicedate,
      billstatus,
      datepaid,
      createdate,
      comments,
      costcode,
      relatedpos,
      job
  } = req.body;
  if (!title) {
    return res.status(400).send("Some data is missing");
  }
  try {
    let [billSaved, created] = await Bills.findOrCreate({
      where: { title: title },
      defaults: {
        bill:bill,
        title:title,
        payto:payto, 
        billamount:billamount,
        invoicedate: invoicedate || null,
        billstatus:billstatus,
        datepaid:datepaid || null,
        createdate:createdate || null,
        comments:comments,
        costcode:costcode,
        relatedpos:relatedpos,
      },
    });
    const match = await Jobs.findAll({
      
      where: {
        name: job,
      },
    });
   
     await billSaved.addJobs(match)
    return !created
      ? res.status(404).send(`${job} already exist`)
      : res.status(200).json(billSaved);
  } catch (err) {
    console.log(err.message);
    res.status(404).json(err.message);
  }
});
 
 router.get('/:id', async (req,res)=>{
   const id = req.params.id;
   const  billsTotal = await getDbBills();
   if (id){
     let billId = billsTotal.filter(e => e.id == id);
     billId.length ?
     res.status(200).json(billId):
     res.status(404).send('does not exist this bill')
 
   }
 })




 module.exports = router;