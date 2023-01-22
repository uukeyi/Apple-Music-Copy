import React from "react";
import {
   Box,
   Container,
   TextField,
   Typography,
   Button,
   Checkbox,
   FormGroup,
   FormControlLabel,
   Link as MUIlLink,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../reduxToolkit/async/auth";
import Alert from "../Alert/Alert";
import { useAuth } from "../../contexts/authContext";
function SignIn() {
   const dispatch = useDispatch();
   const { setIsAuth, isAuthObj } = useAuth();
   const { status, error } = useSelector((state) => state.authIn);
   const {
      register,
      formState: { errors },
      handleSubmit,
   } = useForm({
      mode: "onChange",
   });
   const onSubmit = async (data) => {
      dispatch(
         signIn({ data: data, setAuth: setIsAuth, isAuthObj: isAuthObj })
      );
   };
   if (status === "fulfilled") {
      return <Navigate to={"/"} />;
   }

   return (
      <div>
         <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
               <Box
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     maxWidth: "500px",
                     gap: "40px",
                     justifyContent: "center",
                     margin: "50px auto",
                     textAlign: "center",
                  }}
               >
                  <Typography
                     component={"p"}
                     style={{ fontSize: "25px", textTransform: "uppercase" }}
                  >
                     Sign in
                  </Typography>
                  {status === "rejected" ? (
                     <Alert type="error" text={error} />
                  ) : null}
                  <TextField
                     label="Email"
                     variant="standard"
                     {...register("email", {
                        required: "This field is necessarily for filling",
                        pattern: {
                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                           message: "Invalid email address",
                        },
                     })}
                  />
                  {errors?.email && (
                     <Alert type="error" text={errors?.email?.message} />
                  )}
                  <TextField
                     label="Password"
                     type="password"
                     variant="standard"
                     {...register("password", {
                        required: "This field is necessarily for filling",
                        minLength: {
                           value: 8,
                           message: "Password is too short",
                        },
                     })}
                  />
                  {errors?.password && (
                     <Alert type="error" text={errors?.password?.message} />
                  )}
                  <FormGroup>
                     <FormControlLabel
                        control={<Checkbox color="default" defaultChecked />}
                        label="Remember me"
                     />
                  </FormGroup>
                  <Button type="submit" variant="contained">
                     Submit
                  </Button>
                  <MUIlLink component={Link} to={"/signUp"}>
                     Don't have an account? Sign Up!
                  </MUIlLink>
               </Box>
            </form>
         </Container>
      </div>
   );
}

export default SignIn;
