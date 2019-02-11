import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		marginTop: theme.spacing.unit * 3,
    color: 'red',
	},
});

class EdgeCase extends React.Component {
	render() {
		/* eslint-disable react/no-array-index-key */
		const { classes } = this.props;
		return (
			<div>
          <h1 className={classes.root}>You cannot access this page </h1>
          <h2 className={classes.root}>Beacuse you are neither a Mentor nor a facilitator :) </h2>
			</div>
		);
	}
}

EdgeCase.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EdgeCase);
