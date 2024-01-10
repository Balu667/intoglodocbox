import { Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
// import { insertExpense, updateExpense } from "../../api/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from "react";
import { useGetAllUsers } from "../../hooks";
import Loader from "../Loader/Loader";
import { addUserToDocbox } from "../../api";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            textTransform: "capitalize",
        },
    },
};



function AssignUserPopup({
    show,
    handleClose,
    boxId,
    data,
    users,
    setAssignUsers,
    assignUsers
}) {
    // console.log(assignUsers, "assignUsers"
    const queryClient = useQueryClient();
    console.log(users, "users")
    // const [selectedUsers, setSelectedUsers] = useState(users)
    // console.log(selectedUsers, "slected Users")
    const { data: usersData, isLoading } = useGetAllUsers()
    const { mutate, isLoading: assignLoaderLoading } = useMutation({
        mutationFn: addUserToDocbox,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["docboxs"] });
            if (data.status === 0) {
                toast.error(data.response);
            }
            if (data.status === 1) {
                toast.success(data.response);
                // setSelectedUsers([]) 
                handleClose();
            }
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const onSubmit = () => {
        if(users.length === 0 ){
            return toast.error("Assign users first")
        }
        mutate({ boxId: boxId, users: users })
    };

    if (isLoading) {
        return <Loader />
    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        console.log(value, "value")
        setAssignUsers(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <Dialog
            className="popup"
            fullWidth
            maxWidth="xs"
            open={show}
            onClose={handleClose}>
            <DialogTitle
                sx={{ fontWeight: "bold", padding: "5px 10px !important" }}>
                Assign Users
            </DialogTitle>
            <DialogContent
                sx={{ padding: "10px 20px !important" }}
            // dividers={scroll === "paper"}
            >
                <FormControl sx={{ m: 1, width: 300 }}>
                    {/* <InputLabel id="demo-multiple-name-label">Name</InputLabel> */}
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={users}
                        onChange={(e) => handleChange(e)}
                        InputLabelProps={{ shrink: true }}
                        placeholder="Place Order"
                        MenuProps={MenuProps}
                    >
                        {usersData.map((user) => (
                            <MenuItem
                                key={user._id}
                                value={user._id}
                            >
                                {user.username}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant="secondary" onClick={() => {
                    handleClose();
                }}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    onClick={() => onSubmit()}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AssignUserPopup;
