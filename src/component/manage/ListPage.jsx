import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});



function ListPage(props) {
  const { classes,children } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        {children}
      </Table>
    </Paper>
  );
}

ListPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListPage);
