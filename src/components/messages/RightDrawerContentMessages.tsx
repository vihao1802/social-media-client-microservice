import { Box, Button, IconButton } from "@mui/material";
import { LogoutRounded } from "@mui/icons-material";
import { useState } from "react";
import RightModalImageContentMessages from "./RightModalImageContentMessages";
import { useGetUserById } from "@/hooks/user/useGetUserById";
import GradientCircularProgress from "../shared/Loader";
import { useParams, useRouter } from "next/navigation";
import { useGetMessageByRelationshipId } from "@/hooks/message/useGetMessageByRelationshipId";

const RightDrawerContentMessages = ({
  closeDrawer,
  u_id,
}: {
  closeDrawer: () => void;
  u_id: string;
}) => {
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal(!openModal);
  const { r_id: relationshipId } = useParams<{ r_id: string }>();
  const { data: user } = useGetUserById({ id: u_id });
  const { data: messagesRes } = useGetMessageByRelationshipId({
    relationshipId: relationshipId,
  });

  if (!user || !messagesRes)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <GradientCircularProgress />
      </Box>
    );

  console.log(messagesRes);

  return (
    <Box sx={{ width: "100%", maxWidth: 400 }} role="presentation">
      <IconButton
        sx={{
          position: "absolute",
          color: "black",
          margin: "15px",
          padding: "0",
        }}
        onClick={closeDrawer}
      >
        <LogoutRounded
          fontSize="large"
          sx={{
            color: "gray",
            ":hover": {
              color: "black",
            },
            transition: "0.2s ease",
          }}
        />
      </IconButton>
      <RightModalImageContentMessages
        imgSrc={imgSrc}
        openModal={openModal}
        toggleModal={toggleModal}
      />
      <Box
        sx={{
          height: "100vh",
          padding: "15px 0 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <img
          src={user.profile_img || "/icons/user.png"}
          alt="Avatar"
          className="w-24 h-24 rounded-full"
        />
        <p className="text-xl font-bold">{user.username}</p>
        <Button
          sx={{
            backgroundColor: "#e7e7e7",
            color: "black",
            width: "150px",
            borderRadius: "10px",
          }}
          onClick={() => router.push(`/profile/${u_id}`)}
        >
          View profile
        </Button>

        <Box
          sx={{
            borderTop: "2px solid #e7e7e7",
            width: "100%",
            marginTop: "10px",
            flex: 1,
          }}
        >
          <Box
            sx={{
              height: "calc(100vh - 290px)",
              overflowY: "auto",
              "::-webkit-scrollbar": { width: "10px" },
              "::-webkit-scrollbar-track": {
                background: "#f1f1f1",
              },
              "::-webkit-scrollbar-thumb": {
                background: "#858585",
              },
              "::-webkit-scrollbar-thumb:hover": {
                background: "#777",
              },
            }}
          >
            {!messagesRes || messagesRes === undefined ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <GradientCircularProgress />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    gridColumnStart: 1,
                    gridColumnEnd: 4,
                  }}
                >
                  <p className="text-xl font-semibold pt-3">Photos</p>
                </Box>
                {messagesRes.data.map((item, index) => {
                  if (item.mediaContents.length === 0) return null;
                  return (
                    <Box
                      key={index}
                      onClick={() => {
                        toggleModal();
                        setImgSrc(item.mediaContents[0].media_url);
                      }}
                    >
                      <img
                        alt="image"
                        src={item.mediaContents[0].media_url}
                        className="object-cover w-[125px] h-[125px] cursor-pointer hover:opacity-85"
                      />
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RightDrawerContentMessages;
