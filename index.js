import express from 'express'
const app=express()
const port=3000

// app.get("/",(req,res)=>{
//     res.send("hello from rishmeet singh")
// })
// app.get("/ice-tea",(req,res)=>{
//     res.send("what ice tea would u prefer")
// })
// app.get("/twitter",(req,res)=>{
//     res.send("hey ")
// })
app.use(express.json())

let teaData=[]
let nextid=1

app.post('/tea',(req,res)=>{
    const {name,price}=req.body
    const newTea={id:nextid++,name,price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})
app.get('/tea',(req,res)=>{
    res.status(200).send(teaData)
})
app.get('/tea/:id',(req,res)=>{
    const tea=teaData.find(t=>t.id===parseInt(req.params.id))
    if (!tea){
        return res.status(404).send(`tea not found`)
    }
    res.sendStatus(200).send(tea)
})
app.put('/tea/:id',(req,res)=>{
    const teaid=req.params.id
    const tea=teaData.find(t=>t.id===parseInt(req.params.id))
    if (!tea){
        return res.status(404).send(`tea not found`)
    }
    const {name,price}=req.body
    tea.name=name
    tea.price=price
    res.send(200).send(tea)
})
app.delete('/tea/:id',(req,res)=>{
    teaData.findIndex(t=>t.id===parseInt(req.params.id))
    if (index===-1){
        return res.status(404).send("tea not found")
    }
    teaData.splice(index,1)
    return res.status(204).send("deleted")
})



app.listen(port,()=>{
    console.log(`server is running at port: ${port}`)
})