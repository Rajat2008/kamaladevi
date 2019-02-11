import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

import Typography from '@material-ui/core/Typography';

import CancelIcon from '@material-ui/icons/Cancel';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CreateNewIcon from '@material-ui/icons/CreateNewFolder';


const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 2,
		overflowX: 'auto',
		overflowY: 'auto',
		flexGrow: 1,
		margin: '0 auto',
		maxWidth: theme.spacing.unit * 130,
	},
	tableCell: {
		// padding: theme.spacing.unit,
		// maxWidth: theme.spacing.unit * 10,
		minWidth: theme.spacing.unit * 15,
		'&:last-child': {
			// maxWidth: theme.spacing.unit * 5,
			// padding: theme.spacing.unit,
		},
	},
	courseTitle:{
		textAlign: 'center',
		paddingTop: theme.spacing.unit * 2,
		fontSize: theme.spacing.unit * 3,
	},
	courseDescription: {
		textAlign: 'center',
		fontWeight: '400',
	},
	completed: {
		color: theme.palette.secondary.main,
	},
	pending: {
		color: theme.palette.warning.main,
	},
	rejected: {
		color: theme.palette.error.main,
	},
	open: {
		color: theme.palette.info.main,
	},
});


const exerciseSubmissionStatus = (status) => {
	switch (status) {
		case 'complete':
			return <CheckCircleIcon />;
		case 'pending':
			return <ScheduleIcon />;
		case 'rejecte':
			return <CancelIcon />;
		default:
			return <CreateNewIcon />;
	}
};


class MenteeCourseDetailReport extends React.Component {
	constructor(props) {
		super(props);
		const {
			courseInfo,
			mentees,
			exercisesReports,
		} = this.props;

		this.state = {
			courseInfo,
			mentees,
			exercisesReports,
		};
	}

	render() {
		const {
			classes,
			courseInfo,
			mentees,
			exercisesReports,
		} = this.props;
		console.log(this.props)
		return (
			<div className={classes.root}>
				<Paper className={classes.root}>
					<Typography variant="subheading" className={classes.courseTitle}>
						{courseInfo.courseName}
					</Typography>
					<Typography variant="body2" className={classes.courseDescription}>
						{courseInfo.courseShortDescription}
					</Typography>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell className={classes.tableCell} variant="head">
								Exercises Name
								</TableCell>
								{mentees.map(mentee => (
									<TableCell className={classes.tableCell} variant="head" key={mentee.id}>
										{mentee.name}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{exercisesReports.map(exerciseReport => (
								<TableRow key={exerciseReport.exerciseId}>
									<TableCell className={classes.tableCell} variant="head">
										{exerciseReport.exerciseName}
									</TableCell>
									{exerciseReport.mentees.map(mentee => (
										<TableCell
											className={classes.tableCell}
											variant="body"
											key={`${exerciseReport.exerciseName}-${mentee.menteeId}`}
										>
											<span className={classes[mentee.submissionState]}>
												{exerciseSubmissionStatus(mentee.submissionState)}
											</span>
										</TableCell>
									))}
								</TableRow>))
							}
						</TableBody>
					</Table>
				</Paper>
			</div>
		);
	}
};

MenteeCourseDetailReport.propTypes = {
	classes: PropTypes.object.isRequired,
	courseInfo: PropTypes.object.isRequired,
	mentees: PropTypes.arrayOf(PropTypes.object).isRequired,
	exercisesReports: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(MenteeCourseDetailReport);
