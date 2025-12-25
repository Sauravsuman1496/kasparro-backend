import express from "express";
import {PrismaClient} from "@prisma/client";
const app=express();
const prisma=new PrismaClient();

app.get("/data",async(req,res)=>{
  const page=+req.query.page||1;
  const limit=+req.query.limit||10;
  const data=await prisma.coin.findMany({skip:(page-1)*limit,take:limit});
  res.json(data);
});

app.get("/health",async(req,res)=>{
  await prisma.coin.findFirst();
  res.json({status:"ok"});
});

app.listen(8000);
