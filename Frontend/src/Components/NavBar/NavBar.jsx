import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export function NavBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        className={classes.title}
                    ></Typography>
                    <Link to="/signup" style={{ textDecoration: "none" }}>
                        <Button variant="contained" color="primary">
                            Sign Up
                        </Button>
                    </Link>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <Button variant="contained" color="secondary">
                            Login
                        </Button>
                    </Link>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Button variant="contained">Home</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}
