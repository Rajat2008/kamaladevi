// gets gihtub Link for each exercise
export const getExerciseDetailFromSlug = (slug, exercises) => {
	for (let exerciseId = 0; exerciseId < exercises.length; exerciseId += 1) {
		if (exercises[exerciseId].slug === slug) {
			return exercises[exerciseId];
		}
		if (exercises[exerciseId].childExercises.length) {
			for (
				let childExerciseId = 0;
				childExerciseId < exercises[exerciseId].childExercises.length;
				childExerciseId += 1) {
				if (exercises[exerciseId].childExercises[childExerciseId].slug === slug) {
					return exercises[exerciseId].childExercises[childExerciseId];
				}
			}
		}
	}
};

// Get location in exercises list for currently active exercise
export const getExerciseIdFromSlug = (slug, exercises) => {
	for (let exerciseId = 0; exerciseId < exercises.length; exerciseId += 1) {
		if (exercises[exerciseId].slug === slug) {
			return {
				openExerciseId: exerciseId,
				selectedvalue: exercises[exerciseId].id,
				selectedchildExercise: null,
			};
		}
		if (exercises[exerciseId].childExercises.length) {
			for (
				let childExerciseId = 0;
				childExerciseId < exercises[exerciseId].childExercises.length;
				childExerciseId += 1) {
				if (exercises[exerciseId].childExercises[childExerciseId].slug === slug) {
					return {
						openExerciseId: exerciseId,
						selectedvalue: exercises[exerciseId].id,
						selectedchildExercise: exercises[exerciseId].childExercises[childExerciseId].id,
					};
				}
			}
		}
	}
};

// get the Title out of slug for the page
export const getTitleFromSlug = (slug) => {
	if (slug) {
		let title = slug.replace(/[-__/_]/g, ' ');
		title = title[0].toUpperCase() + title.slice(1, title.length);
		return title;
	}
};

const getNextExerciseSlug = (exercises, exerciseId) => {
	try {
		// Return if there is a next exercise
		return exercises[exerciseId + 1].slug;
	} catch (e) {
		// no-op
	}
};

const getPreviousChildSlug = (exercises, exerciseId, childExerciseId) => {
	if (childExerciseId === 0) {
		return exercises[exerciseId].slug;
	} else {
		return exercises[exerciseId].childExercises[childExerciseId - 1].slug;
	}
};

const getNextChildSlug = (exercises, exerciseId, childExerciseId) => {
	try {
		// Return if there is next child
		return exercises[exerciseId].childExercises[childExerciseId + 1].slug;
	} catch (e) {
		try {
			// Return if there is a next exercise
			return exercises[exerciseId + 1].slug;
		} catch (e_) {
			// no-op
		}
	}
};

const getPreviousExerciseSlug = (exercises, exerciseId) => {
	try {
		const childExerciseListLength = exercises[exerciseId - 1].childExercises.length;
		if (childExerciseListLength) {
			return exercises[exerciseId - 1].childExercises[childExerciseListLength - 1].slug;
		} else {
			return exercises[exerciseId - 1].slug;
		}
	} catch (e) {
		// no-op
	}
};


// Get slug of the next course to navigate using next button
export const getSlugOfNextCourse = (slug, exercises) => {
	for (let exerciseId = 0; exerciseId < exercises.length; exerciseId += 1) {
		if (exercises[exerciseId].slug === slug) {
			// This is the slug for first level exercise
			if (exercises[exerciseId].childExercises.length) {
				// If it has child exercises, return the slug for next child exercise
				return exercises[exerciseId].childExercises[0].slug;
			} else {
				// Return the slug for the next exercise if it exist
				return getNextExerciseSlug(exercises, exerciseId);
			}
		} else if (exercises[exerciseId].childExercises.length) {
			for (
				let childExerciseId = 0;
				childExerciseId < exercises[exerciseId].childExercises.length;
				childExerciseId += 1) {
				if (exercises[exerciseId].childExercises[childExerciseId].slug === slug) {
					return getNextChildSlug(exercises, exerciseId, childExerciseId);
				}
			}
		} else {
			// no-op
		}
	}
};

// sort the courses by sequenceNum
export const sortCoursesBySequenceNum = (courses) => {
	const sortedCourses = Array.from(courses);
	sortedCourses.sort((a, b) => a.sequenceNum - b.sequenceNum);
	return sortedCourses;
};

// Get slug of the previous course to navigate using next button
export const getSlugOfPreviousCourse = (slug, exercises) => {
	for (let exerciseId = 0; exerciseId < exercises.length; exerciseId += 1) {
		if (exercises[exerciseId].slug === slug) {
			return getPreviousExerciseSlug(exercises, exerciseId);
		} else if (exercises[exerciseId].childExercises.length) {
			for (
				let childExerciseId = 0;
				childExerciseId < exercises[exerciseId].childExercises.length;
				childExerciseId += 1) {
				if (exercises[exerciseId].childExercises[childExerciseId].slug === slug) {
					return getPreviousChildSlug(exercises, exerciseId, childExerciseId);
				}
			}
		}
	}
};

// filters the pending assignment from the list
export const filterPendingAssignment = (assignments) => {
	const pendingAssignmentList = [];
	for (let i = 0; i < assignments.length; i += 1) {
		const assignment = assignments[i];
		if (!assignment.completed && assignment.state === 'pending') {
			pendingAssignmentList.push(assignment);
		}
	}
	return pendingAssignmentList;
};


// //////////////////////////////////////////////////////////
export const findObjectIndex = (array, key, value) => array.findIndex(element => element[key] === value);


// to create a mentee schema row for Dashboard
const getMenteesReportSchema = (mentees, extraFields) => {
	const menteesCourseReportSchema = [];
	for (let i = 0; i < mentees.length; i += 1) {
		const menteeCourseReportSchema = {
			menteeId: mentees[i].id,
			menteeName: mentees[i].name,
			menteeEmail: mentees[i].email,
			...extraFields,
		};
		menteesCourseReportSchema.push(menteeCourseReportSchema);
	}
	return menteesCourseReportSchema;
};

export const getMenteeCoursesTable = (coursesReport, mentees) => {
	const reportTable = [];
	const extraFields = {
		menteeCourseStatus: 'unenroll',
		completedSubmissions: 0,
	};

	// get a schema of mentees courses reports to display in each courses
	const menteesReportSchema = getMenteesReportSchema(mentees, extraFields);

	// update each and every courses
	coursesReport.forEach((course) => {
		const { studentEnrolled, ...courseDetails } = course;

		// create a copy of schema for every courses
		const report = {
			mentees: menteesReportSchema.slice(),
			...courseDetails,
		};

		// updating the value for student who have status as enroll or completed.
		studentEnrolled.forEach((mentee) => {
			const { menteeEmail } = mentee;
			const menteeIndex = findObjectIndex(mentees, 'email', menteeEmail);
			report.mentees[menteeIndex] = { ...mentee };
		});
		reportTable.push(report);
	});

	return reportTable;
};


export const getMenteeExercisesTable = (exercisesReport, mentees) => {
	const reportTable = [];

	const extraFields = {
		submissionId: null,
		submissionState: 'open',
		submissionCompleted: false,
	};

	const menteesReportSchema = getMenteesReportSchema(mentees, extraFields);
	exercisesReport.forEach((exercise) =>{
		const { submissions, ...exerciseDetails } = exercise;
		const report = {
			...exerciseDetails,
			mentees: menteesReportSchema.slice(),
		}

		submissions.forEach((submission) => {
			const { menteeEmail } = submission;
			const menteeIndex = findObjectIndex(mentees, 'email', menteeEmail);
			report.mentees[menteeIndex] = { ...submission };
		});

		reportTable.push(report);
	});
	return reportTable;
}
