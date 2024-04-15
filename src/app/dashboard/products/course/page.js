import PageDetails from '@/app/dashboard/components/page-details';
import CourseTable from './components/course-table';

const CoursePage = () => {
  return (
    <>
      <PageDetails>
        دوره آموزشی
      </PageDetails>
      
      <div className="px-[3%]">
        <CourseTable />
      </div>
    </>
  );
};

export default CoursePage;
