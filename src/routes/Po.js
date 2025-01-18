const { Router } = require('express');
const router = Router();
const { getDbPo } = require('./Controllers');
const { Po, Jobs } = require('../db');


router.get("/", async (req, res) => {
  const title = req.query.title;
  let PosTotal = await getDbPo();
  if (title) {
    let PosTitle = await PosTotal.filter((elem) =>
      elem.title.toLowerCase().includes(title.toLowerCase())
    );
    PosTitle.length
      ? res.status(200).send(PosTitle)
      : res.status(404).send("there is no that P.O.");
  } else {
    res.status(200).send(PosTotal);
  }
});

router.post("/", async (req, res) => {
  const data = {
    ponumber,
    title,
    variancecode,
    costcode,
    performedby,
    estcomplete,
    postatus,
    workstatus,
    paid,
    cost,
    job
  } = req.body;
  
  try {

    const findOrCreatePo = async (
      ponumber,
      title,
      variancecode,
      costcode,
      performedby,
      estcomplete,
      postatus,
      workstatus,
      paid,
      cost,
      job) => {
      // const match = await Jobs.findAll({

      //   where: {
      //     name: job,
      //   }
      // });
      // await poSaved.addJobs(match)
      // return !created
      //   ? res.status(404).send(`${job} already exist`)
      //   : res.status(200).json(poSaved);

      return await Po.findOrCreate({
        where: {
          ponumber: ponumber,
          title: title
        }, defaults: {
          variancecode: variancecode,
          costcode: costcode,
          performedby: performedby,
          estcomplete: estcomplete,
          postatus: postatus,
          workstatus: workstatus,
          paid: paid,
          cost: cost,
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
    const poSaved = [];
    for (let i = 0; i < data.length; i++) {

      poSaved.push(await findOrCreatePo(
        data[i].ponumber,
        data[i].title,
        data[i].variancecode,
        data[i].costcode,
        data[i].performedby,
        data[i].estcomplete,
        data[i].postatus,
        data[i].workstatus,
        data[i].paid,
        data[i].cost,
        data[i].job));
    }


  } catch (err) {
    console.log(err.message);
    res.status(404).json(err.message);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const PosTotal = await getDbPo();
  if (id) {
    let poId = PosTotal.filter(e => e.id == id);
    poId.length ?
      res.status(200).json(poId) :
      res.status(404).send('does not exist this P.O.')

  }
})


router.put("/delete", async (req, res) => {

  try {
     await tabledelete(Po);
    console.log( `Po has been deleted`);
  } catch (error) {
    console.log(`Error truncating table: `, error);
  }
})




module.exports = router;