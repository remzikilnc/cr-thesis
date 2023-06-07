import ColumnsTable from "./components/ColumnsTable";
import React, {memo, useCallback, useEffect, useState} from "react";
import {useAllUsersQuery, useDeleteUserMutation, useUpdateUserMutation} from "@/store/api/users/usersApiSlice";
import LayoutAlert from "@/components/admin/alert";
import {useDisclosure} from "@chakra-ui/hooks";
import EditModal from "@/components/admin/modal/edit";
import UserEditInput from "@/views/admin/users/components/modify/input";

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
    const paginationChoices = [5, 15, 25, 50, 75, 100]; // Varsayılan sayfa boyutları
    const [paginationAmount, setPaginationAmount] = useState(paginationChoices[1]); // Varsayılan sayfa boyutu
    const [page, setPage] = useState(false); // Page
    const [fetchedUsers, setFetchedUsers] = useState(false); // Backend'den alınmış user verileri
    const [fetchedData, setFetchedData] = useState(false); // Backend'den alınmış sayfalama & user verileri
    const [searchTerm, setSearchTerm] = useState("");  //Arama
    const [alertMessage, setAlertMessage] = useState(null);  //Alert Message

    /*  Fetching User Data */
    const {data: userDatas, refetch} = useAllUsersQuery({
        searchTerm: searchTerm ?? searchTerm, perPage: paginationAmount ?? paginationAmount, page: page ?? page
    });

    useEffect(() => {
        if (!isLoading && userDatas?.data) {
            setFetchedUsers(userDatas?.data.data);
            setFetchedData(userDatas?.data);
        }
    }, [userDatas]);
    /*  Fetching User Data End*/

    /*Set User to Modal */
    const [selectedRow, setSelectedRow] = useState(null);
    const {isOpen, onOpen, onClose} = useDisclosure();

    function setUserDataToModal(row) {
        setSelectedRow(row)
        onOpen();
    }

    /*Set User to Modal END */

    /* if searchTerm Changes */
    useEffect(() => {
        setPage(1)
    }, [searchTerm]);
    /* END   */


    /*Delete User*/
    const [deleteUser] = useDeleteUserMutation();

    async function handleDelete(UserID) {
        if (UserID) {
            try {
                await deleteUser(UserID).unwrap()
                setAlertMessage({type: 'success', head: 'Success', message: 'Successfully.'});
                setFetchedUsers(fetchedUsers.filter((user) => user.id !== UserID));
            } catch (error) {
                if (error.data.message) {
                    setAlertMessage({type: 'error', head: 'Error!', message: error.data.message});
                }
            }
        }
    }

    /*Delete User END*/

    /*Modify User*/
    const [updateUser, {isLoading}] = useUpdateUserMutation()

    async function handleModifyFormSubmit(...values) {
        try {
            await updateUser(...values).unwrap()
            const updatedUser = {...values}
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

    /*Modify User END*/

    /*Refresh */
    const refetchUsers = useCallback(() => {
        refetch();
        setAlertMessage({type: 'Success', head: 'Success', message: 'Data refreshed successfully.'});
    }, [refetch, paginationAmount]);

    /*Refresh END*/

    /*       Alert         */
    useEffect(() => {
        if (alertMessage) {
            const timer = setTimeout(() => {
                setAlertMessage(null);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [alertMessage]);
    /*       Alert    END     */

    return (<div>
        {alertMessage && (<LayoutAlert
            type={alertMessage.type}
            head={alertMessage.head}
            desc={alertMessage.message}
        />)}
        <EditModal isOpen={isOpen}
                   onClose={onClose}
                   title={'Update User Details'}
                   data={selectedRow}
                   handleModifyForm={handleModifyFormSubmit}
                   InputComponent={UserEditInput}
        />
        <div className="mt-5 grid h-full grid-cols-1 gap-5 ">
            <ColumnsTable
                columnsData={usersDataColumns}
                tableData={fetchedUsers ? fetchedUsers : loadingColumns}
                fullData={fetchedData}
                onInputChange={(newValue) => setSearchTerm(newValue)}
                handleDelete={handleDelete}
                getUserForModal={setUserDataToModal}
                refetchUsers={refetchUsers}
                setPaginationAmount={setPaginationAmount}
                paginationChoices={paginationChoices}
                paginationAmount={paginationAmount}
                onPageChange={(newPageIndex) => setPage(newPageIndex)}
            />
        </div>
    </div>);
};

export default memo(UsersList);
