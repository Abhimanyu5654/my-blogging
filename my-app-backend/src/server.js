import express from 'express';
import bodyParser from 'body-parser';
import {MongoClient} from 'mongodb';

// const articlesInfo={
//     'learn-react':{
//         upvotes:0,
//         comments:[]
//     },
//     'learn-node':{
//         upvotes:0,
//         comments:[]
//     },
//     'my-thoughte-on-resumes':{
//         upvotes:0,
//         comments:[]
//     }
// }

const app = express();
app.use(express.json());
app.use(bodyParser.json());


// app.get('/hello',(req,res)=>res.send('hello ! Abhimanyu singh'));
// app.get('/hello/:name',(req,res)=>res.send(`Hello ${req.params.name}`));
// app.post('/hello_name',(req,res)=>res.send(`Hello ${req.body.name} your course is ${req.body.course} ${req.body.semester}`));


// localhost:8000/api/articles/learn-node/upvotes
// app.post('/api/articles/:name/upvotes',(req,res)=>{
//     const articleName=req.params.name;
//     articlesInfo[articleName].upvotes += 1;
//     res.status(200).send(`${articleName} now has ${articlesInfo[articleName].upvotes} upvotes!`);
// });

// app.post('/api/articles',(req,res)=>{
//  const {username,text}=req.body;
//  const articleName = req.params.name;
//  articlesInfo[articleName].comments.push({username,text});
// //  res.send('comment updated');
// res.status(200).send(articlesInfo[articleName]);
// });

//localhost:8000/api/articles/learn-node,

// app.get('/api/articles/:name',async(req,res)=>{
//     try{
//         const articlesName=req.params.name;
//         const client=await MongoClient.connect('mongodb://127.0.0.1/27017',{useNewUrlParser:true});
//         const db=client.db('my-blog');
//         const articlesInfo=await db.collection('articles').findOne({name:articlesName});
//         res.json(articlesInfo);
//     }catch(error){
//         res.status(500).json({message:'error:connecting to db',error});
//     }
// })


//localhost:8000/api/articles/:name/upvotes
// app.get('/api/articles/:name/upvotes',async(req,res)=>{
//     try{
//         const articleName= req.params.name;

//     const client=await MongoClient.connect('mongodb://127.0.0.1:27017',{useNewUrlParser:true});
//     const db=client.db('my-blog');
//     const articlesInfo=await db.collection('articles').findOne({name:articleName});
//     // const articlesInfo=await db.collection('articles').find().toArray();
//     await db.collection('articles').updateOne({name:articleName},{
//         $set:{
//             upvotes:articlesInfo.upvotes+1
//         }
//     })
//     const upvotesarticlesInfo=await db.collection('articles').findOne({name:articleName})
//     res.status(200).json(upvotesarticlesInfo);
//     client.close();
    // }catch(error){
    //     res.status(500).json({message:'error:connecting to db',error});
    // }
// })

const withDB=async (opration)=>{
    try{
        const client=await MongoClient.connect('mongodb://127.0.0.1:27017',{useNewUrlParser:true});
        const db=client.db('my-blog');
        opration(db);
        // client.close();
    }catch(error){
        res.json({message:'error:connecting to db',error});
    }
}

//localhost:8000/api/articles/learn-node,
app.get('/api/articles/:name',(req,res)=>{
    withDB(async(db)=>{
        const articlesName=req.params.name;
        const articlesInfo=await db.collection('articles').findOne({name:articlesName});
        res.json(articlesInfo);
    },res);
});

//localhost:8000/api/articles/:name/upvotes

app.post('/api/articles/:name/upvotes',(req,res)=>{
    withDB(async(db)=>{
        const articlesName=req.params.name;
        const articlesInfo=await db.collection('articles').findOne({name:articlesName});
        await db.collection('articles').updateOne({name:articlesName},{
            $set:{
                upvotes:articlesInfo.upvotes+1
            }
        })
        const updateArticleInfo=await db.collection('articles').findOne({name:articlesName});
        res.status(200).json(updateArticleInfo)

    },res)
})

app.post('/api/articles/:name/add-comment',(req,res)=>{
    const {username,text}=req.body;
    const articleName=req.params.name;

    withDB(async(db)=>{
        const articlesInfo=await db.collection('articles').findOne({name:articleName});
        await db.collection('articles').updateOne({name:articleName},{
            $set:{
                comments:articlesInfo.comments.concat({username,text}),
            }
        }) 
    const updateArticleInfo=await db.collection('articles').findOne({name:articleName})
        res.status(200).json(updateArticleInfo);
    },res)
})

app.listen(8000,()=>console.log('Listening on port 8000')); 