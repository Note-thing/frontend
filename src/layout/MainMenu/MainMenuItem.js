import {
    Chip,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
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
                    secondary={directory.notes
                        .map((w) => w.title)
                        .join(" - ")
                        .slice(0, 35)
                        .concat("...")}
                />
            </ListItem>
            <List
                sx={{
                    opacity: show ? "1" : "0",
                    height: show ? "auto" : "0 !important",
                    padding: show ? "auto" : "0 !important",
                    transition: show
                        ? "0.2s opacity ease-out"
                        : "0.1s  ease-out",
                }}
            >
                {directory.notes.map((note, idx) => (
                    <ListItemButton key={idx}>
                        <ListItemText
                            primary={note.title}
                            secondary={note.tags.map((t, idx) => (
                                <Chip
                                    key={idx}
                                    label={t}
                                    sx={{ marginRight: "0.1rem" }}
                                    size="small"
                                />
                            ))}
                        />
                    </ListItemButton>
                ))}
            </List>
            {show && <hr size={1} color="#e9f0f0" />}
        </>
    );
}
