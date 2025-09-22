import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";

function App() {
  const navigation = useNavigation();
  return (
    // make app full height and a column flex container
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* main content grows to fill available space and handles scrolling */}
      <main className="flex-1 overflow-auto">
        {navigation.state === "loading" ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-4xl font-semibold text-primary">
              Loading...
            </span>
          </div>
        ) : (
          <Outlet />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;