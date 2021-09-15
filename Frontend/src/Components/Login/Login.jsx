import { TextField } from "@material-ui/core";
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

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [dataList, setDataList] = useState("");
    const [user, setUser] = useState("");

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === "") {
            alert("Email is required");
            return;
        }
        if (password === "") {
            alert("Password is required");
            return;
        } else {
            let payload = {
                email: email,
                password: password,
            };
            setIsLoading(true);
            axios
                .post("http://localhost:2244/users/login", payload)
                .then((res) => {
                    setUser(res.data.data.user);
                    axios
                        .get("http://localhost:2244/users/")
                        .then((res) => setDataList(res.data.data))
                        .catch(() => setIsError(true));
                })
                .catch(() => setIsError(true))
                .finally(() => setIsLoading(false));
        }
    };

    return (
        <div className={classes.root}>
            <h3>Login</h3>
            <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                required
                type="string"
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                value={password}
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            <div>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                >
                    Login
                </Button>
            </div>
            <br />

            <div
                style={{
                    marginLeft: "5%",
                }}
            >
                {isLoading ? (
                    <div>...Loading</div>
                ) : isError ? (
                    <div>Something went wrong</div>
                ) : (
                    <div>
                        <div>
                            {user !== "" && (
                                <table style={{ border: "1px solid black" }}>
                                    <tr>
                                        <th
                                            style={{
                                                border: "1px solid black",
                                            }}
                                        >
                                            First Name
                                        </th>
                                        <th
                                            style={{
                                                border: "1px solid black",
                                            }}
                                        >
                                            Last Name
                                        </th>
                                        <th
                                            style={{
                                                border: "1px solid black",
                                            }}
                                        >
                                            Email
                                        </th>
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                border: "1px solid black",
                                            }}
                                        >
                                            {user.firstName}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid black",
                                            }}
                                        >
                                            {user.lastName}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid black",
                                            }}
                                        >
                                            {user.email}
                                        </td>
                                    </tr>
                                </table>
                            )}
                        </div>
                        <br />
                        <br />

                        <table
                            style={{
                                border: "1px solid black",
                                marginLeft: "20%",
                            }}
                        >
                            {dataList !== "" && (
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                    </tr>
                                ) &&
                                dataList.map((data) => (
                                    <tr>
                                        <td>{data.firstName}</td>
                                        <td>{data.lastName}</td>
                                    </tr>
                                ))}
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};
