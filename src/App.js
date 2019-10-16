import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link as RouterLink } from 'react-router-dom';
import ShowBlogEntries from './components/ShowBlogEntries';
import ShowBlogEntry from './components/ShowBlogEntry';
import BlogEntryForm from './components/BlogEntryForm';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';

const LinkForward = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);


class App extends React.Component{
  constructor(){
    super()
    this.state={
      blogEntries:[]
    }
  }
  fetchEntries=()=>{
    fetch("https://blogentryproject.cfapps.io/entries")
      .then((res)=>res.json())
      .then((entries)=>{
        this.setState({blogEntries: entries});
      })
  }
  componentDidMount(){
    this.fetchEntries();
  }
  render(){


    return (
      <Router>

        <nav>
          <AppBar position="static">
            <Toolbar>
              <Grid
                justify="space-between" // Add it here :)
                container 
                spacing={24}
              >
                <Grid item>
                  <Button color="inherit" component={LinkForward} to="/">
                    Tech Blog
                  </Button>
                </Grid>
                <Grid item>
                  <Fab size="small" color="inherit" component={LinkForward} to="/create">
                    <AddIcon color="primary"/>
                  </Fab>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </nav>

        <div id="content_body">
          <Switch>
            <Route path="/entry/:id" render={(props)=>(
              <ShowBlogEntry {...props} fetchEntries={this.fetchEntries}/>
            )} />
            <Route path="/edit/entry/:id" render={(props)=>(
              <BlogEntryForm {...props} fetchEntries={this.fetchEntries}/>
            )} />
            <Route path="/create" render={(props)=>(
              <BlogEntryForm {...props} fetchEntries={this.fetchEntries}/>
            )} />
            <Route exact path="/">
              <ShowBlogEntries blogEntries={this.state.blogEntries}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
