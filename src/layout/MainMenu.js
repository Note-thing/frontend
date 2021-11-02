import {
    List,
    ListItem,
    ListItemText,
    Grid,
    Avatar,
    Input,
} from "@mui/material";
import "./AppLayout.css";
import {
    PersonOutline,
    KeyboardArrowRight,
} from "@mui/icons-material";
/**
 * Main menu of the application (left panel with directories, notes, search and access to user parameters)
 * @param {*} props
 * @returns
 */
export default function MainMenu(props) {
    const user = {};
    user.name = "Frank Letest";
    return (
        <Grid
                className="h-100"
                display="flex"
                xs={4}
                md={2}
                direction="column"
                justifyContent="space-between"
                borderRight="0.1rem solid #e9F0F0"
            >
                <List className="">
                    {["Inbox", "Starred", "Send email", "Drafts"].map(
                        (text) => (
                            <ListItem
                                button
                                key={text}
                                secondaryAction={<KeyboardArrowRight />}
                            >
                                <ListItemText
                                    primary={text}
                                    secondary={text + "," + text}
                                />
                            </ListItem>
                        )
                    )}
                </List>
                <List>
                    <ListItem>
                        <Input
                            sx={{ width: "100%" }}
                            placeholder="Rechercher dans les notes"
                        />
                    </ListItem>
                    <ListItem>
                        <Grid
                            sx={{ width: "100%", alignItems: "center" }}
                            display="flex"
                            justifyContent="space-between"
                        >
                            <span>{user.name}</span>
                            <Avatar alt="user-avatar">
                                <PersonOutline />
                            </Avatar>
                        </Grid>
                    </ListItem>
                </List>
            </Grid>
    );
}
