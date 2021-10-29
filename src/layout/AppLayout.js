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
} from "@mui/icons-material";
/**
 * Layout of the application
 * @param {*} props
 * @returns
 */
export default function AppLayout(props) {
    const user = {};
    const tags = ["Compound litteral", "RHH", "Blanc"];
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
                    <div className="h-100 editor">
              
                        Contrary to popular belief, Lorem Ipsum is not simply
                        random text. It has roots in a piece of classical Latin
                        literature from 45 BC, making it over 2000 years old.

                        <br/>
                        <br/>
                        Richard McClintock, a Latin professor at Hampden-Sydney
                        College in Virginia, looked up one of the more obscure
                        Latin words, consectetur, from a Lorem Ipsum passage,
                        and going through the cites of the word in classical
                        literature, discovered the undoubtable source. Lorem
                        Ipsum comes from sections 1.10.32 and 1.10.33 of "de
                        Finibus Bonorum et Malorum" (The Extremes of Good and
                        Evil) by Cicero, written in 45 BC.
                        
                        <br/>
                         This book is a
                        treatise on the theory of ethics, very popular during
                        the Renaissance. The first line of Lorem Ipsum, "Lorem
                        ipsum dolor sit amet..", comes from a line in section
                        1.10.32.
                    </div>
                    <div className="editor-tag-footer">
                        <LocalOffer />{" "}
                        {tags.map((tag) => (
                            <Chip
                                className="tag-chip"
                                label={tag}
                                onDelete={() => console.log("delete" + { tag })}
                            />
                        ))}
                    </div>
                </main>
            </Grid>
        </Grid>
    );
}
