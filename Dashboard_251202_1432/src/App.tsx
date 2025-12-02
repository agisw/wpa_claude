import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrimaryFilterArea from './components/features/PrimaryFilterArea';
import DataTable from './components/features/DataTable';
import PageTabs from './components/features/PageTabs';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f6f8f9]">
      <Header />

      <div className="flex flex-col flex-1">
        <PrimaryFilterArea />

        <div className="bg-[#f6f8f9] rounded-lg mx-3 my-3 flex-1">
          <DataTable />
        </div>
      </div>

      <PageTabs />
      <Footer />
    </div>
  );
}

export default App;
