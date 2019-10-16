import React from 'react';

const BlogEntryForm=(props)=>{
    const [id, setId] = React.useState(0);
    const [title, setTitle] = React.useState("");
    const [author, setAuthor] = React.useState("");
    const [content, setContent] = React.useState("");
    const onTitleInput=(e)=>{
        setTitle(e.target.value);
    }
    const onAuthorInput=(e)=>{
        setAuthor(e.target.value);
    }
    const onContentInput=(e)=>{
        setContent(e.target.value);
    }
    const handleCreateClick=()=>{
        fetch('https://blogentryproject.cfapps.io/entry', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                author: author,
                content: content
            })
        }).then(()=>{
            props.fetchEntries();
            setTitle("");
            setAuthor("");
            setContent("");
            props.history.push('/');
        })
    }
    const handleUpdateClick=()=>{
        fetch('https://blogentryproject.cfapps.io/entry/' + id, {
            method: 'put',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                author: author,
                content: content
            })
        }).then(()=>{
            props.fetchEntries();
            setId(0);
            setTitle("");
            setAuthor("");
            setContent("");
            props.history.push('/');
        })
    }

    React.useEffect(()=>{
        setId(0);
        setTitle("");
        setAuthor("");
        setContent("");
    }, [props.match])

    React.useEffect(()=>{
        let id = props.match ? props.match.params.id : 0;
        setId(id);
    }, [])

    let buttonAction;
    if(id){
        buttonAction = <button onClick={handleUpdateClick}>Update</button>
    } else {
        buttonAction = <button onClick={handleCreateClick}>Create</button>
    }
    return(
        <div>
            <h1>Blog Entry Form</h1>
            <input type="text" value={title} onChange={onTitleInput} placeholder="Title of entry"/>
            <input type="text" value={author} onChange={onAuthorInput} placeholder="Author of entry"/>
            <input type="text" value={content} onChange={onContentInput} placeholder="Content of entry"/>
            {buttonAction}
        </div>
    )
}

export default BlogEntryForm;