import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';


import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';



const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
}));



export default function Sidebar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Food Waste Prevention Website (Name)
          </Typography>

          <Link to="/Login/">
          <Button color="inherit ">Login</Button>
          </Link>
          <Grid>
                    <IconButton>
                        <Avatar>Hi</Avatar>
                    </IconButton>    
                    <IconButton>
                        <Badge badgeContent={4} color= 'secondary'>

                        </Badge>
                    </IconButton>
                </Grid>

        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>

            <ListItem button key={"home"} component={Link} to="/">
              <ListItemIcon>
                { <InboxIcon> </InboxIcon>} 
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>

            <ListItem button key={"customer"} component={Link} to="/customer">
              <ListItemIcon>
                { <InboxIcon> </InboxIcon>} 
              </ListItemIcon>
              <ListItemText primary={"Customer"} />
            </ListItem>

            <ListItem button key={"restaurant"} component={Link} to="/Restaurant">
              <ListItemIcon>
                { <InboxIcon> </InboxIcon>} 
              </ListItemIcon>
              <ListItemText primary={"Restaurant"} />
            </ListItem>

            <ListItem button key={"login"} component={Link} to="/Login">
              <ListItemIcon>
                { <InboxIcon> </InboxIcon>} 
              </ListItemIcon>
              <ListItemText primary={"Login"} />
            </ListItem>

        </List>
        <Divider />
        <List>
            <ListItem button key={"aboutUs"} component={Link} to="/">
              <ListItemIcon>
                { <MailIcon> </MailIcon>} 
              </ListItemIcon>
              <ListItemText primary={"About Us"} />
            </ListItem>

            <ListItem button key={"contactUs"} component={Link} to="/">
              <ListItemIcon>
                { <MailIcon> </MailIcon>} 
              </ListItemIcon>
              <ListItemText primary={"Contact Us"} />
            </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}