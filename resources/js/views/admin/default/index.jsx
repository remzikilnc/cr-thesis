import WeeklyUser from "@/views/admin/default/components/WeeklyUser";
import PieChartCard from "@/views/admin/default/components/PieChartCard";
import {MdBarChart} from "react-icons/md";
import Widget from "@/components/admin/widget/Widget";
import {useDashboardQuery} from "@/store/api/dashboard";
import React from "react";
import FullPageLoading from "@/components/admin/loading/fullpage";
import CommentsPieCard from "@/views/admin/default/components/CommentsPieCard";

const Dashboard = () => {
    const {data: data, refetch, isLoading} = useDashboardQuery({});
    if (isLoading) {
        return (
            <FullPageLoading/>
        );
    }

    const commentsPieData = [
        {
            category: 'InActive',
            count: data?.data?.commentsData?.inactiveCommentsCount || 0,
        },
        {
            category: 'Active',
            count: data?.data?.commentsData?.activeCommentsCount || 0,
        },
    ];

    return (<div>
        {/* Card widget */}

        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
            <Widget
                icon={<MdBarChart className="h-7 w-7"/>}
                title={"Total User"}
                subtitle={data.data?.totalUsersCount}
            />
            <Widget
                icon={<MdBarChart className="h-7 w-7"/>}
                title={"Total Products"}
                subtitle={data.data?.totalProductsCount}
            />
            <Widget
                icon={<MdBarChart className="h-7 w-7"/>}
                title={"Active Products"}
                subtitle={data.data?.activeProductsCount}
            />
            <Widget
                icon={<MdBarChart className="h-7 w-7"/>}
                title={"Total Comments"}
                subtitle={data.data?.commentsData?.totalCommentsCount}
            />
            <Widget
                icon={<MdBarChart className="h-7 w-7"/>}
                title={"Inactive Comments"}
                subtitle={data.data?.commentsData?.inactiveCommentsCount}
            />
            <Widget
                icon={<MdBarChart className="h-7 w-7"/>}
                title={"Active Comments"}
                subtitle={data.data?.commentsData?.activeCommentsCount}
            />
{/*            <Widget
                icon={<IoMdHome className="h-6 w-6"/>}
                title={"Aktif Ürünler"}
                subtitle={data.data?.activeProductsCount}
            />*/}
        </div>

        {/* Charts */}

        <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-2">
            <WeeklyUser boardData={data.data?.UserDataByDay} WeeklyChangeData={data.data?.UserDataWeeklyChange}
            />
            <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-1">
                <PieChartCard
                    pieChartData={data.data?.parentCategoriesHasItem.categories}
                    title={'Products / Category'}
                    footerParentTitle={'Parent Category'}
                    footerChildTitle={'Child Category'}
                    bottomRight={'Parent/Child'}
                    pieChartFooterParentCount={data.data?.parentCategoriesHasItem.parent_categories}
                    pieChartFooterChildCount={data.data?.parentCategoriesHasItem.child_categories}
                />
            </div>
        </div>


        <div className="mt-5 grid grid-cols-2 gap-5 xl:grid-cols-2">
            {/* & Pie Chart */}


            <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-1">
                <CommentsPieCard
                    title={'Inactive / Active Comments'}
                    footerParentTitle={'Inactive Comments'}
                    footerChildTitle={'Active Comments'}
                    pieChartData={commentsPieData}
                    pieChartFooterParentCount={data.data?.commentsData?.inactiveCommentsCount}
                    pieChartFooterChildCount={data.data?.commentsData?.activeCommentsCount}
                />
            </div>


            <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
                <div className="grid grid-cols-1 rounded-[20px]">
                </div>
            </div>
        </div>
    </div>);
};

export default Dashboard;
