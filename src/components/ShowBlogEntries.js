import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';


const LinkButton = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const useStyles = makeStyles({
  card: {
    minWidth: 200,
  },
  title: {
    fontSize: 14,
  },
  headerTitle: {
    textAlign:'center',
    margin: 10
  }
});

const ShowBlogEntries=(props)=>{
    const classes = useStyles();
    let blogEntriesElArr = props.blogEntries.map((entry, index)=>{
        let snippet = entry.content.split("").slice(0, 51).join("") + "...";
        return(
            <Card key={index} className={classes.card}>
              <CardContent>
                <Typography className={classes.title} variant="h5" component="h2">
                  {entry.title}
                </Typography>
                <Typography variant="body2" component="p">
                  {snippet}
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="inherit" component={LinkButton} to={"/entry/" + entry.id}>
                    Learn More
                </Button>
              </CardActions>
            </Card>
        )
    })
    return(
        <div>
            <Typography className={classes.headerTitle} variant="h2" component="h2">
              Blog Posts
            </Typography>
            <GridList cols={4} spacing={10}>
                {blogEntriesElArr}
            </GridList>
        </div>
    )
}

export default ShowBlogEntries;