import PageDetails from '@/app/dashboard/components/PageDetails';
import UsersTable from './components/UsersTable';

const UsersPage = () => {
    return (
        <>
            <PageDetails>
                لیست کاربران
            </PageDetails>

            <div className="px-[3%]">
                <UsersTable />
            </div>
        </>
    );
};

export default UsersPage;
