import React, {useState,useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthService from '../Services/AuthService';
import {AuthContext} from '../Context/AuthContext';
import { withRouter } from 'react-router-dom';
import './Login.css'


const SignIn = withRouter((props) => {
  const authContext = useContext(AuthContext);
  const [user,setUser] = useState({username: "", password : ""});
  // const [message,setMessage] = useState(null);
  

  const onChange = e =>{
      setUser({...user,[e.target.name] : e.target.value});
  }

  const onSubmit = e =>{
      e.preventDefault();
      
      console.log(authContext)
      AuthService.login(user).then(data=>{
          console.log(data);
          const { isAuthenticated,user} = data;
          if(isAuthenticated){
              authContext.setUser(user);
              authContext.setIsAuthenticated(isAuthenticated);
              props.history.push("/home")
          }
          else
              console.log("nem oke")
      });
  }




const classes = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    background: '#faf9f8'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));;
    
  return (
    // <Container component="main" maxWidth="xs">
      // <CssBaseline />
      <div className={classes.paper, "logincard"}>
        <h2 className="title" >
          Sign in
        </h2>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email Address"
            name="username"
            autoComplete="email"
            autoFocus
            onChange = {onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange = {onChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="#faf9f8"
            className={classes.submit}
            onClick = {onSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    // </Container>
  );
});


export default SignIn;