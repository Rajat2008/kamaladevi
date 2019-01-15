// This is main entry page for route '/course'
import React from 'react';
// import localforage from 'localforage';
import Router, { withRouter } from 'next/router';
import PropTypes from 'prop-types';
// TODO: customize it now to your on need
import { authenticatedFetchAPI } from '../../src/services/api';
import { getMenteeExercisesTable } from '../../src/services/utils';

import withRoot from '../../src/with-root';
import Header from '../../src/components/header';
import MenteeExercisesReports from '../../src/components/reports/mentee-exercises-report';

class MenteeExerciseReports extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			exercisesReports: [],
			mentees: [],
			isFacilitatorOrMentor: true,
			courseInfo: {},
		};
	}
	componentDidMount() {
		const { courseId } = this.props.router.query;
		console.log(courseId)
		if (courseId) {
			authenticatedFetchAPI(`/reports/course/${courseId}`)
				.then((response) => {
					// console.log(response);
					if (response.statusCode === 417) {
						// handle if the user is not faciliatator or mentor.
						this.setState({
							isFacilitatorOrMentor: false,
						});
					} else {
						const { mentees, menteesExercisesReport, ...courseInfo } = response;
						this.setState({
							exercisesReports: getMenteeExercisesTable(menteesExercisesReport, mentees),
							mentees,
							courseInfo,
						});
					}
				});
		} else {
			// when someone has typed the URL by hand and there is not course
			// for the given Id redirect him to courses page.
			alert('No courseId provided');
			Router.replace('/reports/courses');
		}
	}

	render() {
		const {
			mentees,
			exercisesReports,
			isFacilitatorOrMentor,
			courseInfo,
		} = this.state;
		// console.log(exercisesReports);
		if (isFacilitatorOrMentor) {
			// TODO: create some good UI to view no mentee enrolled in any course.
			// when there is no mentee enrolled in any course.
			if (exercisesReports.length < 1) {
				return (
					<div>
						<Header />
					</div>
				);
			} else {
				return (
					<div>
						<Header />
						<MenteeExercisesReports
							courseInfo={courseInfo}
							mentees={mentees}
							exercisesReports={exercisesReports}
						/>
					</div>
				);
			}
		} else {
			// TODO: show some UI Error Page to Notifiy he is not mentor
			// when the user doesn't have any mentee assigned to them.
			return (
				<div>
					<Header />
				</div>
			);
		}
	}
}

MenteeExerciseReports.propTypes = {
	router: PropTypes.object.isRequired,
};

export default withRoot(withRouter(MenteeExerciseReports));
