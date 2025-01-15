import {
  Avatar,
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import React, { Fragment } from 'react';

const users: any[] = [
  {
    id: 1,
    name: 'John Doe',
    nickname: 'Ali Connors',
    followers: 100,
    avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
  },
  {
    id: 2,
    name: 'Jane Doe',
    nickname: 'Ali Connors',
    followers: 100,
    avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
  },
  {
    id: 3,
    name: 'John Smith',
    nickname: 'Ali Connors',
    avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
  },
  {
    id: 4,
    name: 'Jane Smith',
    nickname: 'Ali Connors',
    followers: 100,
    avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
  },
];

const NotificationPanel = ({ open }: { open: boolean }) => {
  return (
    <Collapse orientation="horizontal" in={open}>
      <Box
        sx={{
          width: '350px',
          height: '100vh',
          backgroundColor: '#fff',
          borderRadius: '0 30px 30px 0',
          gap: '20px',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid #e2e8f0',
        }}
      >
        <Typography
          sx={{
            fontSize: '24px',
            fontWeight: 'bold',
            padding: '20px',
          }}
        >
          Notifications
        </Typography>
        {users.length > 0 && (
          <List>
            {users.map((user) => (
              <ListItem alignItems="flex-start" disablePadding key={user.id}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={user.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.name}
                    secondary={
                      <Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: 'text.primary', display: 'inline' }}
                        >
                          Ali Connors • {user.followers} followers
                        </Typography>
                      </Fragment>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}

        {users.length === 0 && (
          <Box
            sx={{
              width: '100%',
              height: '100%',
            }}
          >
            <Divider />
            <Typography
              sx={{
                padding: '20px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              Recent
            </Typography>
            <Typography
              sx={{
                padding: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#A0AAB4',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              No recent searches
            </Typography>
          </Box>
        )}
      </Box>
    </Collapse>
  );
};

export default NotificationPanel;
