import { useGetSearchUser } from '@/hooks/user/useGetSearchUser';
import { Pagination } from '@/models/api';
import { User } from '@/models/user';
import { SearchRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { Fragment, use, useRef, useState } from 'react';

const SearchPanel = ({ open }: { open: boolean }) => {
  const router = useRouter();

  const searchRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState('');
  const { data, isLoading } = useGetSearchUser({
    query: search,
    enabled: Boolean(search),
  });

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
          Search
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: '10px',
            padding: '0 10px',
          }}
        >
          <TextField
            inputRef={searchRef}
            label="Search"
            variant="outlined"
            size="small"
            color="primary"
            sx={{
              width: '90%',
              height: '40px',
              margin: '0 auto',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#E0E3E7',
                },
                '&:hover fieldset': {
                  borderColor: '#B2BAC2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6F7E8C',
                },
              },
              '& label.Mui-focused': {
                color: '#A0AAB4',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#B2BAC2',
              },
            }}
          />
          <IconButton
            onClick={() => {
              setSearch(searchRef.current?.value || '');
            }}
          >
            <SearchRounded />
          </IconButton>
        </Box>

        {data && search && data.items.length > 0 ? (
          <List
            sx={{
              width: '100%',
              height: '100%',
              overflowY: 'auto',
            }}
          >
            {data.items.map((user: User, index: number) => (
              <ListItem alignItems="flex-start" disablePadding key={index}>
                <ListItemButton
                  onClick={() => router.push(`/profile/${user.id}`)}
                >
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={user.profile_img} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.username}
                    secondary={
                      <Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: 'text.primary', display: 'inline' }}
                        >
                          {user.email}
                        </Typography>
                      </Fragment>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
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

export default SearchPanel;
