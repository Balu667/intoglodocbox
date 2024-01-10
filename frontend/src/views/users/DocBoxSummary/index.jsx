import React, { useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import './DocBoxSummary.css'
import { useForm } from "react-hook-form";
import { useParams } from 'react-router';
import { useDeleteFileById, useGetDocboxs, useGetFileById, useGetFilesByDocboxId } from '../../../hooks';
import moment from 'moment';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import UploadFilePopup from '../../../components/UploadFilePopup/index';
import Loader from '../../../components/Loader/Loader';

const DocBoxSummary = () => {
    const { id } = useParams()
    const [showPopup, setShowPopup] = useState(false);
    const [type, setType] = useState("Add")
    const [files, setFiles] = useState([])
    const { data, isLoading } = useGetFilesByDocboxId(id)
    const { data: docBoxs, isLoading: docboxLoading } = useGetDocboxs()
    const { mutate: deleteFile, isLoading: deleteFileLoading } = useDeleteFileById()
    const { profileData } = useSelector(state => state.profile)
    const userId = localStorage.getItem("userId")
    const { mutate: openFile } = useGetFileById()
    const {
        handleSubmit,
        formState: { errors },
        watch,
        control,
        reset,
    } = useForm({
        mode: "onTouched",
        defaultValues: {
            startDate: moment(),
            endDate: null
        },
    });

    const closePopup = () => {
        setType("Add");
        setShowPopup(false);
        reset();
    };

    if (isLoading || docboxLoading || deleteFileLoading) {
        return <Loader />
    }

    const columns = [
        {
            field: "boxId",
            headerName: "Docbox Name",
            width: 150,
            flex: 1,
            headerAlign: "center",
            align: "center",
            headerClassName: 'tb-header',
            valueGetter: ({ value }) => {
                return docBoxs.find((item) => item._id === value).boxName;
            },
        },
        {
            field: "fileName",
            headerName: "fileName",
            width: 150,
            flex: 1,
            headerAlign: "center",
            align: "center",
            headerClassName: 'tb-header',
        },
        {
            field: "startDate",
            headerName: "Start Date",
            width: 150,
            flex: 1,
            headerAlign: "center",
            align: "center",
            headerClassName: 'tb-header',
            valueGetter: ({ value }) => value ? moment(value).format("DD/MM/YYYY") : "N/A",
        },
        {
            field: "endDate",
            headerName: "End Date",
            width: 150,
            flex: 1,
            headerAlign: "center",
            align: "center",
            headerClassName: 'tb-header',
            valueGetter: ({ value }) => value ? moment(value).format("DD/MM/YYYY") : "NA"
        },

        {
            field: "Options",
            headerName: "Options",
            width: 100,
            headerAlign: "center",
            align: "center",
            flex: 1.5,
            headerClassName: 'tb-header',
            renderCell: ({ row }) => (
                <div className='optns-container'>
                    <button
                        onClick={() =>
                            openFile({ boxId: row.boxId, fileName: row.fileName, fileId: row._id })
                        }
                        className='outline-btn'>View</button>
                    <button
                        // disabled={row.assignUsers.includes(userId)}
                        onClick={() =>
                            deleteFile({
                                fileId: row._id,
                                fileName: row.fileName,
                                userId: userId,
                                role: profileData.user.role
                            })
                        }
                        className='delete-btn'>Delete</button>
                </div>
            ),
        },
    ];

    return (
        <section className='summary-section'>
            <div className='header-container' >
                <h1>DocBox Summary</h1>
                <button onClick={() => { setType("Add"); setShowPopup(true) }} className='primary-btn'>Upload Files</button>
            </div>
            <div
                style={{
                    height: 430,
                    width: "100%",
                    marginTop: "10px",
                    borderRadius: "5px",
                }}>
                {data && data.length > 0 ? <DataGrid
                    sx={{ textTransform: "capitalize" }}
                    getRowId={(row) => row._id}
                    rows={data}
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
                    // loading={isFetching}
                    hideFooterSelectedRowCount={true}
                /> : <div>
                    Admin not Assigned any DocBox
                </div>}
            </div>
            <UploadFilePopup
                data={null}
                show={showPopup}
                handleClose={closePopup}
                type={type}
                handleSubmit={handleSubmit}
                watch={watch}
                reset={reset}
                errors={errors}
                control={control}
                files={files}
                setFiles={setFiles}
                id={id}
            />
        </section>
    )
}


export default DocBoxSummary;
