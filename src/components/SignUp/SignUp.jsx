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
   Link as MUILink,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Alert from "../Alert/Alert";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../reduxToolkit/async/auth";
function SignUp() {
   const dispatch = useDispatch();
   const { status, error } = useSelector((state) => state.authUp);
   const {
      register,
      formState: { errors },
      handleSubmit,
   } = useForm({
      mode: "onChange",
   });
   const onSubmit = (data) => {
      dispatch(
         signUp({
            data: data,
         })
      );
   };
   return (
      <div>
         <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
               <Box
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     maxWidth: "500px",
                     gap: "30px",
                     justifyContent: "center",
                     margin: "50px auto",
                     textAlign: "center",
                  }}
               >
                  <Typography
                     component={"p"}
                     style={{ fontSize: "25px", textTransform: "uppercase" }}
                  >
                     Sign up
                  </Typography>
                  {status === "rejected" ? (
                     <Alert type="error" text={error} />
                  ) : null}
                  {status === "fulfilled" ? (
                     <Alert type="success" text={"Successfully registered"} />
                  ) : null}
                  <TextField
                     label="Username"
                     variant="standard"
                     {...register("username", {
                        required: "This field is necessarily for filling",
                        minLength: {
                           value: 6,
                           message: "Too short  username",
                        },
                     })}
                  />

                  {errors?.username && (
                     <Alert type="error" text={errors?.username?.message} />
                  )}
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
                        label="I agree with privacy policy"
                        {...register("acceptPrivacy", {
                           required: "This checkbox is necessarily for filling",
                        })}
                     />
                     {errors?.acceptPrivacy && (
                        <Alert
                           type="error"
                           text={errors?.acceptPrivacy?.message}
                        />
                     )}
                  </FormGroup>
                  <Button type="submit" variant="contained">
                     Submit
                  </Button>
                  <MUILink component={Link} to={"/signIn"}>
                     Already have an account? Sign in!
                  </MUILink>
               </Box>
            </form>
         </Container>
      </div>
   );
}

export default SignUp;
