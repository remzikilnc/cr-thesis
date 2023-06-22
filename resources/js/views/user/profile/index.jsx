import UserProfileOverviewCard from "./components/UserProfileOverviewCard";
import Notification from "./components/Notification";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "@/store/auth/authSlice";
import React from "react";
import TableLoading from "@/components/admin/loading/table";
import {useShowUserQuery, useUpdateUserMutation} from "@/store/api/users/usersApiSlice";

const UserProfileOverview = () => {
    const user = useSelector(selectCurrentUser)
    const [updateUser] = useUpdateUserMutation();

    const handleFormSubmit = async (values) => {
        const { id, ...restValues } = values;
        const response = await updateUser({...restValues, id});

        if (response.isSuccess) {
            // handle success
        } else {
            // handle error
        }
    };

    if (!user) {
        return (
            <TableLoading/>
        );
    }

    return (
        <div className="flex w-full flex-col gap-5">
            <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
                <div className="col-span-12 lg:!mb-0">
                    <UserProfileOverviewCard user={user}  handleFormSubmit={handleFormSubmit}/>
                    <div className="col-span-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
                        <Notification />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileOverview;
