import PageDetails from '@/app/dashboard/components/page-details';
import TextbookTable from './components/textbook-table';

const ProductsPage = () => {
  return (
    <>
      <PageDetails>
        لیست درسنامه ها
      </PageDetails>
      
      <div className="px-[3%]">
        <TextbookTable />
      </div>
    </>
  );
};

export default ProductsPage;
