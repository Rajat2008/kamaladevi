import React, {Component} from 'react';
import PropTypes from 'prop-types';
import localforage from 'localforage'

import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
		textAlign: 'center',
		paddingTop: theme.spacing.unit * 10,
	},
  textField: {
    marginLeft: theme.spacing.unit * 5,
    marginRight: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 4,
    width: '40%',
  },
  dense: {
    marginTop: 15,
  },
	paper: {
		width: '35%',
		minWidth:'200px',
		margin: 'auto',
		padding: theme.spacing.unit * 4,
	},
});

class ProfileDetails extends React.Component {
  constructor(props) {
		super(props);
    this.state = {
      // errorText: '', value: props.value,
      nameValue:"",
      emailValue:"",
      gitValue:"",
      linkedinValue:"",
      centerValue:"",
      graduateValue:"",

    };
  }

  _handleTextChange =  name => event => {
    this.setState({
      [name]: event.target.value
    });
};

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
            <Typography
              variant="headline"
              gutterBottom
            >
              Personal Details <br />
                  </Typography>
                <TextField
                    id="standard-dense"
                    label="Name"
                    onChange={this._handleTextChange("nameValue")}
                    className={classNames(classes.textField, classes.dense)}
                    margin="dense"
                />
                <TextField  // 1.callback functionn ,(event) => this.hanleChange(event)
                    id="standard-dense"
                    label="Email"
                    onChange={this._handleTextChange("emailValue")}
                    className={classNames(classes.textField, classes.dense)}
                    margin="dense"
                />
                <TextField
                    id="standard-dense"
                    label="Github"
                    onChange={this._handleTextChange("gitValue")}
                    // errorText= {this.state.errorText}
                    // onChange={this.onChange.bind(this)}
                    className={classNames(classes.textField, classes.dense)}
                    margin="dense"
                />
                <TextField
                    id="standard-dense"
                    label="Linkedin"
                    onChange={this._handleTextChange("linkedinValue")}
                    className={classNames(classes.textField, classes.dense)}
                    margin="dense"
                />
                <TextField
                    id="standard-dense"
                    label="Center"
                    onChange={this._handleTextChange("centerValue")}
                    className={classNames(classes.textField, classes.dense)}
                    margin="dense"
                />
                <TextField
                    id="standard-dense"
                    label="Graduated or not"
                    onChange={this._handleTextChange("graduateValue")}
                    className={classNames(classes.textField, classes.dense)}
                    margin="dense"
                />
        </Paper>
      </div>
          )
      }
}
// onChange(event) {
//   if (event.target.value.startsWith("https://github.com")) {
//     this.setState({ errorText: '' })
//   } else {
//     this.setState({ errorText: 'Invalid format: ###-###-####' })
//   }
// } //git commit -m "kuch commit detail #81" ==> have to do commit like This

ProfileDetails.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileDetails);
