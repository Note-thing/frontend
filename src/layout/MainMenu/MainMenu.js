import {
    List,
    ListItem,
    ListItemText,
    Grid,
    Avatar,
    Input,
} from "@mui/material";
import { PersonOutline, KeyboardArrowRight } from "@mui/icons-material";
import MainMenuItem from "./MainMenuItem";
/**
 * Main menu of the application (left panel with directories, notes, search and access to user parameters)
 * @param {*} props
 * @returns
 */
export default function MainMenu(props) {
    const user = {};
    user.name = "Frank Letest";
    const notesDirectories = [
        { name: "TWEB", notes: ["CSS", "JS", "JS - This...wat"] },
        { name: "PDG", notes: ["Note-thing", "CI/CD", "Ruby on Rails"] },
        {
            name: "AMT",
            notes: [
                "Guide de survie total",
                "Survire en haute mer",
                "Apprendre à utiliser une boussole",
            ],
        },
    ];
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
            <List>
                {notesDirectories.map((dir, idx) => (
                    <MainMenuItem directory={dir} />
                ))}
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
