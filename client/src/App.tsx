import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import Pricing from "@/pages/pricing";
import ApiDocs from "@/pages/api-docs";
import Changelog from "@/pages/changelog";
import About from "@/pages/about";
import GitHubRoast from "@/pages/github-roast";
import ImageRoast from "@/pages/image-roast";
import RoastFeed from "@/pages/roast-feed";
import RoastView from "@/pages/roast-view";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/api-docs" component={ApiDocs} />
      <Route path="/changelog" component={Changelog} />
      <Route path="/about" component={About} />
      <Route path="/github-roast" component={GitHubRoast} />
      <Route path="/image-roast" component={ImageRoast} />
  <Route path="/roasts" component={RoastFeed} />
  <Route path="/roast/:id" component={RoastView} />
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={RegisterPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark min-h-screen bg-github-dark text-text-light">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
