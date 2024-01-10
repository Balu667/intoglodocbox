import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import classes from "./index.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { insertFilesByDocboxId } from "../../api";
import { useSelector } from "react-redux/es/hooks/useSelector";
import moment from "moment";

function UploadFilePopup({
  show,
  handleClose,
  handleSubmit,
  reset,
  errors,
  control,
  setFiles,
  files,
  id,
  watch,
}) {
  const queryClient = useQueryClient();
  const { profileData } = useSelector((state) => state.profile);
  const { mutate: uploadFileData, isLoading } = useMutation({
    mutationFn: insertFilesByDocboxId,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getFilesByDocboxId"] });
      if (data.status === 0) {
        toast.error(data.response);
      }
      if (data.status === 1) {
        toast.success(data.response);
        reset();
        setFiles([]);
        handleClose();
      }
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (fileData) => {
    if (files && files.length === 0) {
      return toast.error("Please upload files");
    }
    if (moment(fileData.startDate).isAfter(fileData.endDate)) {
      return toast.error("Download File End Date must greater than start date");
    }
    const formData = new FormData();
    formData.append("fileName", fileData.name);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("boxId", id);
    formData.append("userId", profileData.user.userId);
    formData.append("startDate", fileData.startDate ?? "");
    formData.append("endDate", fileData.endDate ?? "");
    uploadFileData(formData);
  };

  const fileChangeHandler = (e) => {
    setFiles(e.target.files);
  };

  return (
    <form>
      <Dialog
        className={classes.popup}
        fullWidth
        maxWidth="xs"
        open={show}
        onClose={handleClose}
      >
        <DialogTitle
          sx={{ fontWeight: "bold", padding: "5px 10px !important" }}
        >
          Upload Files
        </DialogTitle>
        <DialogContent
          sx={{ padding: "10px 20px !important" }}
          // dividers={scroll === "paper"}
        >
          <Form.Group className="pt-2">
            <Form.Label
              style={{ display: "block" }}
              htmlFor="startDate"
              className="formlabel"
            >
              Start Date
            </Form.Label>
            <Controller
              sx={{ display: "block" }}
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  className="datepicker"
                  value={field.value}
                  id="startDate"
                  views={["year", "month", "day"]}
                  format="DD-MM-YYYY"
                  disablePast
                />
              )}
            />
            {errors.startDate && (
              <p className="error">{errors.startDate.message}</p>
            )}
          </Form.Group>
          <Form.Group className="pt-2">
            <Form.Label
              style={{ display: "block" }}
              htmlFor="endData"
              className="formlabel"
            >
              End Date
            </Form.Label>
            <Controller
              sx={{ display: "block" }}
              name="endDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  className="datepicker"
                  value={field.value}
                  id="endDate"
                  views={["year", "month", "day"]}
                  format="DD-MM-YYYY"
                  minDate={watch("startDate")}
                />
              )}
            />
            {errors.endDate && (
              <p className="error">{errors.endDate.message}</p>
            )}
          </Form.Group>
          <div>
            <Form.Group className="pt-2">
              <Form.Label
                style={{ display: "block" }}
                htmlFor="files"
                className="formlabel"
              >
                Upload files
              </Form.Label>
              {/* <Controller
                                sx={{ display: "block" }}
                                name="files"
                                control={control}
                                render={({ field }) => ( */}
              <input
                onChange={(e) => fileChangeHandler(e)}
                // {...field}
                type="file"
                multiple
                id="files"
                className={`formcontrol ${classes.expenseinput}`}
                placeholder="Enter Docbox name"
              />
              {/* )} */}
              {/* /> */}
              {errors.files && <p className="error">{errors.files.message}</p>}
            </Form.Group>
            {/* <button>Upload</button> */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="secondary"
            className="secondary-btn"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            type="submit"
            className="primary-btn"
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading ? <CircularProgress /> : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}

export default UploadFilePopup;
