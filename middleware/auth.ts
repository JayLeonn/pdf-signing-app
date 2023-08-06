const authMiddleware = () => {
  if (process.client) {
    if (!sessionStorage.getItem("apiToken")) {
      setTimeout(() => navigateTo("/"));
    }
  }
};

export default authMiddleware;
