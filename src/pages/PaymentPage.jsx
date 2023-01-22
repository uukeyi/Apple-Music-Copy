import React from "react";
import {
   Container,
   TextField,
   Typography,
   Box,
   Button,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { formatAndSetCcNumber } from "../utils/cCValidate";
import Alert from "../components/Alert/Alert";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { buySubscription } from "../reduxToolkit/async/buySubscription";
function PaymentPage() {
   const { id, price } = useParams();
   const { status, error } = useSelector((state) => state.buySubscription);
   const dispatch = useDispatch();
   const {
      register,
      formState: { errors },
      handleSubmit,
      setValue,
      getValues
   } = useForm({
      mode: "onSubmit",
   });
   const onSubmit = () => {
      dispatch(
         buySubscription({ userId: localStorage.getItem("userId"), sub: id })
      );
   };
   const maxLengthInput = (value, number, name) => {
      if (value.length > number) {
         setValue(name, value.substring(0, number));
      }
   };
   const nameValidate = (value) => {
      const result = value.replace(/[^a-z' ']/gi, "");
      let countSpace = 0;
      for (let i = 0; i < result.length; i++) {
         if (result[i] === " ") {
            countSpace++;
         }
      }
      if (countSpace > 1) {
         const result = value.trim("");
         setValue("ownerName", result.toUpperCase());
      } else {
         setValue("ownerName", result.toUpperCase());
      }
   };
   return (
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
                  Payment
               </Typography>
               <Typography
                  component={"p"}
                  style={{ fontSize: "20px", textTransform: "uppercase" }}
               >
                  {id}
               </Typography>
               <TextField
                  label="Owner Name"
                  variant="standard"
                  {...register("ownerName", {
                     required: "This field is necessarily for filling",
                     validate : (value , formValue) => value.includes(' ') || 'Please use whitespace'
                  })}
                  onChange={(e) => nameValidate(e.target.value)}
               />
               {errors?.ownerName && (
                  <Alert type="error" text={errors?.ownerName?.message} />
               )}
               <TextField
                  label="Card"
                  variant="standard"
                  {...register("ccNumber", {
                     required: "This field is necessarily for filling",
                     minLength : {
                        value : 16,
                        message : "Can not be less than 16"
                     }
                  })}
                  onChange={(e) =>
                     formatAndSetCcNumber(e, "ccNumber", setValue)
                  }
               />
               {errors?.ccNumber && (
                  <Alert type="error" text={errors?.ccNumber?.message} />
               )}

               <TextField
                  label="Expiry"
                  variant="standard"
                  type="number"
                  {...register("expiry", {
                     required: "This field is necessarily for filling",
                     minLength : {
                        value : 4,
                        message : 'Can not be less than 4'
                     }
                  })}
                  onChange={(e) => maxLengthInput(e.target.value, 4, "expiry")}
               />
               {errors?.expiry && (
                  <Alert type="error" text={errors?.expiry?.message} />
               )}
               <TextField
                  label="CCV"
                  variant="standard"
                  type="number"
                  {...register("ccv", {
                     required: "This field is necessarily for filling",
                     minLength : {
                        value : 3,
                        message : 'Can not be less than 3'
                     }
                  })}
                  onChange={(e) => maxLengthInput(e.target.value, 3, "ccv")}
               />
               {errors?.ccv && (
                  <Alert type="error" text={errors?.ccv?.message} />
               )}
               <Typography
                  component={"p"}
                  style={{ fontSize: "20px", textTransform: "uppercase" }}
               >
                  {`Total to pay ${price}`}
               </Typography>
               {status === "rejected" ? (
                  <Alert type="error" text={error} />
               ) : null}
               {status === "fulfilled" ? (
                  <Alert
                     type="success"
                     text={"Your purchase successfully done!"}
                  />
               ) : null}
               <Button type="submit" variant="contained">
                  Submit
               </Button>
            </Box>
         </form>
      </Container>
   );
}

export default PaymentPage;
