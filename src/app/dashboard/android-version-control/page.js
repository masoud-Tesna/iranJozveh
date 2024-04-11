import PageDetails from '@/app/dashboard/components/page-details';
import VersionsTable from './components/versions-table';

const AndroidVersionControlPage = () => {
  return (
    <>
      <PageDetails>
        مدیریت ورژن اپلیکیشن
      </PageDetails>
      
      <div className="px-[3%]">
        <VersionsTable />
      </div>
    </>
  );
};

export default AndroidVersionControlPage;
