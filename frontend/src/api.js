import { toast } from "react-toastify";
import { apiUrl } from "./config";

export const saveregistration = async (data) => {
    try {
        const response = await fetch(apiUrl + "register", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const responseJson = await response.json();
        if (responseJson.status === 0) {
            toast.error(responseJson.message);
            throw new Error(responseJson.response);
        }
        return responseJson;
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
};

export const logoutUser = async () => {
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");
    try {
        const response = await fetch(apiUrl + "logout", {
            method: "POST",
            body: JSON.stringify({ userId: userId }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 401) {
            window.location.replace("/login");
            toast.error("Unauthorized");
            throw new Error("Unauthorized Access");
        }
        const responseJson = await response.json();
        if (responseJson.status === 0) {
            toast.error(responseJson.message);
            throw new Error(responseJson.response);
        }
        localStorage.clear();
        return responseJson;
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
};

export const logInApi = async (data) => {
    try {
        const response = await fetch(apiUrl + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const responseJson = await response.json();
        if (response.ok) {
            return responseJson;
        } else {
            throw new Error(responseJson.message);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllUsers = async () => {
    let token = localStorage.getItem("token");
    try {
        const response = await fetch(apiUrl + "getAllUsers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 401) {
            window.location.replace("/login");
            toast.error("Unauthorized");
            throw new Error("Unauthorized Access");
        }
        const responseJson = await response.json();
        if (responseJson.status === 0) {
            toast.error(responseJson.message);
            throw new Error(responseJson.response);
        }
        return JSON.parse(responseJson.data);
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
};

export const getAllDocBoxs = async () => {
    let token = localStorage.getItem("token");
    try {
        const response = await fetch(apiUrl + "getAllDocBox", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 401) {
            window.location.replace("/login");
            toast.error("Unauthorized");
            throw new Error("Unauthorized Access");
        }
        const responseJson = await response.json();
        if (responseJson.status === 0) {
            toast.error(responseJson.message);
            throw new Error(responseJson.response);
        }
        return JSON.parse(responseJson.data);
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
};

export const getDockboxsByUser = async (data) => {
    let token = localStorage.getItem("token");
    try {
        const response = await fetch(apiUrl + "getDocboxsbyUser", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        if (response.status === 401) {
            window.location.replace("/login");
            toast.error("Unauthorized");
            throw new Error("Unauthorized Access");
        }
        const responseJson = await response.json();
        if (responseJson.status === 0) {
            toast.error(responseJson.message);
            throw new Error(responseJson.response);
        }
        return JSON.parse(responseJson.data);
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
};

export const insertDocbox = async (data) => {
    let token = localStorage.getItem("token");
    try {
        const response = await fetch(apiUrl + "createDocBox", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        if (response.status === 401) {
            window.location.replace("/login");
            toast.error("Unauthorized");
            throw new Error("Unauthorized Access");
        }
        const responseJson = await response.json();
        if (responseJson.status === 0) {
            toast.error(responseJson.message);
            throw new Error(responseJson.response);
        }
        return responseJson;
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
};

export const addUserToDocbox = async (data) => {
    let token = localStorage.getItem("token");
    try {
        const response = await fetch(apiUrl + "addUserToDocBox", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        if (response.status === 401) {
            window.location.replace("/login");
            toast.error("Unauthorized");
            throw new Error("Unauthorized Access");
        }
        const responseJson = await response.json();
        if (responseJson.status === 0) {
            toast.error(responseJson.message);
            throw new Error(responseJson.response);
        }
        return responseJson;
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
};

export const getFilesByDocboxId = async (id) => {
    let token = localStorage.getItem("token");
    try {
        const response = await fetch(apiUrl + "getDocsByDocId", {
            method: "POST",
            body: JSON.stringify({ boxId: id }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        if (response.status === 401) {
            window.location.replace("/login");
            toast.error("Unauthorized");
            throw new Error("Unauthorized Access");
        }
        const responseJson = await response.json();
        if (responseJson.status === 0) {
            toast.error(responseJson.message);
            throw new Error(responseJson.response);
        }
        return JSON.parse(responseJson.data);
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
};

export const insertFilesByDocboxId = async (data) => {
    let token = localStorage.getItem("token");
    try {
        const response = await fetch(apiUrl + "uploadDoc", {
            method: "POST",
            body: data,
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        if (response.status === 401) {
            window.location.replace("/login");
            toast.error("Unauthorized");
            throw new Error("Unauthorized Access");
        }
        const responseJson = await response.json();
        if (responseJson.status === 0) {
            toast.error(responseJson.message);
            throw new Error(responseJson.response);
        }
        return responseJson;
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
};

export const deleteFilesById = async (data) => {
    let token = localStorage.getItem("token");
    try {
        const response = await fetch(apiUrl + "deleteDoc", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        if (response.status === 401) {
            window.location.replace("/login");
            toast.error("Unauthorized");
            throw new Error("Unauthorized Access");
        }
        const responseJson = await response.json();
        if (responseJson.status === 0) {
            toast.error(responseJson.message);
            throw new Error(responseJson.response);
        }
        return responseJson;
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
};

export const deleteDocboxById = async (data) => {
    let token = localStorage.getItem("token");
    try {
        const response = await fetch(apiUrl + "deleteDocBox", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        if (response.status === 401) {
            window.location.replace("/login");
            toast.error("Unauthorized");
            throw new Error("Unauthorized Access");
        }
        const responseJson = await response.json();
        if (responseJson.status === 0) {
            toast.error(responseJson.message);
            throw new Error(responseJson.response);
        }
        return responseJson;
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
};

export const getFileById = async (data) => {
    let token = localStorage.getItem("token");
    try {
        const response = await fetch(apiUrl + "getFileById", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        if (response.status === 401) {
            window.location.replace("/login");
            toast.error("Unauthorized");
            throw new Error("Unauthorized Access");
          }
        const responseJson = await response.json();
        if (responseJson.status === 0) {
            toast.error(responseJson.message);
            throw new Error(responseJson.response);
        }
        return JSON.parse(responseJson.data);
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
};
