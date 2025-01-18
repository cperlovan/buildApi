const axios = require ('axios'); 
const { Po, Bills, Jobs  } = require('../../db'); 


  const getDbJobs = async () => {    
    try {      
        const JobsDB =  await Jobs.findAll({
        });   
        const dbJobs=JobsDB.map(g => {
            return {
               Name: g.dataValues.Name,
               StreetAddress: g.dataValues.StreetAddress,
               State: g.dataValues.State,
               ActualCompletion: g.dataValues.ActualCompletion,
               ActualStart: g.dataValues.ActualStart,
               AmountInvoiced: g.dataValues.AmountInvoiced,
               ContractPrice: g.dataValues.ContractPrice,
               CostsOutstanding: g.dataValues.CostsOutstanding,
               CostsPaid: g.dataValues.CostsPaid,
               JobRunningTotal:g.dataValues.JobRunningTotal,
               PaymentsReceived: g.dataValues.PaymentsReceived,
               ProjCompletion: g.dataValues.ProjCompletion,
               ProjStart: g.dataValues.ProjStart,
               TotalCosts: g.dataValues.TotalCosts

            }        
        });
        return dbJobs;    
    } catch (e) {
        return('No se pudo acceder a la BD',e)        
    }
}

const getDbPo = async () => {    
  try {      
      const PoDB =  await Po.findAll({
      });   
      const dbPo=PoDB.map(g => {
          return {
             id: g.dataValues.id,
             ponumber: g.dataValues.ponumber,
             title:g.dataValues.title,
             variancecode:g.dataValues.variancecode,
             costcode: g.dataValues.costcode,
             performedby: g.dataValues.performedby, 
             estcomplete: g.dataValues.estcomplete,
             postatus: g.dataValues.postatus,
             workstatus: g.dataValues.workstatus,
             paid: g.dataValues.paid,
             cost: g.dataValues.cost,
             job: g.dataValues.job
          }        
      });
      return dbPo;    
  } catch (e) {
      return('No se pudo acceder a la BD',e)        
  }
}

const getDbBills = async () => {    
  try {      
      const BillsDB =  await Bills.findAll({
      });   
      const dbBills=BillsDB.map(g => {
        
          return {
             id: g.dataValues.id,
             bill: g.dataValues.bill,
             title: g.dataValues.title,
             payto: g.dataValues.payto, 
             billamount: g.dataValues.billamount,
             invoicedate: g.dataValues.invoicedate,
             billstatus: g.dataValues.billstatus,
             datepaid: g.dataValues.datepaid,
             createdate: g.dataValues.createdate,
             comments: g.dataValues.comments,
             costcode: g.dataValues.costcode,
             relatedpos: g.dataValues.relatedpos,
             job: g.dataValues.job
          }        
      });
      
      return dbBills;    
  } catch (e) {
      return('No se pudo acceder a la BD',e)        
  }
}
  
   const tabledelete = async (model)=>{
        try { console.log("Estoy borrando")
            await model.truncate()
            return ("datos: borrados")
        } catch (e) {
            console.log(`Error truncating table: `, e)
        }
          
   }

  module.exports = {
    getDbPo,
    getDbJobs,
    getDbBills,
    tabledelete
  

}