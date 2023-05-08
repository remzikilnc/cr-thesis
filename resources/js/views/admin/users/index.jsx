import ColumnsTable from "./components/ColumnsTable";
import React, {memo, useCallback, useEffect, useState} from "react";
import {useAllUsersQuery, useDeleteUserMutation, useUpdateUserMutation} from "@/store/api/users/usersApiSlice";
import LayoutAlert from "@/components/admin/alert";
import {useDisclosure} from "@chakra-ui/hooks";
import UserModal from "@/views/admin/users/components/modify";

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
    Header: "MODIFY",
}];

const loadingColumns = [{
    "first_name": "", "last_name": '', "roles": {0: {name: ''}}, "email": "", "created_at": '',
},]

const UsersList = () => {
    const [fetchedUsers, setFetchedUsers] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [alertMessage, setAlertMessage] = useState(null);
    const [deleteUser, {isDeleteLoading}] = useDeleteUserMutation();
    const {data: userDatas, refetch} = useAllUsersQuery(searchTerm ?? searchTerm)
    const [updateUser, {isLoading}] = useUpdateUserMutation()
    const [selectedRow, setSelectedRow] = useState(null);

    const {isOpen, onOpen, onClose} = useDisclosure();

    function setUserDataToModal(row) {
        setSelectedRow(row)
        onOpen();
    }

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

    async function handleModifyFormSubmit(...values) {
        try {
            await updateUser(...values).unwrap()
            const updatedUser = {...values}
            //todo deleteResponse
            setAlertMessage({type: 'success', head: 'Success', message: 'Successfully.'});
            setFetchedUsers((prevUsers) => {
                return prevUsers.map((user) => user.id === updatedUser[0].id ? {...user, ...updatedUser[0]} : user);
            });
        } catch (error) {
            if (error.data.message) {
                setAlertMessage({type: 'error', head: 'Error!', message: error.data.message});
            }
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

        <UserModal isOpen={isOpen}
                   onClose={onClose}
                   title={'Update User Details'}
                   data={selectedRow}
                   handleModifyForm={handleModifyFormSubmit}

        />

        <div className="mt-5 grid h-full grid-cols-1 gap-5 ">
            <ColumnsTable
                columnsData={usersDataColumns}
                tableData={fetchedUsers ? fetchedUsers : loadingColumns}
                onInputChange={(newValue) => setSearchTerm(newValue)}
                handleDelete={handleDelete}
                getUserForModal={setUserDataToModal}
                refetchUsers={refetchUsers}
            />
        </div>
    </div>);
};

export default memo(UsersList);
