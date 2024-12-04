"use client";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useGetUserById } from "@/hooks/user/useGetUserById";
import { useParams, useRouter } from "next/navigation";
import { useAuthenticatedUser } from "@/hooks/auth/useAuthenticatedUser";
import { Fragment } from "react";
import GradientCircularProgress from "@/components/shared/Loader";
import { useGetRelationshipByUserIdFollower } from "@/hooks/relationship/useGetRelationshipByUserIdFollower";
import { useGetRelationshipByUserIdFollowing } from "@/hooks/relationship/useGetRelationshipByUserIdFollowing";
import { RelationshipStatus } from "@/types/enum";
import { useGetFollowerQuantity } from "@/hooks/relationship/useGetFollowerQuantity";
import { useGetFollowingQuantity } from "@/hooks/relationship/useGetFollowingQuantity";
import { Post } from "@/models/post";
import { usePostFollowUser } from "@/hooks/relationship/usePostFollowUser";
import toast from "react-hot-toast";
import { relationshipApi } from "@/api/relationship";
import { mutate } from "swr";

interface ProfileBottomContentProps {
  posts: Array<Post>;
}

const ProfileTopContent = ({ posts }: ProfileBottomContentProps) => {
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

  const { followUser } = usePostFollowUser();

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

  const handleUnFollow = async (user_id: string) => {
    if (!user_id) return;
    try {
      const res = await relationshipApi.unfollowUser(user_id);
      if (res) {
        toast.success("Unfollowed");
        mutate("get_me_following");
        mutate("get_me_follower");
        mutate("get_message_by_relationship_id");
        mutate("get_follower_quantity");
        mutate("get_following_quantity");
        mutate("get_by_user_id_follower");
        mutate("get_by_user_id_following");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProfile = () => {
    router.push("/profile/edit");
  };

  const handleFollow = async () => {
    try {
      const res = await followUser({ user_id: id });
      if (res) {
        toast.success("Followed successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!user || !currentUser || !followerList || !followingList)
    return <GradientCircularProgress />;

  return (
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
                {posts ? (
                  <Typography
                    sx={{
                      fontWeight: "700",
                      fontSize: "20px",
                    }}
                  >
                    {posts.length}
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
                <Typography sx={{ color: "GrayText" }}>Followers</Typography>
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
                <Typography sx={{ color: "GrayText" }}>Following</Typography>
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
                      onClick={() => handleUnFollow(user.id)}
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
              {currentUser &&
                user &&
                currentUser.id !== user.id &&
                followerList.find(
                  (follower) =>
                    follower.senderId === currentUser.id &&
                    follower.status === RelationshipStatus.Pending
                ) && (
                  <Fragment>
                    <Button
                      disabled
                      sx={{
                        textTransform: "none",
                        backgroundColor: "#e7e7e7",
                        ":disabled": {
                          color: "black",
                        },
                      }}
                      onClick={handleFollow}
                    >
                      Pending
                    </Button>
                  </Fragment>
                )}
              {currentUser &&
                user &&
                currentUser.id !== user.id &&
                followingList.find(
                  (following) =>
                    following.receiverId === currentUser.id &&
                    following.status === RelationshipStatus.Pending
                ) && (
                  <Fragment>
                    <Button
                      sx={{
                        textTransform: "none",
                        backgroundColor: "var(--buttonColor)",
                        color: "white",
                        ":hover": {
                          backgroundColor: "var(--buttonHoverColor)",
                        },
                      }}
                      onClick={handleFollow}
                    >
                      Accept
                    </Button>
                  </Fragment>
                )}
              {currentUser &&
                user &&
                currentUser.id !== user.id &&
                !followingList.find(
                  (following) => following.receiverId === currentUser.id
                ) &&
                !followerList.find(
                  (follower) => follower.senderId === currentUser.id
                ) && (
                  <Fragment>
                    <Button
                      sx={{
                        textTransform: "none",
                        backgroundColor: "var(--buttonColor)",
                        color: "white",
                        ":hover": {
                          backgroundColor: "var(--buttonHoverColor)",
                        },
                      }}
                      onClick={handleFollow}
                    >
                      Follow
                    </Button>
                  </Fragment>
                )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileTopContent;
