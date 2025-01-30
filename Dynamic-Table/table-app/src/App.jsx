import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DynamicTable from "./components/DynamicTable";
import UserForm from "./components/userForm";
import UserProfile from "./components/userProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DynamicTable />} />
        <Route path="/add-user" element={<UserForm onClose={() => window.history.back()} />} />
        <Route path="/edit-user/:id" element={<UserForm onClose={() => window.history.back()} />} />

        {/* Route for viewing user profile */}
        <Route path="/users/:id" element={<UserProfile />} /> 
      </Routes>
    </Router>
  );
};

export default App;
