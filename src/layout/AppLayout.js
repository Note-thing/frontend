import { List, ListItem, ListItemText, Grid, Avatar } from "@mui/material";
import "./AppLayout.css";
import { Input } from "@mui/material";
import {
    Code,
    Preview,
    VerticalSplit,
    PictureAsPdf,
    Share,
    Delete,
    PersonOutline,
    LocalOffer,
} from "@mui/icons-material";
/**
 * Layout of the application
 * @param {*} props
 * @returns
 */
export default function AppLayout(props) {
    const user = {};
    user.name = "Frank Letest";
    return (
        <Grid container>
            <Grid item xs={4} md={2}>
                <div className="main-menu h-100">
                    <List className="">
                        {["Inbox", "Starred", "Send email", "Drafts"].map(
                            (text) => (
                                <ListItem button key={text}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            )
                        )}
                    </List>
                    <List className="main-menu-bottom">
                        <ListItem>
                            <Input
                                className="main-menu-bottom-search"
                                placeholder="Rechercher dans les notes"
                            />
                        </ListItem>
                        <ListItem className="main-menu-user">
                            <span>{user.name}</span>

                            <Avatar alt="user-avatar">
                                <PersonOutline />
                            </Avatar>
                        </ListItem>
                    </List>
                </div>
            </Grid>
            <Grid item xs={8} md={10}>
                <main className="h-100 editor-container">
                    <div className="editor-header">
                        <div className="editor-header-menu">
                            <Code className="menu-icon-item" />
                            <Preview className="menu-icon-item" />
                            <VerticalSplit className="menu-icon-item" />
                        </div>
                        <div className="editor-header-title">
                            <Input
                                className="editor-header-title-input"
                                value=" Guide de survie durant le III Rentsch"
                                placeholder="Titre de la note"
                            />
                        </div>
                        <div className="editor-header-menu">
                            <Share className="menu-icon-item" />
                            <PictureAsPdf className="menu-icon-item" />
                            <Delete className="menu-icon-item" />
                        </div>
                    </div>
                    <div className="h-100">
                        Guide de survie durant le III Rentsch
                    </div>
                    <div className="editor-tag-footer">
                        <LocalOffer /> Compound litteral, blanc 
                    </div>
                </main>
            </Grid>
        </Grid>
    );
}
