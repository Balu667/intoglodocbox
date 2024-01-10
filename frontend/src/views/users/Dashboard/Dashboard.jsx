import React, { useState } from "react";
import "./Dashboard.css";
import { useForm } from "react-hook-form";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import UploadFilePopup from "../../../components/UploadFilePopup";
import { useGetUserDocboxs } from "../../../hooks";
import { useSelector } from "react-redux";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import moment from 'moment'


const UserDashboard = () => {
    const { profileData } = useSelector(state => state.profile)
    const [uploadFilePopup, setUploadFilePopup] = useState(false)
    const [files, setFiles] = useState([])
    const [boxId, setBoxId] = useState("")
    const navigate = useNavigate()
    const { data: docboxs, isLoading } = useGetUserDocboxs(profileData.user.userId)

    const {
        handleSubmit: uploadFilehandleSubmit,
        formState: { errors: uploadFileErrors },
        control: uploadFileControl,
        reset: uploadFileReset,
        watch
    } = useForm({
        mode: "onTouched",
        defaultValues: {
            startDate: moment(),
            endDate: null
        },
    });

    const columns = [
        {
            field: "boxName",
            headerName: "fileName",
            width: 150,
            flex: 1,
            headerAlign: 'center', align: 'center',
            headerClassName: 'tb-header'
        },
        {
            field: "status",
            headerName: "DocBox Type",
            width: 150,
            flex: 1,
            headerAlign: 'center', align: 'center',
            headerClassName: 'tb-header',
            valueGetter: ({ value }) => value === 1 ? "Public" : "Private",
        },
        {
            field: "upload docs",
            headerName: "Upload files",
            width: 150,
            flex: 1,
            headerAlign: "center",
            align: "center",
            headerClassName: 'tb-header',
            renderCell: ({ row }) => {
                return (
                    <div className="btn-container">
                        <CloudUploadIcon
                            onClick={() => { setBoxId(row._id); setUploadFilePopup(true) }}
                        />
                    </div>
                );
            },
        },
        {
            field: "docs",
            headerName: "View Files",
            width: 150,
            flex: 1,
            headerAlign: "center",
            align: "center",
            headerClassName: 'tb-header',
            renderCell: ({ row }) => {
                return (
                    <div className="btn-container">
                        <button className="outline-btn" onClick={() => navigate(`/docbox/${row._id}`)}>View</button>
                    </div>
                );
            },
        }
    ];

    if (isLoading) {
        return <div>Loading</div>
    }

    const closeUploadFilePopup = () => {
        setUploadFilePopup(false)
    }

    return (
        <section className="docbox-container">
            <div className="heading-container">
                <h2>Doc Boxs</h2>
            </div>
            <div
                style={{
                    height: 430,
                    width: "100%",
                    marginTop: "10px",
                    borderRadius: "5px",
                }}>
                <DataGrid
                    sx={{ textTransform: "capitalize" }}
                    getRowId={(row) => row._id}
                    rows={docboxs}
                    columns={columns.map((column) => ({
                        ...column,
                        sortable: false,
                    }))}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    hideFooterSelectedRowCount={true}
                />
            </div>
            <UploadFilePopup
                data={null}
                show={uploadFilePopup}
                handleClose={closeUploadFilePopup}
                handleSubmit={uploadFilehandleSubmit}
                files={files}
                setFiles={setFiles}
                reset={uploadFileReset}
                errors={uploadFileErrors}
                control={uploadFileControl}
                id={boxId}
                watch={watch}
            />
        </section>
    );
};

export default UserDashboard;
