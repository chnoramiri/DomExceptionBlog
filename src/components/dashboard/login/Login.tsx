import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import "./login.scss";
import login from '../../../assets/images/login.png'
type Props = {};

export default function Login({}: Props) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Grid container >
      <Grid item xs={8} className="loginP1">
        <img src={login} className="loginIMG"/>
      </Grid>
      <Grid item xs={4} gap="2" className="loginP2">
        <Grid>
          <Typography variant="h5">Sign in to your dashboard</Typography>
          <Typography variant="h7">
            new user? <Link> Create an account</Link>
          </Typography>
          <Grid container>
            <OutlinedInput type="text" value="" size="medium"></OutlinedInput>
          </Grid>
          <Grid>
            <FormControl>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                size="medium"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Grid>
          <Grid>
            {" "}
            <Link> Create an account</Link>
          </Grid>
          <Grid container>
            <Button variant="contained">Login</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
