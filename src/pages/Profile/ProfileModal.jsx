import React, { useEffect, useState } from 'react'
import {
    Avatar,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    IconButton,
    Modal,
    TextField,
} from "@mui/material";
import { useFormik } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../../redux/auth/auth.action';
import { uploadToCloudinary } from '../../util/uploadToCloudinary'

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    //   height: "90vh",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    borderRadius: 3,
    outline: "none",
    overflow: "scroll-y",
};

const ProfileModal = ({ open, handleClose, user }) => {
    const dispatch = useDispatch();
    const [uploading, setUploading] = useState(false);


    useEffect(() => {
        console.log(user);
        formik.setValues({ "firstName": user?.firstName, "lastName": user?.lastName, "bio": user?.bio ? user?.bio : "", image: user?.image ? user?.image : "" });
    }, [user])

    const handleSubmit = (values) => {
        console.log(values);
        dispatch(updateUserProfile(values));
        handleClose();
    };

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            bio: "",
            backgroundImage: "",
            image: "",
        },
        onSubmit: handleSubmit,
    });

    const handleImageChange = async (event) => {
        setUploading(true);
        const { name } = event.target;
        const file = event.target.files[0];
        console.log(file, name);
        if (file.type.includes("image")) {
            const url = await uploadToCloudinary(file, "image");
            formik.setFieldValue(name, url);
            setUploading(false);
        } else {
            setUploading(false);
            alert("only images allowed for dp")
        }
    };

    return (
        <div className="">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <IconButton onClick={handleClose} aria-label="delete">
                                    <CloseIcon />
                                </IconButton>
                                <p>Edit Profile</p>
                            </div>

                            <Button type="submit">Save</Button>
                        </div>

                        <div className="hideScrollbar overflow-y-scroll  overflow-x-hidden h-[80vh]">
                            <div className="">
                                <div className="w-full">
                                    <div className="relative ">
                                        <img
                                            src={
                                                "https://cdn.pixabay.com/photo/2018/10/16/15/01/background-image-3751623_1280.jpg"
                                            }
                                            alt="Img"
                                            className="w-full h-[12rem] object-cover object-center"
                                        />
                                        {/* Hidden file input */}
                                        <input
                                            type="file"
                                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                            // onChange={handleImageChange}
                                            name="backgroundImage"
                                        />
                                    </div>
                                </div>

                                <div className="w-full transform -translate-y-20 translate-x-4 h-[6rem]">
                                    <div className="relative borde ">
                                        <Avatar
                                            src={formik.values.image}
                                            alt="Img"
                                            sx={{
                                                width: "10rem",
                                                height: "10rem",
                                                border: "4px solid white",
                                            }}
                                        />
                                        <input
                                            type="file"
                                            className="absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer"
                                            onChange={handleImageChange}
                                            name="image"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <TextField
                                    fullWidth
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    fullWidth
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}

                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    id="bio"
                                    name="bio"
                                    label="Bio"
                                    value={formik.values.bio}
                                    onChange={formik.handleChange}
                                    error={formik.touched.bio && Boolean(formik.errors.bio)}
                                    helperText={formik.touched.bio && formik.errors.bio}
                                />
                                {/* <TextField
                                    fullWidth
                                    id="website"
                                    name="website"
                                    label="Website"
                                    value={formik.values.website}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.website && Boolean(formik.errors.website)
                                    }
                                    helperText={formik.touched.website && formik.errors.website}
                                /> */}
                                {/* <TextField
                                    fullWidth
                                    id="location"
                                    name="location"
                                    label="Location"
                                    value={formik.values.location}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.location && Boolean(formik.errors.location)
                                    }
                                    helperText={formik.touched.location && formik.errors.location}
                                /> */}
                            </div>
                            {/* <div className="my-3">
                                <p className="text-lg">Birth date · Edit</p>
                                <p className="text-2xl"> October 26, 1999</p>
                            </div>
                            <p className="py-3 text-lg">Edit Professional Profile</p> */}
                        </div>
                        <Backdrop
                            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={uploading}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </form>
                </Box>
            </Modal>
        </div>

    )
}

export default ProfileModal