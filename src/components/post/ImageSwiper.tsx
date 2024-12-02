import { Box, IconButton } from "@mui/material";
import React, { useRef } from "react";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { MediaContent } from "@/models/media-content";
import { FileWithPreview } from "../shared/ImagesUpload";

interface ImageSwiperProps {
  width?: string;
  postMedia: (FileWithPreview | MediaContent)[];
}

const ImageSwiper = ({ postMedia, width }: ImageSwiperProps) => {
  const swiperRef = useRef<SwiperType>();
  return (
    <Box
      sx={{
        width: "auto",
        maxWidth: width || "600px",
        backgroundColor: "black",
        position: "relative",
      }}
    >
      {postMedia.length > 1 && (
        <IconButton
          onClick={() => swiperRef.current?.slidePrev()}
          sx={{
            height: "28px",
            width: "28px",
            position: "absolute",
            top: "50%",
            left: "15px",
            transform: "translateY(-50%)",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            padding: "10px",
            cursor: "pointer",
            zIndex: 10,
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <KeyboardArrowLeftRounded />
        </IconButton>
      )}

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={postMedia.length > 1}
        pagination={{
          clickable: true,
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Pagination, Navigation]}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {postMedia.map(
          (content: FileWithPreview | MediaContent, index: number) => {
            return (
              <SwiperSlide
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {content instanceof File ? (
                  <Box
                    component={content.type.includes("video") ? "video" : "img"}
                    controls
                    src={content.preview}
                    height="100%"
                    width="100%"
                    maxHeight="600px"
                    maxWidth="600px"
                    sx={{
                      objectFit: "cover",
                      // borderRadius: "5px",
                      backgroundColor: "#000",
                    }}
                  />
                ) : (
                  <Box
                    component={content.media_type === "video" ? "video" : "img"}
                    controls
                    src={content.media_Url}
                    height="100%"
                    width="100%"
                    maxHeight="600px"
                    maxWidth="600px"
                    sx={{
                      objectFit: "cover",
                      // borderRadius: "5px",
                      backgroundColor: "#000",
                    }}
                  />
                )}
              </SwiperSlide>
            );
          }
        )}
      </Swiper>

      {postMedia.length > 1 && (
        <IconButton
          onClick={() => swiperRef.current?.slideNext()}
          sx={{
            height: "28px",
            width: "28px",
            position: "absolute",
            top: "50%" /* Đặt nút ở giữa theo chiều dọc */,
            right: "15px" /* Cách mép phải 10px */,
            transform:
              "translateY(-50%)" /* Điều chỉnh để căn giữa theo chiều dọc */,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            padding: "10px",
            cursor: "pointer",
            zIndex: 10,
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <KeyboardArrowRightRounded />
        </IconButton>
      )}
    </Box>
  );
};

export default ImageSwiper;
