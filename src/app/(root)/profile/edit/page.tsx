"use client";
import { useAuthenticatedUser } from "@/hooks/auth/useAuthenticatedUser";
import { useUpdateUser } from "@/hooks/user/useUpdateUser";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Modal,
  Snackbar,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const EditProfilePage = () => {
  const { user } = useAuthenticatedUser();
  const { updateUser } = useUpdateUser();
  const router = useRouter();

  if (!user) return null;

  const [newBio, setNewBio] = useState(user.bio || "");
  const [newPhoneNumber, setNewPhoneNumber] = useState(user.phoneNumber || "");
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);
  const handleOpenUploadModal = () => {
    // choose photo from local machine

    setOpenUploadModal(true);
  };
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    if (!newBio || !newPhoneNumber) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!newPhoneNumber.match(/^[0-9]{10}$/)) {
      toast.error("Please enter a valid phone number");
      return;
    }
    try {
      const { create_at, ...newUser } = user;
      const res = await updateUser({
        ...newUser,
        bio: newBio,
        phoneNumber: newPhoneNumber,
      });
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "calc(100% - 250px)",
        marginLeft: "auto",
      }}
    >
      <Modal
        open={openUploadModal}
        onClose={() => setOpenUploadModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              padding: "10px 15px",
              textAlign: "center",
              borderRadius: "10px 10px 0 0",
              cursor: "pointer",
              ":hover": {
                backgroundColor: "#f7f5f5",
              },
            }}
          >
            <input
              id="upload-photo"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label htmlFor="upload-photo" style={{ cursor: "pointer" }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "var(--buttonColor)",
                }}
              >
                Upload photo
              </Typography>
            </label>
          </Box>
          <Divider />
          <Box
            sx={{
              padding: "10px 15px",
              textAlign: "center",
              cursor: "pointer",
              borderRadius: "0 0 10px 10px",
              ":hover": {
                backgroundColor: "#f7f5f5",
              },
            }}
            onClick={() => setOpenUploadModal(false)}
          >
            <Typography sx={{ fontSize: "16px", color: "gray" }}>
              Cancel
            </Typography>
          </Box>
        </Box>
      </Modal>
      <Box
        sx={{
          width: "100%",
          maxWidth: "750px",
          margin: "0 auto",
          padding: "50px 20px 20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "20px 0",
          }}
        >
          <Typography variant="h5">Edit Profile</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              alignItems: "center",
              width: "100%",
              backgroundColor: "#e7e7e7",
              padding: "15px 20px",
              borderRadius: "25px",
            }}
          >
            <Box
              sx={{
                maxHeight: "60px",
                maxWidth: "60px",
                aspectRatio: "1",
              }}
            >
              {isLoadingPhoto ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <CircularProgress size={30} />
                </Box>
              ) : (
                <Box
                  component="img"
                  src={user.profile_img || "/icons/user.png"}
                  sx={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                  }}
                />
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">{user.username}</Typography>
              <Typography variant="body2" sx={{ color: "GrayText" }}>
                {user.email}
              </Typography>
            </Box>

            <Button
              sx={{
                textTransform: "none",
                backgroundColor: "var(--buttonColor)",
                color: "white",
                ":hover": {
                  backgroundColor: "var(--buttonHoverColor)",
                },
                marginLeft: "auto",
              }}
              onClick={handleOpenUploadModal}
            >
              Change photo
            </Button>
          </Box>
          <Box>
            <Typography variant="h6" marginBottom={2}>
              Bio
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <TextareaAutosize
                value={newBio}
                maxRows={2}
                maxLength={150}
                style={{
                  resize: "none",
                  padding: "10px",
                  borderRadius: "10px",
                  height: "100%",
                  maxHeight: "80px",
                  border: "1px solid gray",
                }}
                onChange={(e) => setNewBio(e.target.value)}
              />
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" marginBottom={2}>
              Phone Number
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <TextField
                value={newPhoneNumber}
                style={{
                  borderRadius: "10px",
                  height: "100%",
                  border: "1px solid gray",
                  width: "20%",
                }}
                onChange={(e) => setNewPhoneNumber(e.target.value)}
              />
            </Box>
          </Box>

          <Button
            sx={{
              textTransform: "none",
              backgroundColor: "var(--buttonColor)",
              color: "white",
              ":hover": {
                backgroundColor: "var(--buttonHoverColor)",
              },
              marginLeft: "auto",
              padding: "10px 40px",
            }}
            onClick={handleClick}
          >
            Save
          </Button>
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        onClose={handleClose}
        message="Save successful"
        key={"bottom-left"}
      />
    </Box>
  );
};

export default EditProfilePage;
