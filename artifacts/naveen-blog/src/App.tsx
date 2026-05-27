import { Switch, Route, Router as WouterRouter } from "wouter";
import HomePage from "@/pages/HomePage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import LoginPage from "@/pages/LoginPage";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0d1117' }}>
      <div className="text-center">
        <div className="text-6xl mb-6" style={{ color: '#e6edf3' }}>404</div>
        <h1 className="font-display font-bold text-2xl mb-2" style={{ color: '#e6edf3' }}>Page not found</h1>
        <p className="mb-6" style={{ color: '#8b949e' }}>The page you're looking for doesn't exist.</p>
        <a href="/" className="btn btn-primary">← Go Home</a>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      <Route path="/login" component={LoginPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;
