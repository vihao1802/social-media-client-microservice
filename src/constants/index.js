import {
  HomeOutlined,
  SearchOutlined,
  ExploreOutlined,
  VideoLibraryOutlined,
  NearMeOutlined,
  FavoriteBorderOutlined,
  PeopleAltOutlined,
} from "@mui/icons-material";
export const sideBarItems = [
  {
    icon: <HomeOutlined />,
    route: "/",
    label: "Home",
  },
  {
    icon: <SearchOutlined />,
    route: "/search",
    label: "Search",
  },
  {
    icon: <ExploreOutlined />,
    route: "/explore",
    label: "Explore",
  },
  {
    icon: <VideoLibraryOutlined />,
    route: "/reels",
    label: "Reels",
  },
  {
    icon: <NearMeOutlined />,
    route: "/messages",
    label: "Messages",
  },
  {
    icon: <FavoriteBorderOutlined />,
    route: "/notifications",
    label: "Notifications",
  },
  {
    icon: <PeopleAltOutlined />,
    route: "/friends",
    label: "Friends",
  },
];
