export interface MainState {
  userInfo: {
    user: { name: string; email: string } | null;
    isLoading: boolean;
  };
}
