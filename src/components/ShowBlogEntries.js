import React from 'react';
import { Link } from 'react-router-dom';

const ShowBlogEntries=(props)=>{
    let blogEntriesElArr = props.blogEntries.map((entry, index)=>{
        return(
            <Link to={"/entry/" + entry.id} key={index}>
                <ul>
                    <li>{entry.title}</li>
                </ul>
            </Link>
        )
    })
    return(
        <div>
            <h1>Show All Entries</h1>
            {blogEntriesElArr}
        </div>
    )
}

export default ShowBlogEntries;