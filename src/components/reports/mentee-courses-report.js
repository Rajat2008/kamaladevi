import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
});

const courseStatus = (isEnrolled, isCourseCompleted) => {
	if (isCourseCompleted) {
		return (
			<img
				height="40"
				src="/static/icons/course-complete.png"
				alt="course-complete"
			/>
		);
	} else if (isEnrolled) {
		return (
			<img
				height="40"
				src="/static/icons/course-enrolled.png"
				alt="course-complete"
			/>
		);
	} else {
		return (
			<img
				height="40"
				src="/static/icons/not-enrolled.png"
				alt="course-complete"
			/>
		);
	}
};

const MenteeCoursesReports = (props) => {
	/* eslint-disable react/no-array-index-key */
	const { classes, coursesReports, mentees } = props;
	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell className={classes.cell} variant="head">
						Courses
						</TableCell>
						{mentees.map((mentee, index) => (
							<TableCell className={classes.cell} variant="head" key={index}>
								{mentee.name}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{coursesReports.map((courseReport, courseIndex) => {
						return (
							<TableRow key={courseIndex}>
								<Link
									href={{
										pathname: `/reports/mentee-exercises?courseId=${
											courseReport.courseId
										}`,
									}}
								>
									<TableCell className={classes.cell} variant="head">
										{courseReport.courseName}
									</TableCell>
								</Link>
								{courseReport.students.map((student, studentIndex) => (
									<TableCell
										className={classes.cell}
										variant="body"
										key={studentIndex}
									>
										{courseStatus(
											student.isEnrolled,
											student.isCourseCompleted,
										)}
									</TableCell>
								))}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</Paper>
	);
};

MenteeCoursesReports.propTypes = {
	classes: PropTypes.object.isRequired,
	coursesReports: PropTypes.arrayOf(PropTypes.object).isRequired,
	mentees: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(MenteeCoursesReports);
