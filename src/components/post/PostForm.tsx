import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ImagesUpload, { FileWithPreview } from "../shared/ImagesUpload";
import { MediaContent } from "@/models/media-content";
import ImageSwiper from "./ImageSwiper";
import { useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  caption: yup.string().required("Caption is required"),
  visibility: yup.number().min(0).max(2).required("Visibility is required"),
  isStory: yup.boolean().required("Story is required"),
});

interface PostFormProps {
  open: boolean;
  handleClose: () => void;
}

const steps = ["Select media", "Media details"];

const PostForm = ({ open, handleClose }: PostFormProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [mediaContentList, setMediaContentList] = useState<
    (FileWithPreview | MediaContent)[]
  >([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [visibility, setVisibility] = React.useState("");

  const handleChangeVisibility = (event: SelectChangeEvent) => {
    setVisibility(event.target.value as string);
  };

  const [checked, setChecked] = React.useState(false);

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const postForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      caption: "",
      visibility: 0,
      isStory: false,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        width: "100%",
        "& .MuiDialog-paper": {
          maxWidth: "1000px",
        },
      }}
    >
      <DialogTitle>Create media</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <React.Fragment>
          {activeStep === 0 ? (
            <Box pt="20px">
              <ImagesUpload
                value={mediaContentList}
                onChange={(value) => {
                  setMediaContentList(value);
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: "20px",
                gap: 2,
              }}
            >
              {mediaContentList[0] instanceof File &&
              mediaContentList[0].type.startsWith("video") ? (
                <Box
                  component="video"
                  controls
                  src={mediaContentList[0].preview}
                  height="400px"
                  width="300px"
                  sx={{
                    objectFit: "cover",
                    borderRadius: "5px",
                    backgroundColor: "#000",
                  }}
                />
              ) : "media_type" in mediaContentList[0] &&
                mediaContentList[0].media_type === "video" ? (
                <Box
                  component="video"
                  controls
                  src={mediaContentList[0].media_Url}
                  height="400px"
                  width="300px"
                  sx={{
                    objectFit: "cover",
                    borderRadius: "5px",
                    backgroundColor: "#000",
                  }}
                />
              ) : (
                <ImageSwiper width="450px" postMedia={mediaContentList} />
              )}

              <Box
                sx={{
                  width: "340px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "7px",
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    height: "60px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 10px 14px 14px",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <Avatar sx={{ height: "32px", width: "32px" }}>Q</Avatar>
                    <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                      Hu chuynh
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    height: "100%",
                    overflowY: "scroll",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    "::-webkit-scrollbar": { width: 0 },
                  }}
                >
                  <Box mb="10px">
                    <Typography fontSize="12px" fontWeight="bold">
                      Caption:
                    </Typography>
                    <TextField
                      autoFocus
                      required
                      placeholder="Write a caption..."
                      margin="dense"
                      id="courtDescription"
                      name="courtDescription"
                      type="text"
                      rows={8}
                      multiline
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                  </Box>

                  <Box mb="10px">
                    <Typography fontSize="12px" fontWeight="bold">
                      Who can see this?
                    </Typography>
                    <Select
                      value={visibility}
                      placeholder="Who can see this?"
                      size="small"
                      onChange={handleChangeVisibility}
                      fullWidth
                    >
                      <MenuItem value={0}>Public</MenuItem>
                      <MenuItem value={1}>Friend</MenuItem>
                      <MenuItem value={2}>Just me</MenuItem>
                    </Select>
                  </Box>
                  <Box mb="10px">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={checked}
                          onChange={handleChangeChecked}
                        />
                      }
                      label="Post to your story"
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {activeStep !== 0 && (
              <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}

            <Box sx={{ flex: "1 1 auto" }} />

            {activeStep === steps.length - 1 ? (
              <Button>Share</Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={mediaContentList.length === 0}
              >
                Next
              </Button>
            )}
          </Box>
        </React.Fragment>
      </DialogContent>
    </Dialog>
  );
};

export default PostForm;
