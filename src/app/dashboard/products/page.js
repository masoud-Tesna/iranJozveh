import PageDetails from '@/app/dashboard/components/page-details';
import ProductsTable from './components/products-table';

const ProductsPage = () => {
  return (
    <>
      <PageDetails>
        لیست محصولات
      </PageDetails>
      
      <div className="px-[3%]">
        <ProductsTable />
      </div>
    </>
  );
};

export default ProductsPage;
