import PageDetails from '@/app/dashboard/components/page-details';
import SessionsTable from './components/sessions-table';

const SessionsPage = () => {
  return (
    <>
      <PageDetails>
        دوره آموزشی
      </PageDetails>
      
      <div className="px-[3%]">
        <SessionsTable />
      </div>
    </>
  );
};

export default SessionsPage;
