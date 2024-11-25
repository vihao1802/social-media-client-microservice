"use client";

import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import {
  MoreHorizRounded,
  FavoriteBorderOutlined,
  FavoriteBorderRounded,
  SendOutlined,
  BookmarkBorderRounded,
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";
import Image from "next/image";
import React, { useRef, useState } from "react";
import postImg from "@/assets/images/post-img.jpg";
import postImg1 from "@/assets/images/post-img1.jpg";
import postImg2 from "@/assets/images/post-img2.jpg";
import postImg3 from "@/assets/images/post-img3.jpg";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";

const postImages = [postImg, postImg1, postImg2, postImg3];

const PostComment = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) => {
  const swiperRef = useRef<SwiperType>();

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      sx={{
        position: "fixed",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "auto",
          height: "95%",
          bgcolor: "white",
          display: "flex",
          flexDirection: "row",
          borderRadius: "7px",
        }}
      >
        <Box
          sx={{
            width: "auto",
            maxWidth: "600px",
            backgroundColor: "black",
            position: "relative",
          }}
        >
          {postImages.length > 1 && (
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
            loop={true}
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
            {postImages.map((img, index) => (
              <SwiperSlide key={index} style={{ display: "flex" }}>
                <Image
                  src={img.src}
                  alt="Post Image"
                  width={img.width}
                  height={img.height}
                  layout="intrinsic"
                  style={{
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {postImages.length > 1 && (
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
        <Box
          sx={{
            width: "500px",
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
              <Avatar
                src={postImg.src}
                sx={{ height: "32px", width: "32px" }}
              />
              <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                User 1
              </Typography>
            </Box>
            <IconButton>
              <MoreHorizRounded sx={{ color: "black" }} />
            </IconButton>
          </Box>

          {/* Show comment */}
          <Box
            sx={{
              height: "calc(100% - 220px)",
              overflowY: "scroll",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              "::-webkit-scrollbar": { width: 0 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "start",
              }}
            >
              <Box width="10%">
                <Avatar
                  src={postImg.src}
                  sx={{ height: "32px", width: "32px" }}
                />
              </Box>

              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    backgroundColor: "#f0f2f5",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <Link href={""}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        ":hover": { color: "#858585" },
                      }}
                    >
                      User 1
                    </Typography>
                  </Link>
                  <Typography sx={{ fontSize: "14px" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consectetur, at blanditiis? Nobis nam omnis totam,
                    temporibus nostrum nesciunt corrupti impedit nulla
                    exercitationem praesentium cumque, voluptates eum est ea,
                    alias fugiat.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "center",
                    marginTop: "5px",
                  }}
                >
                  <Typography sx={{ fontSize: "12px", color: "#858585" }}>
                    1d
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#858585",
                      ":hover": { color: "#000", cursor: "pointer" },
                    }}
                  >
                    Reply
                  </Typography>
                  <IconButton
                    sx={{
                      height: "20px",
                      width: "20px",
                    }}
                  >
                    <FavoriteBorderOutlined
                      sx={{ color: "#858585", fontSize: "13px" }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "start",
              }}
            >
              <Box width="10%">
                <Avatar
                  src={postImg.src}
                  sx={{ height: "32px", width: "32px" }}
                />
              </Box>

              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    backgroundColor: "#f0f2f5",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <Link href={""}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        ":hover": { color: "#858585" },
                      }}
                    >
                      User 1
                    </Typography>
                  </Link>
                  <Typography sx={{ fontSize: "14px" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consectetur, at blanditiis? Nobis nam omnis totam,
                    temporibus nostrum nesciunt corrupti impedit nulla
                    exercitationem praesentium cumque, voluptates eum est ea,
                    alias fugiat.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "center",
                    marginTop: "5px",
                  }}
                >
                  <Typography sx={{ fontSize: "12px", color: "#858585" }}>
                    1d
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#858585",
                      ":hover": { color: "#000", cursor: "pointer" },
                    }}
                  >
                    Reply
                  </Typography>
                  <IconButton
                    sx={{
                      height: "20px",
                      width: "20px",
                    }}
                  >
                    <FavoriteBorderOutlined
                      sx={{ color: "#858585", fontSize: "13px" }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "start",
              }}
            >
              <Box width="10%">
                <Avatar
                  src={postImg.src}
                  sx={{ height: "32px", width: "32px" }}
                />
              </Box>

              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    backgroundColor: "#f0f2f5",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <Link href={""}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        ":hover": { color: "#858585" },
                      }}
                    >
                      User 1
                    </Typography>
                  </Link>
                  <Typography sx={{ fontSize: "14px" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consectetur, at blanditiis? Nobis nam omnis totam,
                    temporibus nostrum nesciunt corrupti impedit nulla
                    exercitationem praesentium cumque, voluptates eum est ea,
                    alias fugiat.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "center",
                    marginTop: "5px",
                  }}
                >
                  <Typography sx={{ fontSize: "12px", color: "#858585" }}>
                    1d
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#858585",
                      ":hover": { color: "#000", cursor: "pointer" },
                    }}
                  >
                    Reply
                  </Typography>
                  <IconButton
                    sx={{
                      height: "20px",
                      width: "20px",
                    }}
                  >
                    <FavoriteBorderOutlined
                      sx={{ color: "#858585", fontSize: "13px" }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "start",
              }}
            >
              <Box width="10%">
                <Avatar
                  src={postImg.src}
                  sx={{ height: "32px", width: "32px" }}
                />
              </Box>

              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    backgroundColor: "#f0f2f5",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <Link href={""}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        ":hover": { color: "#858585" },
                      }}
                    >
                      User 1
                    </Typography>
                  </Link>
                  <Typography sx={{ fontSize: "14px" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consectetur, at blanditiis? Nobis nam omnis totam,
                    temporibus nostrum nesciunt corrupti impedit nulla
                    exercitationem praesentium cumque, voluptates eum est ea,
                    alias fugiat.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "center",
                    marginTop: "5px",
                  }}
                >
                  <Typography sx={{ fontSize: "12px", color: "#858585" }}>
                    1d
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#858585",
                      ":hover": { color: "#000", cursor: "pointer" },
                    }}
                  >
                    Reply
                  </Typography>
                  <IconButton
                    sx={{
                      height: "20px",
                      width: "20px",
                    }}
                  >
                    <FavoriteBorderOutlined
                      sx={{ color: "#858585", fontSize: "13px" }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Comment Action */}
          <Box
            sx={{ height: "100px", display: "flex", flexDirection: "column" }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #e0e0e0",
                padding: "5px 10px",
              }}
            >
              <Box>
                <IconButton>
                  <FavoriteBorderRounded />
                </IconButton>
                <IconButton>
                  <SendOutlined />
                </IconButton>
              </Box>

              <IconButton>
                <BookmarkBorderRounded />
              </IconButton>
            </Box>
            <Box sx={{ padding: "0 20px" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                18,998 likes
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#858585 " }}>
                19 hours ago
              </Typography>
            </Box>
          </Box>

          {/* Comment Box */}
          <Box
            sx={{
              height: "60px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "10px",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <InputBase
              placeholder="Add comment..."
              sx={{ color: "black", flexGrow: 1, ml: 1 }}
            />
            <Button
              sx={{
                height: "30px",
                fontSize: "14px",
                fontWeight: "bold",
                textTransform: "capitalize",
                padding: "5px 10px",
              }}
            >
              Post
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default PostComment;
