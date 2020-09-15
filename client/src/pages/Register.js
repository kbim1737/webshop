import React, {useState, useRef,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';
import AuthService from '../Services/AuthService';
import Message from '../components/Message';
import "./Login.css"




const SignUp = withRouter((props) => {
  const [user,setUser] = useState({fullname: "",username: "", password : ""});
  const [message,setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(()=>{
      return ()=>{
          clearTimeout(timerID);
      }
  },[]);

  const onChange = e =>{
      setUser({...user,[e.target.name] : e.target.value});
  }

  const resetForm = ()=>{
      setUser({username : "", password : ""});
  }

  const onSubmit = e =>{
      e.preventDefault();
      AuthService.register(user).then(data=>{
          const { message } = data;
          console.log(message)
          setMessage(message);
          resetForm();
          if(!message.msgError){
              timerID = setTimeout(()=>{
                  props.history.push('/login');
              },2000)
          }
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
      background: '#faf9f8'
    },
  }));

  return (
      <div className={classes.paper, "card"}>
        <h2 className="title" >
          Sign up
          
        </h2>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                id="fullname"
                name="fullname"
                variant="outlined"
                required
                fullWidth
                label="Full name"
                autoFocus
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="username"
                autoComplete="email"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="#faf9f8"
            className={classes.submit}
            onClick={onSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        {message ? <Message message={message}/> : null}
      </div>
 
  );
});

export default SignUp;