import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FilterArea from './components/features/FilterArea';
import DataTable from './components/features/DataTable';
import PageTabs from './components/features/PageTabs';

function App() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Filter Area */}
        <FilterArea />

        {/* Data Table Area */}
        <DataTable />

        {/* Page Tabs */}
        <PageTabs />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
