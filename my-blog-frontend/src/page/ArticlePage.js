// inporting react
import React,{useState,useEffect} from 'react';
import articleContent from './article-content';
import { useParams } from 'react-router-dom';
import CommentsList from '../Components/CommentsList';
import Articlelist from './Articlelist';
import UpvoteSection from '../Components/UpvoteSection';
import AddCommentForm from '../Components/AddCommentForm';

const ArticlePage = () => {
  const name = useParams()['name'];
  
  const article = articleContent.find(article => article.name === name);
  console.log(article);

  const [articleInfo,setArticleInfo]=useState({upvotes:0,comments:[]})

     useEffect(()=>{
      // setArticleInfo({upvotes:Math.ceil(Math.random()*10)});
      const fetchData=async()=>{
        const result=await fetch(`/api/articles/${name}`);
        const body=await result.json();
        setArticleInfo(body);
      }
      fetchData();
     },[name]);

  if(!article)
     return <h1> {name} Article does not exist...! </h1>
     const otherArticales=articleContent.filter(article=>article.name!==name)

     
  return (
    <>
      {/* <h1>This is the {name} article</h1> */}
      {/* <h1>{article.name}</h1> */}
      <h1>{article.title}</h1>
      <UpvoteSection articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo}/>
      {article.content.map((paragraph,key)=>(
        <p key={key}>{paragraph}</p>
      ))}
      <CommentsList comment={articleInfo.comments}/>
      <AddCommentForm articleName={name} setArticleInfo={setArticleInfo}/>
      <Articlelist articles={otherArticales}/>
    </>
  )
};
export default ArticlePage;