import { Box , TextField , Typography , TextareaAutosize , Button } from '@material-ui/core'
import Alert from '../Alert/Alert'
import { useForm } from 'react-hook-form'
import { validateURL } from '../../utils/validateURL'
import { editAccount } from '../../utils/user'
import { USERS_API } from '../../API'
import React from 'react'
function FormEditAcc({data , setData , setAvatar , avatar , aboutMe , username , handleClose}) {
    const {
        register,
        formState: { errors },
        handleSubmit,
     } = useForm({
        mode: "onSubmit",
     });
     const onSubmit = (data) => {
        handleClose();
        editAccount(
           data,
           setData,
           `${USERS_API}/${localStorage.getItem("userId")}`,
           setAvatar
        );
     };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="input-container-modal-adaptive">
           <TextField
              label="Your Nickname"
              placeholder={username}
              {...register("editUsername", {
                 required: "Required fill",
                 minLength: {
                    value: 3,
                    message:
                       "Nickname can not be less than 3 characters",
                 },
                 maxLength: {
                    value: 15,
                    message:
                       "Nickname can not be more than 15 characters",
                 },
              })}
           />
           {errors?.editUsername && (
              <Alert
                 type="error"
                 text={errors?.editUsername?.message}
              />
           )}
           <TextField
              label="Your Avatar link"
              placeholder={avatar}
              {...register("editAvatar", {
                 required: "Required fill",
                 validate: (value) => validateURL(value),
              })}
           />
           {errors?.editAvatar && (
              <Alert
                 type="error"
                 text={errors?.editAvatar?.message}
              />
           )}
           <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
           >
              About you
           </Typography>
           <TextareaAutosize
              aria-label="empty textarea"
              placeholder={aboutMe}
              style={{
                 width: "66%",
                 maxHeight: "100px",
                 padding: "20px",
                 resize: "vertical",
                 margin: "0 auto ",
                 border: "1px solid black",
              }}
              {...register("editAbout", {
                 required: "Required fill",
                 maxLength: {
                    value: 40,
                    message:
                       "About section can not be more than 40 characters",
                 },
                 validate: {
                  longWord: (value) => {
                     value = value.split(" ");
                     for (let i = 0; i < value.length; i++) {
                        return (
                           value[i].length < 15 ||
                           "Seems you have one long word without spaces"
                        );
                     }
                  },
               },
              })}
           />
           {errors?.editAbout && (
              <Alert type="error" text={errors?.editAbout?.message} />
           )}
           <Button
              variant="contained"
              style={{
                 width: "150px",
                 display: "block",
                 margin: "0 auto",
              }}
              type="submit"
           >
              Submit
           </Button>
        </Box>
     </form>
    )
}

export default FormEditAcc
