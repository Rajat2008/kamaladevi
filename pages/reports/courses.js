// This is main entry page for route '/course'
import React from 'react';
// import localforage from 'localforage';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';

import { authenticatedFetchAPI } from '../../src/services/api';
import { getMenteeCoursesTable } from '../../src/services/utils';

import withRoot from '../../src/with-root';
import Header from '../../src/components/header';
import MenteeCoursesReports from '../../src/components/reports/mentee-courses-report';
import EdgeCase from '../../src/components/reports/edge-case';


class MenteeCoursesReport extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			coursesReports: [],
			mentees: [],
			isFacilitatorOrMentor: true,
		};
	}
	componentDidMount() {
		authenticatedFetchAPI('/reports/courses')
			.then((response) => {
				// console.log(response);
				if (response.statusCode === 417) {
					// handle if the user is not faciliatator or mentor.
					this.setState({
						isFacilitatorOrMentor: false,
					});
				} else {
					const { mentees, menteesCoursesReport } = response;
					this.setState({
						coursesReports: getMenteeCoursesTable(menteesCoursesReport, mentees),
						mentees,
					});
				}
			});
	}

	render() {
		const {
			mentees,
			coursesReports,
			isFacilitatorOrMentor,
		} = this.state;
		// console.log(coursesReports);
		if (isFacilitatorOrMentor) {
			// TODO: create some good UI to view no mentee enrolled in any course.
			// when there is no mentee enrolled in any course.
			if (coursesReports.length < 1) {
				return (
					<div>
						<Header />
					</div>
				);
			} else {
				return (
					<div>
						<Header />
						<MenteeCoursesReports
							mentees={mentees}
							coursesReports={coursesReports}
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
					<EdgeCase />
				</div>
			);
		}
	}
}

MenteeCoursesReport.propTypes = {
	router: PropTypes.object.isRequired,
};

export default withRoot(withRouter(MenteeCoursesReport));
