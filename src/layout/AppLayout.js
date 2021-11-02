import { Grid } from "@mui/material";
import "./AppLayout.css";
import MainMenu from "./MainMenu/MainMenu";
import EditorComponent from "./editor/EditorComponent";

/**
 * Layout of the application
 * @param {*} props
 * @returns
 */
export default function AppLayout(props) {
    return (
        <Grid container>
            <Grid
                item
                xs={4}
                md={2}
                height="100%"
                borderRight="0.1rem solid #e9F0F0"
            >
                <MainMenu />
            </Grid>
            <Grid item xs={8} md={10}>
                <EditorComponent />
            </Grid>
        </Grid>
    );
}
