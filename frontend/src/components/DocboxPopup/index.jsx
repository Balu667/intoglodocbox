import { Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
// import classes from "./index.module.css";
import './DocboxPopup.css';
// import { insertExpense, updateExpense } from "../../api/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Controller } from "react-hook-form";
import { insertDocbox } from "../../api";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function DocboxPopup({
    show,
    handleClose,
    data,
    handleSubmit,
    reset,
    errors,
    control
}) {

    const queryClient = useQueryClient();
    const insertDocData = useMutation({
        mutationFn: (data) => insertDocbox(data),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["docboxs"] });
            toast.success(response.response);
            handleClose()
            reset()
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });

    const onSubmit = (docboxData) => {
        insertDocData.mutate(docboxData)
    };

    return (
        <form>
            <Dialog
                className="popup"
                fullWidth
                maxWidth="xs"
                open={show}
                onClose={handleClose}>
                <DialogTitle
                    sx={{ fontWeight: "bold", padding: "5px 10px !important" }}>
                    Create DocBox
                </DialogTitle>
                <DialogContent
                    sx={{ padding: "10px 20px !important" }}
                >
                    <Form.Group className="pt-2">
                        <Form.Label htmlFor="boxName mb-5" className="formlabel block">
                            DocBox Name :
                        </Form.Label>
                        <Controller
                            name="boxName"
                            control={control}
                            render={({ field }) => (
                                <Form.Control
                                    {...field}
                                    type="text"
                                    id="boxName"
                                    className="formcontrol expenseinput"
                                    placeholder="Enter Docbox name"
                                />
                            )}
                        />
                        {errors.boxName && (
                            <p className="error">
                                {errors.boxName.message}
                            </p>
                        )}
                    </Form.Group>
                    <Form.Group className="pt-2">
                        <Form.Label htmlFor="status" className="formlabel block">
                            DocDox Type
                        </Form.Label>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    row
                                    id="status"
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="status"
                                >
                                    <FormControlLabel value={1} control={<Radio />} label="Public" />
                                    <FormControlLabel value={2} control={<Radio />} label="Private" />
                                </RadioGroup>
                            )}
                        />
                        {errors.staus && (
                            <p className="error">
                                {errors.status.message}
                            </p>
                        )}
                    </Form.Group>
                </DialogContent>
                <DialogActions>
                    <Button variant="secondary" className="secondary-btn" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        className="primary-btn"
                        onClick={handleSubmit(onSubmit)}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    );
}

export default DocboxPopup;
