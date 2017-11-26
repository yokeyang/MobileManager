import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import { GridList, GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import ListPage from "./ListPage.jsx";
import AjaxAction from '../AjaxAction.jsx';
const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};
let id = 0;

class User extends Component{
  constructor(props){
    super(props)
    this.state = {
      data : []
    }
  }
  componentDidMount(){
    AjaxAction('/managers','GET','json',null,
      (e) => {
        this.setState({data:e.data})}
    )
  }
  render(){
    const { classes } = this.props;
    return(
      <GridList cols = {10}>
        <GridListTile cols = "3" style = {{height:'auto'}}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="https://material-ui-next.com/static/images/cards/contemplative-reptile.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography type="headline" component="h2">
                Lizard
              </Typography>
              <Typography component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button dense color="primary">
                Share
              </Button>
              <Button dense color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </GridListTile>
        <GridListTile cols = "7" style = {{height:'auto'}}>
          <ListPage data = {this.state.data} />
        </GridListTile>
      </GridList>
    )
  }
}
User.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(User);
