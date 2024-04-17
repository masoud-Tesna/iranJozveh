import PageDetails from '@/app/dashboard/components/page-details';
import CoursesTable from './components/courses-table';

const CoursePage = () => {
  return (
    <>
      <PageDetails>
        دوره آموزشی
      </PageDetails>
      
      <div className="px-[3%]">
        <CoursesTable />
      </div>
    </>
  );
};

export default CoursePage;
