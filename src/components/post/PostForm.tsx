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
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useState, MouseEvent, use, useEffect, useContext } from 'react';
import ImagesUpload, { FileWithPreview } from '../shared/ImagesUpload';
import { MediaContent } from '@/models/media-content';
import ImageSwiper from './ImageSwiper';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';
import { useCreatePost } from '@/hooks/post/useCreatePost';
import { Post, PostRequest } from '@/models/post';
import toast from 'react-hot-toast';
import { Arguments, useSWRConfig } from 'swr';
import { QueryKeys } from '@/constants/query-keys';
import { usePatchPost } from '@/hooks/post/usePatchPost';
import { mutate as global_mutate } from 'swr';
import { PostContext } from '@/context/post-context';
import { ListResponse } from '@/models/api';
import { User } from '@/models/user';

const schema = yup.object({
  caption: yup.string().required('Caption is required'),
  visibility: yup.number().min(0).max(2).required('Visibility is required'),
  isStory: yup.boolean().required('Story is required'),
});

interface PostFormProps {
  post?: Post | null;
  postMedia?: MediaContent[];
  open: boolean;
  handleClose: () => void;
}

const steps = ['Select media', 'Media details'];

const PostForm = ({ post, postMedia, open, handleClose }: PostFormProps) => {
  const { user: currentUser } = useAuthenticatedUser();
  if (!currentUser) return null;

  const { mutatePosts } = useContext(PostContext);

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate } = useSWRConfig();
  const createPost = useCreatePost();
  const updatePost = usePatchPost();

  const postForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      caption: '',
      visibility: 0,
      isStory: false,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        if (!post) {
          const postData = new FormData();

          postData.append('creator_id', currentUser.id);
          postData.append('content', values.caption);
          postData.append('visibility', values.visibility.toString());
          postData.append('is_story', values.isStory.toString());
          postData.append('is_deleted', 'false');

          mediaContentList.forEach((mediaContent, index) => {
            if (mediaContent instanceof File) {
              postData.append('media_files', mediaContent);
              if (mediaContent.type.startsWith('image/'))
                postData.append('media_types', 'IMAGE');
              else postData.append('media_types', 'VIDEO');
            } else {
              toast.error('Media content is not a file');
              return;
            }
          });

          const response = await createPost(postData);
          if (response) {
            await mutatePosts((pages: ListResponse<Post>[]) => {
              if (!pages || pages.length === 0) return pages;
            
              const pageSize = pages[0].size;
              const total = pages[0].total + 1;
              const totalPages = Math.ceil(total / pageSize);
            
              const newPost: Post = {
                ...response.post,
                creator: {
                  id: currentUser.id,
                  username: currentUser.username,
                  profileImg: currentUser.profileImg,
                } as Partial<User>,
              };
              // Chèn post mới vào đầu trang đầu tiên
              const newFirstItems = [newPost, ...pages[0].items].slice(0, pageSize);
            
              const updatedFirstPage: ListResponse<Post> = {
                ...pages[0],
                items: newFirstItems,
                total,
                pages: totalPages,
              };
              const listResponse: ListResponse<Post>[] = [updatedFirstPage, ...pages.slice(1)];
              
              console.log(listResponse);
              
              return listResponse;
            }, false); // false = không revalidate
            toast.success('Post created successfully');
          } else {
            toast.error('Failed to create post');
          }
        } else {
          const postRequest: Partial<PostRequest> = {
            content: values.caption,
            visibility: values.visibility,
            isStory: values.isStory,
          };
          await updatePost(post.id, postRequest);

          toast.success('Post updated successfully');
        }
      } catch (error: any) {
        toast.error('Failed to create post:', error.detail || error);
      } finally {
        setIsSubmitting(false);
        postForm.resetForm();
        setMediaContentList([]);
        setActiveStep(0);
        handleClose();
      }
    },
  });

  useEffect(() => {
    if (post && postMedia) {
      postForm.setValues({
        caption: post.content,
        visibility: post.visibility,
        isStory: post.isStory,
      });
      setMediaContentList(postMedia);
      setActiveStep(1);
    }
  }, [post, postMedia]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        width: '100%',
        '& .MuiDialog-paper': {
          maxWidth: '1000px',
        },
      }}
    >
      <DialogTitle>{!post ? 'Create Post' : 'Edit Post'}</DialogTitle>
      <DialogContent>
        {!post && (
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
        )}

        <React.Fragment>
          {activeStep === 0 && !post ? (
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
                display: 'flex',
                flexDirection: 'row',
                pt: '20px',
                gap: 2,
              }}
            >
              <ImageSwiper width="450px" postMedia={mediaContentList} />

              <Box
                sx={{
                  width: '340px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '7px',
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    height: '60px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 10px 14px 14px',
                    borderBottom: '1px solid #e0e0e0',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '15px',
                    }}
                  >
                    {currentUser.profileImg ? (
                      <Avatar src={currentUser.profileImg} />
                    ) : (
                      <Avatar sx={{ height: '32px', width: '32px' }}>
                        {currentUser.username.charAt(0).toUpperCase()}
                      </Avatar>
                    )}

                    <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                      {currentUser.username}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    height: '100%',
                    overflowY: 'scroll',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    '::-webkit-scrollbar': { width: 0 },
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
                      id="caption"
                      name="caption"
                      type="text"
                      rows={8}
                      multiline
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={postForm.values.caption}
                      onChange={postForm.handleChange}
                      helperText={
                        postForm.touched.caption &&
                        (postForm.errors.caption as string)
                      }
                      error={
                        postForm.touched.caption &&
                        Boolean(postForm.errors.caption)
                      }
                    />
                  </Box>

                  <Box mb="10px">
                    <Typography fontSize="12px" fontWeight="bold">
                      Who can see this?
                    </Typography>
                    <Select
                      value={postForm.values.visibility}
                      size="small"
                      name="visibility"
                      id="visibility"
                      onChange={postForm.handleChange}
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
                          checked={postForm.values.isStory}
                          onChange={postForm.handleChange}
                          name="isStory"
                          id="isStory"
                        />
                      }
                      label="Post to your story"
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            {activeStep !== 0 && !post && (
              <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}

            <Box sx={{ flex: '1 1 auto' }} />

            {activeStep === steps.length - 1 ? (
              <LoadingButton
                loading={isSubmitting}
                variant="text"
                onClick={postForm.submitForm}
              >
                {post ? 'Done' : 'Post'}
              </LoadingButton>
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
