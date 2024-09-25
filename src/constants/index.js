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
    id: 1,
    icon: <HomeOutlined />,
    route: "/",
    label: "Home",
  },
  {
    id: 2,
    icon: <SearchOutlined />,
    route: "/search",
    label: "Search",
  },
  {
    id: 3,
    icon: <ExploreOutlined />,
    route: "/explore",
    label: "Explore",
  },
  {
    id: 4,
    icon: <VideoLibraryOutlined />,
    route: "/reels",
    label: "Reels",
  },
  {
    id: 5,
    icon: <NearMeOutlined />,
    route: "/messages",
    label: "Messages",
  },
  {
    id: 6,
    icon: <FavoriteBorderOutlined />,
    route: "/notifications",
    label: "Notifications",
  },
  {
    id: 7,
    icon: <PeopleAltOutlined />,
    route: "/friends",
    label: "Friends",
  },
];
