import React from 'react';
import { Link } from 'react-router-dom';

const ShowBlogEntry=(props)=>{
    const [entry, setEntry] = React.useState({});

    React.useEffect(()=>{
        const id = props.match.params.id;
        fetch("http://localhost:8080/entry/" + id)
            .then((res)=>res.json())
            .then((entryRes)=>{
                setEntry(entryRes);
            })
    }, []);
    const deleteEntry=(id)=>{
        fetch("http://localhost:8080/entry/" + id, {
            method: 'delete'
        }).then(()=>{
            props.fetchEntries();
            props.history.push('/');
        })
    }

    return(
        <ul>
            <li>Title: {entry.title}</li>
            <li>Author: {entry.author}</li>
            <li>Content: {entry.content}</li>
            <button onClick={()=>deleteEntry(entry.id)}>Delete</button>
            <Link to={"/edit/entry/" + entry.id}>Edit</Link>
        </ul>
    )
}

export default ShowBlogEntry;