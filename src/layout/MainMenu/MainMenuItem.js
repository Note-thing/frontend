import { List, ListItem, ListItemText } from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";
import { useState } from "react";

export default function MainMenuItem({ directory }) {
    const [show, setShow] = useState(false);
    return (
        <>
            <ListItem
                button
                st
                onClick={() => setShow(!show)}
                key={directory.name + "idx"}
                secondaryAction={
                    <KeyboardArrowRight
                        sx={{
                            transform: show ? "rotate(90deg)" : "rotate(0)",
                            transition: "0.3s",
                        }}
                    />
                }
            >
                <ListItemText
                    primary={directory.name}
                    secondary={directory.name + "," + directory.name}
                />
            </ListItem>

            <List
                sx={{
                    opacity: show ? "1" : "0",
                    height: show  ? "auto" : "0",
                    transition: show ? "0.2s opacity ease-out" : "0.1s  ease-out"  ,
                }}
            >
                {directory.notes.map((note, idx) => (
                    <ListItem>
                        <ListItemText primary={note} />
                    </ListItem>
                ))}
            </List>
        </>
    );
}
