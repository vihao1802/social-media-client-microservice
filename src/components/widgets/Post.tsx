import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";

export default function RecipeReviewCard() {
  return (
    <Card
      sx={{ width: "730px", borderRadius: "20px", boder: "1px solid #E2E8F0" }}
    >
      <CardHeader
        avatar={
          <Avatar
            src="https://material-ui.com/static/images/avatar/3.jpg"
            sx={{
              height: "40px",
              width: "40px",
            }}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            User 1
          </Typography>
        }
        subheader={
          <Typography
            sx={{
              fontSize: "14px",
              color: "#475569",
            }}
          >
            @Nickname 1 • 1h
          </Typography>
        }
        sx={{ borderBottom: "1px solid #E2E8F0" }}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://material-ui.com/static/images/cards/paella.jpg"
        sx={{ padding: "20px" }}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
