import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ShowBlogEntries from './components/ShowBlogEntries';
import ShowBlogEntry from './components/ShowBlogEntry';
import BlogEntryForm from './components/BlogEntryForm';

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
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
          </ul>
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
