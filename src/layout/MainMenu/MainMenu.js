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
        {
            name: "TWEB",
            notes: [
                { title: "CSS", tags: ["Web", "design "] },
                { title: "JS", tags: ["JS", "prototype"] },
                { title: "Node", tags: ["JS", "SSR"] },
            ],
        },
        {
            name: "PDG",
            notes: [
                { title: "Note-thing", tags: ["Web", "design"] },
                { title: "Ruby on Rails", tags: ["Model", "Controller"] },
                { title: "CI/CD", tags: ["Jest.js", "Unit test"] },
            ],
        },
        {
            name: "AMT",
            notes: [
                { title: "Guide de survie total", tags: ["Spring"] },
                { title: "Survire en haute mer", tags: ["Spring", "MVC"] },
                {
                    title: "Apprendre à utiliser une boussole",
                    tags: ["Navigation"],
                },
            ],
        },
    ];
    return (
        <Grid
            container
            sx={{ height: "100%" }}
            display="flex"
            direction="column"
            justifyContent="space-between"
        >
            <Grid sx={{ height: "80%", overflowY: "scroll" }}>
                <List>
                    {notesDirectories.map((dir, idx) => (
                        <MainMenuItem key={idx} directory={dir} />
                    ))}
                </List>
            </Grid>
            <Grid
                container
                sx={{
                    padding: "1rem",
                    height: "20%",
                    alignSelf: "flex-end",
                }}
            >
                <Input
                    sx={{ width: "100%", marginBottom: "1rem" }}
                    placeholder="Rechercher dans les notes"
                />
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
            </Grid>
        </Grid>
    );
}
