import ColumnsTable from "./components/ColumnsTable";
import React, {memo, useCallback, useEffect, useState} from "react";
import {useAllUsersQuery, useDeleteUserMutation} from "@/store/api/users/usersApiSlice";
import LayoutAlert from "@/components/admin/alert";

const usersDataColumns = [{
    Header: "NAME", accessor: "first_name",
}, {
    Header: "SURNAME", accessor: "last_name",
}, {
    Header: "ROLE", accessor: "roles",
}, {
    Header: "E-MAIL", accessor: "email",
}, {
    Header: "CREATED-DATE", accessor: "created_at",
}, {
    Header: "EDIT",
}, {
    Header: "DELETE",
}];

const loadingColumns = [{
    "first_name": "", "last_name": '', "roles": {0: {name: ''}}, "email": "", "created_at": '',
},]

const UsersList = () => {
    const [fetchedUsers, setFetchedUsers] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [alertMessage, setAlertMessage] = useState(null);
    const [deleteUser, {isDeleteLoading}] = useDeleteUserMutation();
    const {data: userDatas, isLoading, refetch} = useAllUsersQuery(searchTerm ?? searchTerm)

    useEffect(() => {
        if (alertMessage) {
            const timer = setTimeout(() => {
                setAlertMessage(null);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [alertMessage]);

    async function handleDelete(UserID) {
        if (UserID) {
            try {
                const deleteResponse = await deleteUser(UserID).unwrap()
                //todo deleteResponse
                setAlertMessage({type: 'success', head: 'Success', message: 'Successfully.'});
                setFetchedUsers(fetchedUsers.filter((user) => user.id !== UserID));
            } catch (error) {
                if (error.data.message) {
                    setAlertMessage({type: 'error', head: 'Error!', message: error.data.message});
                }
            }
        }
    }

    function handleEdit(UserID) {
        if (UserID) {
            console.log(UserID)
        }
    }

    const refetchUsers = useCallback(() => {
        refetch();
        setAlertMessage({type: 'Success', head: 'Success', message: 'Data refreshed successfully.'});
    }, [refetch]);

    useEffect(() => {
        if (!isLoading && userDatas?.data) {
            setFetchedUsers(userDatas?.data.data);
        }
    }, [userDatas]);

    return (<div>
        {alertMessage && (<LayoutAlert
            type={alertMessage.type}
            head={alertMessage.head}
            desc={alertMessage.message}
        />)}
        <div className="mt-5 grid h-full grid-cols-1 gap-5 ">
            <ColumnsTable
                columnsData={usersDataColumns}
                tableData={fetchedUsers ? fetchedUsers : loadingColumns}
                onInputChange={(newValue) => setSearchTerm(newValue)}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                refetchUsers={refetchUsers}
            />
        </div>
    </div>);
};

export default memo(UsersList);
