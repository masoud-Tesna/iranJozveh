import PageDetails from '@/app/dashboard/components/page-details';
import UsersTable from './components/users-table';

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
