import { Grid } from "@mui/material";
import "./AppLayout.css";
import MainMenu from "./MainMenu";
import EditorComponent from "./editor/EditorComponent";

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
