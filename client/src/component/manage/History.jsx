import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import { GridList, GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import ListPage from "./ListPage.jsx";
const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};
class History extends Component{

  render(){
    const { classes } = this.props;
    return(
      <ListPage />
    )
  }
}
History.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(History);
