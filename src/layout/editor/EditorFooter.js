import { Grid, Chip } from "@mui/material";
import { LocalOffer } from "@mui/icons-material";

/**
 * Editor Footer. Allows the user to add label to his note
 * @returns
 */
export default function EditorFooter() {
    const tags = ["Compound litteral", "RHH", "Blanc"];
    return (
        <Grid
            display="flex"
            alignItems="center"
            height="100%"
            padding="0 1rem 0 1rem"
            borderTop="0.1rem solid #e9F0F0"
            className="editor-tag-footer"
        >
            <LocalOffer />{" "}
            {tags.map((tag, idx) => (
                <Chip
                    key={idx}
                    className="tag-chip"
                    label={tag}
                    onDelete={() => console.log("delete" + { tag })}
                />
            ))}
        </Grid>
    );
}
