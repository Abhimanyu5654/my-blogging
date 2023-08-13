import express from 'express';
import bodyParser from 'body-parser';
import {MongoClient} from 'mongodb';

const app = express();
app.use(express.json());
app.use(bodyParser.json());

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