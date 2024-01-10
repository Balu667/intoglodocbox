import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteDocboxById, deleteFilesById, getAllUsers, getDockboxsByUser, getFileById, getFilesByDocboxId, insertDocbox, logoutUser } from "../api";
import { getAllDocBoxs } from "../api";
import { useDispatch } from "react-redux";
import { removeProfileData } from "../redux/slices/profileSlice";

const useGetDocboxs = () =>
    useQuery({
        queryKey: ["docboxs"],
        queryFn: () => getAllDocBoxs()
    });

const useGetAllUsers = () =>
    useQuery({
        queryKey: ["users"],
        queryFn: () => getAllUsers()
    });

const useInsertDocbox = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => insertDocbox(data),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["docboxs"] });
            toast.success(response.response);
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};

const useDeleteDocbox = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => deleteDocboxById(data),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["docboxs"] });
            toast.success(response.response);
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};

const useDeleteFileById = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => deleteFilesById(data),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["getFilesByDocboxId"] });
            toast.success(response.response);
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};

const useGetFilesByDocboxId = (id) => {
    return useQuery({
        queryKey: ["getFilesByDocboxId", id],
        queryFn: ({ queryKey }) => getFilesByDocboxId(queryKey[1]),
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};

const useGetUserDocboxs = (id) => {
    return useQuery({
        queryKey: ["getUserDocboxs", id],
        queryFn: ({ queryKey }) => getDockboxsByUser({ userId: queryKey[1] }),
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};

const useLogout = () => {
    const dispatch = useDispatch()
    return useMutation({
        mutationFn: (id) => logoutUser(id),
        onSuccess: (response) => {
            toast.success(response.response);
            dispatch(removeProfileData())
            localStorage.clear()
        },
        onError: (error) => {
            toast.error(error.message.split(":")[1]);
        },
    });
};

const useGetFileById = () => {
    return useMutation({
        mutationFn: (data) => getFileById(data),
        onSuccess: (response) => {
            window.open(response, '_blank');
        }
    });
};


export {
    useGetDocboxs,
    useInsertDocbox,
    useGetFilesByDocboxId,
    useDeleteDocbox,
    useDeleteFileById,
    useLogout,
    useGetAllUsers,
    useGetUserDocboxs,
    useGetFileById
}