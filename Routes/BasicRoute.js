const { Console } = require('console');
const express=require('express');
const router=express.Router();
var fs = require('fs');




router.use(express.json());
router.use(express.urlencoded({extended:true}));


    //  GET
    function getdata()
     {
    try {
           const data = fs.readFileSync("HospitalData.json", "utf-8");
           console.log('\n readFile successfully')
           console.log(data);
          //  return data;
          // You can create a JavaScript array by parsing a JSON string:
           return JSON.parse(data);
         } catch (error) {
           console.error("Error reading file:", error);
           return [];
         }
        }

        function Writedata(Hdata)
        {
         try{
        fs.writeFileSync("HospitalData.json", JSON.stringify(Hdata,null,2));
        // fs.writeFileSync("HospitalData.json", Hdata);
          console.log(" successfully written ");
         console.log('The written file has the following contents:');
         console.log(fs.readFileSync("HospitalData.json", "utf8"));
         }
 
         catch(error){
          console.log("error in writing data",error)
         }
          

        }

    // GET

     router.get('/hospital', (req, res) => {
       var data=getdata();
      //  var newData = JSON.parse(Hdata);
        res.send(data);
    });

    // POST
    
    router.post('/posthospital',(req,res)=>

    
    {  

      const hospitals=getdata();
      // console.log(hospitals);
        console.log(req.body);
        
        hospitals.push(req.body);
        Writedata( hospitals);
        res.send({message:"data added",hospitals})
    });
    
    
    // PUT

router.put('/edithospital/:name',(req,res)=>{
  const hospitalsedit=getdata();
  console.log(`Updated ${req.params.name}datas successfully`);
  const index=hospitalsedit.findIndex((h)=>h.name==req.params.name);
  if(index==-1)
{
  res.send({message:"name not found"});
}
else{
  hospitalsedit.splice(index,1,req.body);
  Writedata(hospitalsedit);
    res.send({message:"data updated",hospitalsedit});
    console.log("updated data"+req.body);
}});     
     
    
    


   // DELETE
router.delete('/deletehospital/:name',(req,res)=>{
 const deletehospital=getdata();
 const index=deletehospital.findIndex((hospital)=>hospital.name==req.params.name);
 if(index==-1){
  res.send({message:"name not found"});

 }
 else{
  // deletehospital.pop(req.body);
  deletehospital.splice(index,1);
  console.log(req.body);
  Writedata(deletehospital);

  res.send({message:"deleted",deletehospital});
  console.log("deleted  data"+req.params.name);

 }
 

})







// router.delete('/remove',(req,res)=>{
  
//   const hospitaldelete=getdata();
//   console.log(req.body);


//   hospitaldelete.pop(req.body);
//     Writedata(hospitaldelete);

  
//     res.send({message:"deleted",hospitaldelete});
//     console.log("deleted"+req.body)
// });


    
    
 

module.exports=router;