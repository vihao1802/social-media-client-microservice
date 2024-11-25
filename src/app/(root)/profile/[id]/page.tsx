import { Box, Button, Typography } from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";

const Profile = ({ params: { id } }: { params: { id: string } }) => {
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
            }}
          >
            <Box
              component="img"
              src="https://demo.foxthemes.net/instello/assets/images/avatars/avatar-6.jpg"
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                padding: "3px",
                objectFit: "cover",
                background:
                  "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
              }}
            />
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
                // padding: "0 30px",
                "& > * + *": {
                  marginTop: "20px",
                },
              }}
            >
              <Typography fontSize="20px">Monroe Parker</Typography>
              <Box>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "15px",
                  }}
                >
                  I love beauty and emotion. 🥰 I’m passionate about photography
                  and learning. 📚 I explore genres and styles. 🌈 I think
                  photography is storytelling. 📖 I hope you like and feel my
                  photos. 😊
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
                    <Typography>Posts</Typography>
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: "20px",
                      }}
                    >
                      162
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography>Following</Typography>
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: "20px",
                      }}
                    >
                      2,004
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography>Followers</Typography>
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: "20px",
                      }}
                    >
                      8,452
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    height: "40px",
                  }}
                >
                  <Button
                    sx={{
                      textTransform: "none",
                      ":hover": {
                        backgroundColor: "lightcyan",
                      },
                    }}
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
                  >
                    Message
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "50px",
            borderTop: "2px solid #e7e7e7",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                padding: "10px 16px",
                borderTop: "2px solid black",
                cursor: "pointer",
              }}
            >
              <CameraAltOutlinedIcon />
              <Typography>Posts</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                padding: "10px 16px",
                borderTop: "2px solid #e7e7e7",
                cursor: "pointer",
              }}
            >
              <PlayCircleOutlinedIcon />
              <Typography>Reels</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gridAutoRows: "1fr",
              gap: "5px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "300px",
                height: "auto", // Height adjusts automatically
                aspectRatio: "1",
              }}
            >
              <Box
                component="img"
                src="https://scontent.xx.fbcdn.net/v/t1.15752-9/462552043_955696469937422_2446026620966834216_n.jpg?stp=dst-jpg_p160x160&_nc_cat=101&ccb=1-7&_nc_sid=0024fc&_nc_ohc=uFtTeKVLrDkQ7kNvgFoaNDx&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_gid=AGvvsv5BCF4DVVqtkltq2Rp&oh=03_Q7cD1QFDGg5NpEjdyyaKVWWntg2KYp5mKRtn9h52Y_pIrHsALA&oe=6735F57D"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Ensures the image covers the container
                }}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                maxWidth: "300px", // Maximum width is 300px
                height: "auto", // Height adjusts automatically
                aspectRatio: "1",
              }}
            >
              <Box
                component="img"
                src="https://scontent.xx.fbcdn.net/v/t1.15752-9/461055324_3338717029758083_2640910248794611067_n.jpg?stp=dst-jpg_s280x280&_nc_cat=105&ccb=1-7&_nc_sid=0024fc&_nc_ohc=L1p4P0W_hlgQ7kNvgHq2lbP&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_gid=AGvvsv5BCF4DVVqtkltq2Rp&oh=03_Q7cD1QGUkRPtyfDszKag4SfurRPkt3Chgjf4JvW-ZPgT6lSwAw&oe=6735DD0B"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            <Box
              sx={{
                width: "100%",
                maxWidth: "300px",
                height: "auto", // Height adjusts automatically
                aspectRatio: "1",
              }}
            >
              <Box
                component="img"
                src="https://scontent.xx.fbcdn.net/v/t1.15752-9/462381148_514380041485859_6509112155811549624_n.png?stp=dst-png_p206x206&_nc_cat=105&ccb=1-7&_nc_sid=0024fc&_nc_ohc=N3RlY3Ypn8QQ7kNvgHZ2j5J&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_gid=AGvvsv5BCF4DVVqtkltq2Rp&oh=03_Q7cD1QEfNuBkKpfOcjMHPxAh3A9eLrIskI6VDynVqMNGrSH-cg&oe=6735F3E5"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            <Box
              sx={{
                width: "100%",
                maxWidth: "300px",
                height: "auto", // Height adjusts automatically
                aspectRatio: "1",
              }}
            >
              <Box
                component="img"
                src="https://scontent.xx.fbcdn.net/v/t1.15752-9/462550578_1221708805700680_5964128019846678715_n.png?stp=dst-png_p206x206&_nc_cat=100&ccb=1-7&_nc_sid=0024fc&_nc_ohc=dG57DGfX2bkQ7kNvgGryfPb&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_gid=AGvvsv5BCF4DVVqtkltq2Rp&oh=03_Q7cD1QFNu9hmG-C9Ky7mnG6WL0_c7aVeZiqSpShbSP1vLx-XLQ&oe=6735EAE2"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
