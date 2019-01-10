import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import LinearProgress from '@material-ui/core/LinearProgress';

import { withStyles } from '@material-ui/core/styles';

import AlertNotification from '../alert-notification';
import { courseCompletedAPI } from '../../services/api';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 2,
		overflowX: 'auto',
		overflowY: 'auto',
		flexGrow: 1,
		margin: '0 auto',
		maxWidth: theme.spacing.unit * 120,
	},
	cell: {
		padding: theme.spacing.unit,
		'&:last-child': {
			padding: theme.spacing.unit,
		},
	},
	green: {
		background: '#64dd17',
	},
	red: {
		background: '#d50000',
	},
	yellow: {
		background: '#ffd600',
	},
	grey: {
		background: '#757575',
	},
});
const getProgressColor = (percentage) => {
	if (percentage > 70) {
		return 'green';
	} else if (percentage > 30) {
		return 'yellow';
	} else {
		return 'red';
	}
};

const courseStatus = (courseReport, mentee, classes) => {
	const { completedSubmissions } = mentee;
	const { totalExercise } = courseReport;
	const progressPercentage = (completedSubmissions / totalExercise) * 100;
	const color = getProgressColor(progressPercentage);

	switch (mentee.menteeCourseStatus) {
		case 'completed':
			return (
				<LinearProgress
					variant="determinate"
					value={100}
					className={classes.green}
					title={progressPercentage}
				/>
			);
		case 'enroll':
			return (
				<LinearProgress
					variant="determinate"
					value={progressPercentage}
					className={classes[color]}
					title={progressPercentage}
				/>
			);
		default:
			return (
				<LinearProgress
					variant="determinate"
					value={progressPercentage}
					className={classes.grey}
					title={progressPercentage}
				/>
			);
	}
};

class MenteeCoursesReports extends React.Component {
	constructor(props) {
		super(props);
		const { coursesReports, mentees } = props;
		this.state = {
			mentees,
			coursesReports,
			showNotification: false,
			notifcationMessage: '',
			variant: 'success',
		};
	}

	updateCourseStatus = (courseId, menteeEmail) => {
		// update the course Status
		console.log(courseId, menteeEmail);
	}

	courseCompleted = (courseReport, mentee) => {
		const { menteeId, menteeName } = mentee;
		const { courseName, courseId } = courseReport;
		let notifcationMessage;
		courseCompletedAPI(courseId, menteeId)
			.then((response) => {
				// if there is any error occured show them the error.
				if (response.statusCode === 417) {
					// expectationFailed error from server.
					notifcationMessage = response.message;
					this.setState({
						showNotification: true,
						notifcationMessage,
						variant: 'warning',
					});
				} else {
					// once the course is submitted then show a notification
					// the student who's course has been marked completed with Name.
					notifcationMessage =
							`${menteeName} ka ${courseName} course complete mark hogya ha.`;
					this.setState({
						showNotification: true,
						notifcationMessage,
						variant: 'success',
					});
				}
			})
			.catch(() => {
				// check for internet connection.
				notifcationMessage = window.navigator.onLine
					? 'Internet connected nhi hai!'
					: 'Ek error Ayi hue hai. Console check kare!';

				this.setState({
					showNotification: true,
					notifcationMessage,
					variant: 'error',
				});
			});
	}

	handleHideNotification = () => {
		this.setState({
			showNotification: false,
		});
	}

	render() {
		/* eslint-disable react/no-array-index-key */
		const { classes } = this.props;
		const {
			showNotification,
			notifcationMessage,
			variant,
			coursesReports,
			mentees,
		} = this.state;
		return (
			<div>
				<div>Mere Bache :</div>
				<Paper className={classes.root}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell className={classes.cell} variant="head">
									Courses
								</TableCell>
								{mentees.map(mentee => (
									<TableCell className={classes.cell} variant="head" key={mentee.id}>
										{mentee.name}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{coursesReports.map(courseReport => (
								<TableRow key={courseReport.courseId}>
									<Link
										href={{
											pathname: '/reports/course',
											query: {
												courseId: courseReport.courseId,
												courseName: courseReport.courseName,
											},
										}}
									>
										<TableCell className={classes.cell} variant="head">
											{courseReport.courseName}
										</TableCell>
									</Link>
									{courseReport.mentees.map(mentee => (
										<TableCell
											className={classes.cell}
											variant="body"
											key={`${courseReport.courseName}-${mentee.menteeId}`}
										>
											{courseStatus(courseReport, mentee, classes)}
										</TableCell>
									))}
								</TableRow>))
							}
						</TableBody>
					</Table>
				</Paper>
				<AlertNotification
					open={showNotification}
					message={notifcationMessage}
					autoHideDuration={6000}
					variant={variant}
					onClose={this.handleHideNotification}
				/>
			</div>
		);
	}
};

MenteeCoursesReports.propTypes = {
	classes: PropTypes.object.isRequired,
	coursesReports: PropTypes.arrayOf(PropTypes.object).isRequired,
	mentees: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(MenteeCoursesReports);
