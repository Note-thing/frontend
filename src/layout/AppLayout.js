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
            <Grid item xs={8} md={10} display="flex" direction="column">
                <Grid
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    minHeight="4rem"
                    padding="0 1rem 0 1rem"
                    borderBottom="0.1rem solid #e9f0f0"
                    backgroundColor="#f5f9f9"
                >
                    <Grid
                        display="flex"
                        justifyContent="space-around"
                        width="10%"
                    >
                        <Code className="menu-icon-item" />
                        <Preview className="menu-icon-item" />
                        <VerticalSplit className="menu-icon-item" />
                    </Grid>
                    <div className="editor-header-title">
                        <Input
                        sx={{width: "30rem", fontSize: "1.2rem"}}
                            value=" Guide de survie durant le III Rentsch"
                            placeholder="Titre de la note"
                        />
                    </div>
                    <Grid
                        display="flex"
                        justifyContent="space-around"
                        width="10%"
                    >
                        <Share className="menu-icon-item" />
                        <PictureAsPdf className="menu-icon-item" />
                        <Delete className="menu-icon-item" />
                    </Grid>
                </Grid>
                <Grid sx={{ height: "100%" }} padding="20px">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old.
                    <br />
                    <br />
                    Richard McClintock, a Latin professor at Hampden-Sydney
                    College in Virginia, looked up one of the more obscure Latin
                    words, consectetur, from a Lorem Ipsum passage, and going
                    through the cites of the word in classical literature,
                    discovered the undoubtable source. Lorem Ipsum comes from
                    sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
                    Malorum" (The Extremes of Good and Evil) by Cicero, written
                    in 45 BC.
                    <br />
                    This book is a treatise on the theory of ethics, very
                    popular during the Renaissance. The first line of Lorem
                    Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
                    section 1.10.32. Contrary to popular belief, Lorem Ipsum is
                    not simply random text. It has roots in a piece of classical
                    Latin literature from 45 BC, making it over 2000 years old.
                    <br />
                    <br />
                    Richard McClintock, a Latin professor at Hampden-Sydney
                    College in Virginia, looked up one of the more obscure Latin
                    words, consectetur, from a Lorem Ipsum passage, and going
                    through the cites of the word in classical literature,
                    discovered the undoubtable source. Lorem Ipsum comes from
                    sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
                    Malorum" (The Extremes of Good and Evil) by Cicero, written
                    in 45 BC.
                    <br />
                    This book is a treatise on the theory of ethics, very
                    popular during the Renaissance. The first line of Lorem
                    Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
                    section 1.10.32. Contrary to popular belief, Lorem Ipsum is
                    not simply random text. It has roots in a piece of classical
                    Latin literature from 45 BC, making it over 2000 years old.
                    <br />
                    <br />
                    Richard McClintock, a Latin professor at Hampden-Sydney
                    College in Virginia, looked up one of the more obscure Latin
                    words, consectetur, from a Lorem Ipsum passage, and going
                    through the cites of the word in classical literature,
                    discovered the undoubtable source. Lorem Ipsum comes from
                    sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
                    Malorum" (The Extremes of Good and Evil) by Cicero, written
                    in 45 BC.
                    <br />
                    This book is a treatise on the theory of ethics, very
                    popular during the Renaissance. The first line of Lorem
                    Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
                    section 1.10.32. Contrary to popular belief, Lorem Ipsum is
                    not simply random text. It has roots in a piece of classical
                    Latin literature from 45 BC, making it over 2000 years old.
                    <br />
                    <br />
                    Richard McClintock, a Latin professor at Hampden-Sydney
                    opular belief, Lorem Ipsum is not simply random text. It has
                    roots in a piece of classical Latin literature from 45 BC,
                    making it over 2000 years old.
                    <br />
                    <br />
                    Richard McClintock, a Latin professor at Hampden-Sydney
                    College in Virginia, looked up one of the more obscure Latin
                    words, consectetur, from a Lorem Ipsum passage, and going
                    through the cites of the word in classical literature,
                    discovered the undoubtable source. Lorem Ipsum comes from
                    sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
                    Malorum" (The Extremes of Good and Evil) by Cicero, written
                    in 45 BC.
                    <br />
                    This book is a treatise on the theory of ethics, very
                    popular during the Renaissance. The first line of Lorem
                    Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
                    section 1.10.32. Contrary to popular belief, Lorem Ipsum is
                    not simply random text. It has roots in a piece of classical
                </Grid>
                <Grid
                    display="flex"
                    alignItems="center"
                    minHeight="4rem"
                    padding="0 1rem 0 1rem"
                    borderTop="0.1rem solid #e9F0F0"
                    className="editor-tag-footer"
                >
                    <LocalOffer />{" "}
                    {tags.map((tag) => (
                        <Chip
                            className="tag-chip"
                            label={tag}
                            onDelete={() => console.log("delete" + { tag })}
                        />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}
