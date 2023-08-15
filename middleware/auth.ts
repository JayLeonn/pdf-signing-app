import { isLoading } from "../shared/sharedState";

const authMiddleware = () => {
  if (process.client) {
    if (!sessionStorage.getItem("apiToken")) {
      setTimeout(() => navigateTo("/"));
    }
  }
};

export default authMiddleware;
