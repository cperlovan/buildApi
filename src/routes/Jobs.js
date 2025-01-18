const { Router } = require('express');
const router = Router();
const { getDbJobs, tabledelete } = require('./Controllers');
const { Jobs } = require('../db');



router.get("/", async (req, res) => {
  const name = req.query.Name;
  let jobsTotal = await getDbJobs();
  if (name) {
    let jobsName = await jobsTotal.filter((elem) =>
      elem.name.toLowerCase().includes(name.toLowerCase())
    );
    jobsName.length
      ? res.status(200).send(jobsName)
      : res.status(404).send("there is no that jobs");
  } else {
    res.status(200).send(jobsTotal);
  }
});

router.post("/", async (req, res) => {
  
  const data = {
    Name,
    StreetAddress,
    State,
    ActualCompletion,
    ActualStart,
    AmountInvoiced,
    ContractPrice,
    CostsOutstanding,
    CostsPaid,
    JobRunningTotal,
    PaymentsReceived,
    ProjCompletion,
    ProjStart,
    TotalCosts,

  } = req.body;
 
 
  try {
     
     
    const findOrCreateJobs = async (
      Name,
      StreetAddress,
      State,
      ActualCompletion,
      ActualStart,
      AmountInvoiced,
      ContractPrice,
      CostsPaid,
      CostsOutstanding,
      JobRunningTotal,
      PaymentsReceived,
      ProjCompletion,
      ProjStart,
      TotalCosts,) => {

       
      return await Jobs.findOrCreate({
        where: {
          Name: Name,
        }, defaults: {
          StreetAddress: StreetAddress,
          State: State,
          ActualCompletion: ActualCompletion,
          ActualStart: ActualStart,
          AmountInvoiced:AmountInvoiced,
          ContractPrice: ContractPrice,
          CostsOutstanding: CostsOutstanding,
          CostsPaid: CostsPaid,
          JobRunningTotal: JobRunningTotal,
          PaymentsReceived: PaymentsReceived,
          ProjCompletion: ProjCompletion,
          ProjStart: ProjStart,
          TotalCosts: TotalCosts,
        }
      })
        .then((response) => {
          response = JSON.parse(JSON.stringify(response));
          return response[0];
        }).catch(err => {
          console.log("uploads.js", 273, err);
        });
    };
    
    const jobsSaved = [];
    
    for (let i = 0; i < data.length; i++) {
     
      jobsSaved.push(await findOrCreateJobs(
        data[i].Name,
        data[i].StreetAddress,
        data[i].State,
        data[i].ActualCompletion,
        data[i].ActualStart,
        data[i].AmountInvoiced,
        data[i].ContractPrice,
        data[i].CostsPaid,
        data[i].CostsOutstanding,
        data[i].JobRunningTotal,
        data[i].PaymentsReceived,
        data[i].ProjCompletion,
        data[i].ProjStart,
        data[i].TotalCosts

      ));
    }
    return res.status(200).send(`${jobsSaved.length} Succesufully recorded Jobs`);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});




router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const JobsTotal = await getDbJobs();
  if (id) {
    let jobId = JobsTotal.filter(e => e.id == id);
    jobId.length ?
      res.status(200).json(jobId) :
      res.status(404).send('does not exist this Job')

  }
})

router.put("/delete", async (req, res) => {

  try {
     await tabledelete(Jobs);
    console.log( `jobs has been deleted`);
  } catch (error) {
    console.log(`Error truncating table: `, error);
  }
})







module.exports = router;