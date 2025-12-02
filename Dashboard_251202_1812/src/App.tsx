import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FilterArea from './components/features/dashboard/FilterArea';
import DataTable from './components/features/dashboard/DataTable';
import PageTabs from './components/features/dashboard/PageTabs';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex flex-col bg-[#f8f9fa] overflow-hidden">
        <FilterArea />
        <DataTable />
        <PageTabs />
      </div>
      <Footer />
    </div>
  );
}

export default App;
