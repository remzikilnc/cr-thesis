import React from "react";
import Card from "@/components/admin/card";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "@/store/auth/authSlice";
import UserProfileEdit from "@/views/user/profile/components/UserProfileEdit";
import {useShowUserQuery} from "@/store/api/users/usersApiSlice";
import TableLoading from "@/components/admin/loading/table";

const UserProfileOverviewCard = (props) => {
    const {user, handleFormSubmit} = props;
    const {data, isLoading} = useShowUserQuery(user?.id);
    if (isLoading) {
        return (
            <TableLoading/>
        );
    }

    return (<Card extra={"w-full p-[40px] bg-cover !rounded-b-none"}>
        {/* Background and profile */}
        <div>
            <h2 className={"font-semibold text-xl"}>Profil bilgileri</h2>
            <p className={"py-2"}>Gereken bilgilerinizi buradan düzenleyebilirsiniz.
            </p>
        </div>
        <UserProfileEdit user={data?.data?.user} handleFormSubmit={handleFormSubmit}></UserProfileEdit>
    </Card>);
};

export default UserProfileOverviewCard;
