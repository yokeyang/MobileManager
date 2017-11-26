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
  const { classes,data } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>用户名</TableCell>
            <TableCell numeric>密码</TableCell>
            <TableCell numeric>用户类型</TableCell>
            <TableCell numeric padding = "checkbox">操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell>{n.user}</TableCell>
                <TableCell numeric>*******</TableCell>
                <TableCell numeric>{n.Smanager === 1?'超级管理员':'管理员'}</TableCell>
                <TableCell numeric><IconButton aria-label="Delete"><DeleteIcon /></IconButton></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

ListPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListPage);
