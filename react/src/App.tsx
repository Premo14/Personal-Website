import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Projects from './pages/Projects';

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Home />
                        </Layout>
                    }
                />
        <Route
          path="/resume"
          element={
            <Layout>
              <Resume />
            </Layout>
          }
        />
        <Route
          path="/projects"
          element={
            <Layout>
              <Projects />
            </Layout>
          }
        />
            </Routes>
        </Router>
    );
}

export default App;
