const userService = {
  getUserName: () => {
    return localStorage.getItem("userName") || "Pardito";
  },
  setUserName: (name: string) => {
    localStorage.setItem("userName", name);
  }
}

export default userService;