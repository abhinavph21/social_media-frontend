import React from 'react'
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Divider, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { navigationMenu } from './NavigationMenu'

const Sidebar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openLogoutMenu = Boolean(anchorEl);
    // const { auth } = useSelector((store) => store);

    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const handleOpenLogoutMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="card text-white  h-screen flex flex-col justify-between py-5 bg-[rgb(3,11,40)]">
            <div className="space-y-8 pl-5">
                <div className="">
                    <span className="logo">Social Media</span>
                </div>
                <div className="space-y-8">
                    {navigationMenu.map((item) => (
                        <div
                            onClick={() =>
                                navigate(`${item.path}`)
                            }
                            className="cursor-pointer flex space-x-3 items-center"
                        >
                            {item.icon}
                            <p className="text-xl">{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <Divider />
                <div className="pl-5 flex items-center  justify-between pt-5">
                    <div className="flex items-center space-x-3">
                        <Avatar
                            alt="Remy Sharp"
                            src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
                        />

                        <div>
                            <p className="font-bold">abhinav pharswan</p>
                            {/* <p className="opacity-70">abhinav</p> */}
                        </div>
                    </div>
                    <Button
                        id="basic-button"
                        aria-controls={openLogoutMenu ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openLogoutMenu ? "true" : undefined}
                        onClick={handleOpenLogoutMenu}
                    >
                        <MoreHorizIcon />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openLogoutMenu}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem >Logout</MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default Sidebar