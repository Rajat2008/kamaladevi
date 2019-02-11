
import React from 'react';

import withRoot from '../src/with-root';
import ProfileDetails from '../src/components/profile-details';
import Header from '../src/components/header';

const Profile = () => (
	<div>
    <Header />
    <ProfileDetails />
	</div>

);

export default withRoot(Profile);
