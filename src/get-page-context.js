/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';


// Generate breakpoints so we can use them in the theme definition
const breakpoints = createBreakpoints({});

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
	palette: {
		primary: {
			light: purple[300],
			main: purple[500],
			dark: purple[700],
		},
		secondary: {
			light: green[300],
			main: green[500],
			dark: green[700],
		},
		warning: {
			light: amber.A300,
			main: amber.A500,
			dark: amber.A700,
		},
		info: {
			light: blue.A300,
			main: blue.A500,
			dark: blue.A700,
		},
	},
	typography: {
		headline: {
			[breakpoints.down('md')]: {
				fontSize: 16,
			},
		},
		textSecondary: {
			[breakpoints.down('md')]: {
				fontSize: 10,
			},
		},
	},
});

function createPageContext() {
	return {
		theme,
		// This is needed in order to deduplicate the injection of CSS in the page.
		sheetsManager: new Map(),
		// This is needed in order to inject the critical CSS.
		sheetsRegistry: new SheetsRegistry(),
		// The standard class name generator.
		generateClassName: createGenerateClassName(),
	};
}

export default function getPageContext() {
	// Make sure to create a new context for every server-side request so that data
	// isn't shared between connections (which would be bad).
	if (!process.browser) {
		return createPageContext();
	}

	// Reuse context on the client-side.
	if (!global.__INIT_MATERIAL_UI__) {
		global.__INIT_MATERIAL_UI__ = createPageContext();
	}

	return global.__INIT_MATERIAL_UI__;
}
