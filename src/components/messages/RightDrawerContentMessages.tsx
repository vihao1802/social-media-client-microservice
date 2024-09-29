import {
  Box,
  Button,
  Drawer,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import AvatarName from "@/components/shared/AvatarName";
import { ArrowBack, LogoutRounded } from "@mui/icons-material";
import { useState } from "react";
import RightModalImageContentMessages from "./RightModalImageContentMessages";

interface ImageItem {
  id: number;
  src: string;
}

const ImageData: ImageItem[] = [
  {
    id: 1,
    src: "https://scontent.xx.fbcdn.net/v/t1.15752-9/459188955_900862458603229_8326142964982272881_n.png?_nc_cat=102&ccb=1-7&_nc_sid=0024fc&_nc_ohc=II1i_TqsCgwQ7kNvgGcDvvh&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_gid=AHFdCeiumbOFlfqT4bjDD1H&oh=03_Q7cD1QFchjYipJkx-Sqocbv8uhirbXduEZvESZLCE9Hs2n5tLg&oe=671CAB90",
  },
  {
    id: 2,
    src: "https://scontent.xx.fbcdn.net/v/t1.15752-9/460423924_872387467842126_8249741642612973109_n.png?_nc_cat=110&ccb=1-7&_nc_sid=0024fc&_nc_ohc=bn9YAW4PxBQQ7kNvgEIN7a8&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_gid=AHFdCeiumbOFlfqT4bjDD1H&oh=03_Q7cD1QEA6Oj7li634lCe5aKyZkb89BHTi6r-0KEo30EwSnK7kA&oe=671CC650",
  },
  {
    id: 3,
    src: "https://scontent.xx.fbcdn.net/v/t1.15752-9/459320652_389409244034710_4052756107008115339_n.png?_nc_cat=108&ccb=1-7&_nc_sid=0024fc&_nc_ohc=mVUq6-DSxbkQ7kNvgGXmG2W&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_gid=AHFdCeiumbOFlfqT4bjDD1H&oh=03_Q7cD1QEExV7dSe4NfOJ6d0AQvFMvwwNZ_2_RRjP9O-irlY4JkA&oe=671CDE0A",
  },
  {
    id: 4,
    src: "https://scontent.xx.fbcdn.net/v/t1.15752-9/458369754_403318239465079_4839529015965144641_n.png?_nc_cat=108&ccb=1-7&_nc_sid=0024fc&_nc_ohc=hL8rbanFyb4Q7kNvgFiLZiY&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_gid=AHFdCeiumbOFlfqT4bjDD1H&oh=03_Q7cD1QHqRvQLnRJWQ3z80K6c6V5zuH53792t74PAliiue-JNYQ&oe=671CC012",
  },
  {
    id: 5,
    src: "https://scontent.xx.fbcdn.net/v/t1.15752-9/459107176_1221825695726577_5355480495699502785_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=0024fc&_nc_ohc=Pw_mKFcVTTIQ7kNvgFn6f2U&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_gid=AHFdCeiumbOFlfqT4bjDD1H&oh=03_Q7cD1QG7bvEZfqn7UFr3QLpYeToR2GPMTI50sBa863OuXDNLXQ&oe=671CB02B",
  },
  {
    id: 6,
    src: "https://scontent.xx.fbcdn.net/v/t1.15752-9/461169044_1997832247353880_2109369470217661069_n.png?_nc_cat=107&ccb=1-7&_nc_sid=0024fc&_nc_ohc=WQlV_eXFnOYQ7kNvgHTzrgF&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_gid=AHFdCeiumbOFlfqT4bjDD1H&oh=03_Q7cD1QFIcfXWvBqzFgsNyBz0RyOKC7O2MxTObZx4Wp7rjUA5eQ&oe=671CB9D3",
  },
  {
    id: 7,
    src: "https://scontent.xx.fbcdn.net/v/t1.15752-9/459307127_519428510930245_4991468921474433288_n.png?_nc_cat=103&ccb=1-7&_nc_sid=0024fc&_nc_ohc=drookO3_1roQ7kNvgFOlx6O&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_gid=AHFdCeiumbOFlfqT4bjDD1H&oh=03_Q7cD1QHeSAPqhYdvwCkDOhmygP-asAJsfXuvgNTBBP4LXGcDtQ&oe=671CAFFF",
  },
  {
    id: 5,
    src: "https://scontent.xx.fbcdn.net/v/t1.15752-9/460188017_1683354479131141_1343734346609888834_n.png?_nc_cat=106&ccb=1-7&_nc_sid=0024fc&_nc_ohc=Ie5vxqE_UN0Q7kNvgEJusgr&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_gid=AHFdCeiumbOFlfqT4bjDD1H&oh=03_Q7cD1QHt110ENEN3Y4vB8CuJ_A3w9MZTjC8yFCmxUg2SGFW7Yw&oe=671CCEC9",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=242&h=121&fit=crop&auto=format",
  },
  {
    id: 7,
    src: "https://scontent.xx.fbcdn.net/v/t1.15752-9/460137770_1696682661186371_2003541354090048994_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=0024fc&_nc_ohc=fA4WcwVy38IQ7kNvgGWXSRi&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_gid=AHFdCeiumbOFlfqT4bjDD1H&oh=03_Q7cD1QFTX-F7lRdFjb8x3OQodpjCEweXjns4JJiPRpqCzIjqTA&oe=671CCA3F",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format",
  },
  {
    id: 6,
    src: "https://scontent.xx.fbcdn.net/v/t1.15752-9/459836836_888227236064396_2793857333405188036_n.png?_nc_cat=105&ccb=1-7&_nc_sid=0024fc&_nc_ohc=iPAWUd3yjTgQ7kNvgG0OowG&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_gid=AHFdCeiumbOFlfqT4bjDD1H&oh=03_Q7cD1QG_xoW661Pugq7a9dvDuC26AvGoPmELjvpnKhZVmyI0Mg&oe=671CCF94",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format",
  },
  {
    id: 7,
    src: "https://scontent.xx.fbcdn.net/v/t1.15752-9/460937585_1083626330046669_9176889895569088669_n.png?_nc_cat=106&ccb=1-7&_nc_sid=0024fc&_nc_ohc=Xx15rzh0E4MQ7kNvgGd4kC4&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_gid=AAP5A2AY_Yiu-b0TAaCLN9B&oh=03_Q7cD1QHIgxZkNRmkL1sbN52f14XgpZ3kld2DhtPeKdPdX9rBZw&oe=671CC72F",
  },
];

const RightDrawerContentMessages = ({
  closeDrawer,
}: {
  closeDrawer: () => void;
}) => {
  // handle modal image
  const [imgSrc, setImgSrc] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal(!openModal);

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
        }}
      >
        <img
          src={"https://material-ui.com/static/images/avatar/1.jpg"}
          alt="Avatar"
          className="w-24 h-24 rounded-full"
        />
        <p className="text-xl font-bold">Nguyen Van A</p>
        <Button
          sx={{
            backgroundColor: "#e7e7e7",
            color: "black",
            width: "150px",
            borderRadius: "10px",
          }}
        >
          View profile
        </Button>

        <Box
          sx={{
            borderTop: "2px solid #e7e7e7",
            width: "100%",
            marginTop: "10px",
          }}
        >
          <p className="text-xl font-semibold text-center my-4">Photos</p>
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
            <div className="grid grid-cols-3 gap-2 ">
              {ImageData.map((item: ImageItem, index: number) => {
                return (
                  <Box
                    key={index}
                    onClick={() => {
                      toggleModal();
                      setImgSrc(item.src);
                    }}
                  >
                    <img
                      src={item.src}
                      className="object-cover w-[125px] h-[125px] cursor-pointer hover:opacity-85"
                    />
                  </Box>
                );
              })}
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RightDrawerContentMessages;
