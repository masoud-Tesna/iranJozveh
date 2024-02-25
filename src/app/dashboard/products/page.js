import PageDetails from '@/app/dashboard/components/PageDetails';
import ProductsTable from './components/ProductsTable';

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
