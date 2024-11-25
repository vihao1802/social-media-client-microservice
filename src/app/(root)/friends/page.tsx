"use client";
import FollowersList from "@/components/friends/FollowersList";
import FollowingsList from "@/components/friends/FollowingsList";
import SuggestionsList from "@/components/friends/SuggestionsList";
import AvatarName from "@/components/shared/AvatarName";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: "40px 20px 20px" }}>{children}</Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Friends = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "calc(100% - 250px)",
        marginLeft: "auto",
      }}
    >
      <Box
        sx={{
          maxWidth: "720px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            padding: "20px 20px 16px",
            height: "70px",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "Left",
            }}
          >
            Friends
          </Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              textColor="inherit"
              TabIndicatorProps={{
                style: {
                  backgroundColor: "black",
                },
              }}
              sx={{
                margin: "0 20px",
                borderBottom: 1,
                borderColor: "divider",
                "& .MuiTabs-indicator": {
                  backgroundColor: "black",
                },
                "& .MuiTab-root": {
                  color: "black", // Set the tab text color to black
                },
              }}
            >
              <Tab
                label="Followers"
                {...a11yProps(0)}
                sx={{
                  padding: "12px 20px",
                }}
              />
              <Tab
                label="Following"
                {...a11yProps(1)}
                sx={{
                  padding: "12px 20px",
                }}
              />
              <Tab
                label="Suggestions"
                {...a11yProps(2)}
                sx={{
                  padding: "12px 20px",
                }}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <FollowersList />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <FollowingsList />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <SuggestionsList />
          </CustomTabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default Friends;
