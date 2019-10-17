import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';

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
        buttonAction = (
            <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateClick}
                endIcon={<Icon>send</Icon>}
              >
                Update
              </Button>
        )
    } else {

        buttonAction = (
            <Button
                variant="contained"
                color="primary"
                onClick={handleCreateClick}
                endIcon={<Icon>send</Icon>}
              >
                Create
              </Button>
        )
    }
    return(
        <div>

        <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={10}>
                <h1>Blog Post</h1>
                <TextField
                    id="outlined-name"
                    label="Title"
                    value={title}
                    onChange={onTitleInput}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                <TextField
                    id="outlined-name"
                    label="Author"
                    value={author}
                    onChange={onAuthorInput}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                <TextField
                    id="outlined-name"
                    label="Content"
                    multiline
                    rows="4"
                    value={content}
                    onChange={onContentInput}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                {buttonAction}
              </Grid> 
            </Grid> 
        </div>
    )
}

export default BlogEntryForm;