const { Router } = require('express');
const router = Router();
const { Sequelize, Op } = require("sequelize");
const { getDbBills } = require('./Controllers');
const { Bills, Jobs } = require('../db');


router.get("/", async (req, res) => {
  const title = req.query.title;
  let BillsTotal = await getDbBills();
  
  if (title) {
    let billsTitle = await BillsTotal.filter((elem) =>
      elem.title.toLowerCase().includes(title.toLowerCase())
    );
    includes[{ model: Jobs.name }]
    billsTitle.length
      ? res.status(200).send(billsTitle)
      : res.status(404).send("there is no that BILLS");
  } else {
    res.status(200).send(BillsTotal);
  }
});



router.post("/", async (req, res) => {
  const data = {
    Bill,
    BillTitle,
    PayTo,
    BillAmount,
    InvoiceDate,
    DueDate,
    BillStatus,
    DatePaid,
    PaidBy,
    CreatedDate,
    Files,
    Comments,
    VarianceCodes,
    CostCodes,
    RelatedPOs,
    LienWaivers,
    Job
  } = req.body;

  try {

    const findOrCreateBill = async (
      bill,
      title,
      payto,
      billamount,
      invoicedate,
      duedate,
      billstatus,
      datepaid,
      paidby,
      createdate,
      files,
      comments,
      variancecode,
      costcode,
      relatedpos,
      lienwaivers,
      job) => {


      return await Bills.findOrCreate({
        where: {
          bill: bill,
          title: title,
        }, defaults: {
          payto: payto,
          billamount: billamount,
          invoicedate: invoicedate,
          duedate: duedate, 
          billstatus: billstatus,
          datepaid: datepaid,
          paidby: paidby,
          createdate: createdate,
          files: files,
          comments: comments,
          variancecode: variancecode,
          costcode: costcode,
          relatedpos: relatedpos,
          lienwaivers: lienwaivers,
          job: job
        }


      })
        .then((response) => {
          response = JSON.parse(JSON.stringify(response));
          return response[0];
        }).catch(err => {
          console.log("uploads.js", 273, err);
        });
    };
    const billSaved = [];
    for (let i = 0; i < data.length; i++) {

      billSaved.push(await findOrCreateBill(
        data[i].bill,
        data[i].title,
        data[i].payto,
        data[i].billamount,
        data[i].invoicedate,
        data[i].duedate,
        data[i].billstatus,
        data[i].paidby,
        data[i].datepaid,
        data[i].createdate,
        data[i].files,
        data[i].comments,
        data[i].variancecode,
        data[i].costcode,
        data[i].relatedpos,
        data[i].lienwaivers,
        data[i].job));
    }
  

  } catch (err) {
    console.log(err.message);
    res.status(404).json(err.message);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const billsTotal = await getDbBills();
  if (id) {
    let billId = billsTotal.filter(e => e.id == id);
    billId.length ?
      res.status(200).json(billId) :
      res.status(404).send('does not exist this Bill.')

  }
})


router.put("/delete", async (req, res) => {

  try {
     await tabledelete(Bills);
    console.log( `Bills has been deleted`);
  } catch (error) {
    console.log(`Error truncating table: `, error);
  }
})




module.exports = router;