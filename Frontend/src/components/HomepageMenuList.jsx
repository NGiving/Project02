import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const HomepageMenuList = ({ menuItems }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                height: '100vh',
                marginTop: "128px"
            }}
        >
            <Box
                sx={{
                    width: '60%',
                    padding: "64px"
                }}
            >
                <List>
                    {menuItems && menuItems.map((item) => {
                        return (
                            <ListItem
                                key={item._id}
                                sx={{
                                    borderBottom: "1px solid rgb(0, 0, 0, 0.2)"
                                }}
                            >
                                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                    <Typography variant="h6">{item.name}</Typography>
                                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                        {item.description}
                                    </Typography>
                                    <Typography variant="body1" sx={{ marginTop: "8px", fontWeight: "bold" }}>
                                        ${item.price}
                                    </Typography>
                                </Box>
                            </ListItem>
                        )
                    })}
                </List>
            </Box>
        </Box>
    );
}

HomepageMenuList.propTypes = {
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        })
    ).isRequired,
}

export default HomepageMenuList;