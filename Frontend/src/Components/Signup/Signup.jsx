import { TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
    root: {
        marginTop: "2%",
        display: "flex",
        flexDirection: "column",
        // border: "1px solid red",
        padding: "1% 1%",
        width: "25%",
        margin: "auto",
        gap: "10px",
    },
});

export const Signup = () => {
    const classes = useStyles();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [signinMessage, setSigninMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (firstName === "") {
            alert("First Name is required");
            return;
        }
        if (email === "") {
            alert("Email is required");
            return;
        }
        if (password === "") {
            alert("Password is required");
            return;
        }

        if (password !== confirmPassword) {
            alert("Both Password and Confirm Password must be same");
            return;
        } else {
            let payload = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            };

            axios
                .post("http://localhost:2244/users/signup", payload)
                .then((res) => setSigninMessage("Congradulations.."))
                .catch((err) => setSigninMessage("Something went wrong"))
                .finally(() => {
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                });
        }
    };
    return (
        <form className={classes.root}>
            <h3>Signup</h3>
            <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                value={firstName}
                required
                type="string"
                onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                value={lastName}
                type="string"
                onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                value={confirmPassword}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                >
                    Sign up
                </Button>
            </div>
            <Typography>{signinMessage !== "" && signinMessage}</Typography>
        </form>
    );
};
