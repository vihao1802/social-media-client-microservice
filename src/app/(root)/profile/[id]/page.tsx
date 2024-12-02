"use client";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import { useGetUserById } from "@/hooks/user/useGetUserById";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useAuthenticatedUser } from "@/hooks/auth/useAuthenticatedUser";
import { Fragment, useEffect } from "react";
import GradientCircularProgress from "@/components/shared/Loader";
import { useGetRelationshipByUserIdFollower } from "@/hooks/relationship/useGetRelationshipByUserIdFollower";
import { useGetRelationshipByUserIdFollowing } from "@/hooks/relationship/useGetRelationshipByUserIdFollowing";
import { RelationshipStatus } from "@/types/enum";
import { useGetFollowerQuantity } from "@/hooks/relationship/useGetFollowerQuantity";
import { useGetFollowingQuantity } from "@/hooks/relationship/useGetFollowingQuantity";
import ProfileBottomContent from "@/components/profile/ProfileBottomContent";
import { usePostsByUserId } from "@/hooks/post/usePostsByUserId";

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user } = useGetUserById({ id });
  const { user: currentUser } = useAuthenticatedUser();
  const router = useRouter();
  const { data: followerList } = useGetRelationshipByUserIdFollower({
    userId: id,
  });
  const { data: followingList } = useGetRelationshipByUserIdFollowing({
    userId: id,
  });

  const { data: followerQuantity } = useGetFollowerQuantity({ userId: id });
  const { data: followingQuantity } = useGetFollowingQuantity({ userId: id });

  const { data: postResponse } = usePostsByUserId({
    userId: id,
  });

  console.log({ postResponse });

  const handleMessage = () => {
    if (!followerList || !followingList || !currentUser) return;
    // merge
    const filteredFollower = followerList.find(
      (follower) =>
        follower.senderId === currentUser.id &&
        follower.status === RelationshipStatus.Accepted
    );
    const filteredFollowing = followingList.find(
      (following) =>
        following.receiverId === currentUser.id &&
        following.status === RelationshipStatus.Accepted
    );
    console.log({ filteredFollower, filteredFollowing });

    if (filteredFollower !== undefined)
      window.location.href = `/messages/r/${filteredFollower.id}/u/${id}`;
    if (filteredFollowing !== undefined)
      window.location.href = `/messages/r/${filteredFollowing.id}/u/${id}`;
  };

  const handleUnFollow = () => {
    console.log("Unfollowed");
  };

  const handleEditProfile = () => {
    router.push("/profile/edit");
  };

  if (!user || !currentUser || !followerList || !followingList)
    return <GradientCircularProgress />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "calc(100% - 250px)",
        marginLeft: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "980px",
          margin: "0 auto",
          padding: "50px 20px 20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            gap: "20px",
            padding: "20px 0",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              maxHeight: "150px",
              maxWidth: "150px",
              flex: "1",
            }}
          >
            {user && (
              <Box
                component="img"
                src={user.profile_img || "/icons/user.png"}
                sx={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              width: {
                xs: "100%",
                md: "75%",
              },
            }}
          >
            <Box
              sx={{
                "& > * + *": {
                  marginTop: "20px",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: { xs: "flex-start", md: "center" },
                  flexDirection: {
                    xs: "column",
                    md: "row",
                  },
                  gap: "20px",
                }}
              >
                <Typography fontSize="20px" fontWeight="normal">
                  {user.username}
                </Typography>
                {user.id === currentUser.id && (
                  <Button
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#e7e7e7",
                      color: "black",
                      ":hover": {
                        backgroundColor: "lightgray",
                      },
                    }}
                    onClick={handleEditProfile}
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "15px",
                  }}
                >
                  {user.bio}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: { xs: "left", md: "center" },
                  flexDirection: {
                    xs: "column",
                    md: "row",
                  },
                  gap: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    maxWidth: "300px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ color: "GrayText" }}>Posts</Typography>
                    {postResponse ? (
                      <Typography
                        sx={{
                          fontWeight: "700",
                          fontSize: "20px",
                        }}
                      >
                        {postResponse.items.length}
                      </Typography>
                    ) : (
                      <Skeleton variant="text" width={50} />
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ color: "GrayText" }}>
                      Followers
                    </Typography>
                    {followerQuantity ? (
                      <Typography
                        sx={{
                          fontWeight: "700",
                          fontSize: "20px",
                        }}
                      >
                        {followerQuantity.quantity}
                      </Typography>
                    ) : (
                      <Skeleton variant="text" width={50} />
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ color: "GrayText" }}>
                      Following
                    </Typography>
                    {followingQuantity ? (
                      <Typography
                        sx={{
                          fontWeight: "700",
                          fontSize: "20px",
                        }}
                      >
                        {followingQuantity.quantity}
                      </Typography>
                    ) : (
                      <Skeleton variant="text" width={50} />
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    height: "40px",
                  }}
                >
                  {currentUser &&
                    user &&
                    currentUser.id !== user.id &&
                    (followingList.find(
                      (following) =>
                        following.receiverId === currentUser.id &&
                        following.status === RelationshipStatus.Accepted
                    ) ||
                      followerList.find(
                        (follower) =>
                          follower.senderId === currentUser.id &&
                          follower.status === RelationshipStatus.Accepted
                      )) && (
                      <Fragment>
                        <Button
                          sx={{
                            textTransform: "none",
                            ":hover": {
                              backgroundColor: "lightcyan",
                            },
                          }}
                          onClick={handleUnFollow}
                        >
                          Unfollow
                        </Button>
                        <Button
                          sx={{
                            textTransform: "none",
                            backgroundColor: "var(--buttonColor)",
                            color: "white",
                            ":hover": {
                              backgroundColor: "var(--buttonHoverColor)",
                            },
                          }}
                          onClick={handleMessage}
                        >
                          Message
                        </Button>
                      </Fragment>
                    )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {postResponse ? (
          <ProfileBottomContent posts={postResponse.items} />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <GradientCircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
