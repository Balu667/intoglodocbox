import React, { useState } from "react";
import "./AdminDashboard.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DocboxPopup from "../../../components/DocboxPopup";
import * as yup from "yup";
import { DataGrid } from "@mui/x-data-grid";
import AssignUserPopup from "../../../components/AssignUserPopup";
import UploadFilePopup from "../../../components/UploadFilePopup";
import { useNavigate } from "react-router";
import { useDeleteDocbox, useGetDocboxs } from "../../../hooks";
import { CircularProgress } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import moment from "moment";


const docBoxValidation = yup.object({
    boxName: yup.string().required("boxName is required"),
});

const AdminDashboard = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showAssignPopup, setShowAssignPopup] = useState(false)
    const [uploadFilePopup, setUploadFilePopup] = useState(false)
    const [assignUsers, setAssignUsers] = useState([])
    const [selectedData, setSelectedData] = useState(null)
    const [files, setFiles] = useState([])
    const [boxId, setBoxId] = useState("")
    const [selectdRow, setSelectedRow] = useState("")
    const navigate = useNavigate()
    const { data: docboxs, isLoading } = useGetDocboxs()
    const { mutate: deleteDocbox } = useDeleteDocbox()

    const {
        handleSubmit,
        formState: { errors },
        watch,
        control,
        reset,
    } = useForm({
        resolver: yupResolver(docBoxValidation),
        mode: "onTouched",
        defaultValues: {
            boxName: "",
            tags: [],
            status: 1,
        },
    });

    const {
        handleSubmit: uploadFilehandleSubmit,
        formState: { errors: uploadFileErrors },
        control: uploadFileControl,
        reset: uploadFileReset,
        watch: fileWatch
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
            field: "actions",
            headerName: "Assign Users",
            width: 150,
            flex: 1,
            headerAlign: "center",
            align: "center",
            headerClassName: 'tb-header',
            renderCell: ({ row }) => {
                return (
                    <div className="btn-container">
                        <button className="primary-btn" onClick={() => { setAssignUsers(row.assignUsers); setBoxId(row._id); setShowAssignPopup(true) }}>Assign User</button>
                    </div>
                );
            },
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
            headerName: "View Documents",
            width: 150,
            flex: 1,
            headerAlign: "center",
            align: "center",
            headerClassName: 'tb-header',
            renderCell: ({ row }) => {
                return (
                    <div className="btn-container">
                        <button className="outline-btn" onClick={() => navigate(`/admin/docbox/${row._id}`)}>View</button>
                    </div>
                );
            },
        },
        {
            field: "Options",
            headerName: "Options",
            width: 150,
            flex: 1,
            headerAlign: "center",
            align: "center",
            headerClassName: 'tb-header',
            renderCell: ({ row }) => {
                return (
                    <div className="btn-container">
                        {/* <button
                            className=""
                        // onClick={() => {
                        //     setType("Update");
                        //     setData(row);
                        //     setShow(true);
                        //     reset({
                        //         date: moment(row.date),
                        //         amount: row.amount,
                        //         category: row.category,
                        //     });
                        // }}
                        >
                            Edit
                        </button> */}
                        <button
                            className="delete-btn"
                            disabled={deleteDocbox.isLoading}
                            onClick={() =>
                                deleteDocbox({
                                    boxId: row._id
                                })
                            }
                        >
                            {deleteDocbox.isLoading ? (
                                <CircularProgress />
                            ) : (
                                "Delete"
                            )}
                        </button>
                    </div>
                );
            },
        }
    ];

    if (isLoading) {
        return <div>Loading</div>
    }

    const closePopup = () => {
        setShowPopup(false);
        reset();
    };

    const closeAssignPopup = () => {
        setShowAssignPopup(false)
    }


    const closeUploadFilePopup = () => {
        setUploadFilePopup(false)
    }

    return (
        <section className="docbox-container">
            <div className="heading-container">
                <h2>Doc Boxs</h2>
                <button onClick={() => setShowPopup(true)} className="primary-btn">Create DocBox</button>
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
            <DocboxPopup
                data={selectedData}
                show={showPopup}
                handleClose={closePopup}
                // type={type}
                handleSubmit={handleSubmit}
                watch={watch}
                reset={reset}
                errors={errors}
                control={control}
            />
            <UploadFilePopup
                data={selectdRow}
                show={uploadFilePopup}
                handleClose={closeUploadFilePopup}
                handleSubmit={uploadFilehandleSubmit}
                files={files}
                setFiles={setFiles}
                reset={uploadFileReset}
                errors={uploadFileErrors}
                control={uploadFileControl}
                id={boxId}
                watch={fileWatch}
            />
            <AssignUserPopup data={selectdRow} show={showAssignPopup} handleClose={closeAssignPopup} boxId={boxId} users={assignUsers} setAssignUsers={setAssignUsers} />
        </section>
    );
};

export default AdminDashboard;
