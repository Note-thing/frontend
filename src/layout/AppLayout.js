import {
    List,
    ListItem,
    ListItemText,
    Grid,
    Avatar,
    Input,
    Chip,
} from "@mui/material";
import "./AppLayout.css";
import {
    Code,
    Preview,
    VerticalSplit,
    PictureAsPdf,
    Share,
    Delete,
    PersonOutline,
    LocalOffer,
    KeyboardArrowRight,
} from "@mui/icons-material";
import MainMenu from "./MainMenu";
import EditorComponent from "./EditorComponent";

/**
 * Layout of the application
 * @param {*} props
 * @returns
 */
export default function AppLayout(props) {
    return (
        <Grid container>
            <MainMenu />
            <EditorComponent />
        </Grid>
    );
}
