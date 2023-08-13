// inporting react
import React from 'react';
import { Link } from 'react-router-dom';
const Articlelist = ({articles}) => (
    // <React.Fragment>
    <>
        {
            // console.log(articles.articles)
            articles.map((article, key) => (
                //console.log(article)
                <Link className='article-list-item' key={key} to={`/article/${article.name}`}>
                    <h3>{article.title}</h3>
                    <p>{article.content[0].substring(0, 150)}....</p>
                </Link>
            ))
        }


    </>


);
export default Articlelist;