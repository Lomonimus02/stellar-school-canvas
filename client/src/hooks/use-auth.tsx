
import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
  QueryObserverResult,
} from "@tanstack/react-query";
import { insertUserSchema, User, InsertUser, UserRoleEnum } from "@shared/schema";
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Расширяем тип User для поддержки activeRole
interface ExtendedUser extends User {
  // Используем undefined вместо null для activeRole, чтобы избежать проблем с типами
  activeRole?: UserRoleEnum; 
  schoolId?: number | null;
}

type AuthContextType = {
  user: ExtendedUser | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<ExtendedUser, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<ExtendedUser, Error, InsertUser>;
  refetchUser: () => Promise<QueryObserverResult<User | undefined, Error>>;
};

type LoginData = Pick<InsertUser, "username" | "password">;

export const AuthContext = createContext<AuthContextType | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const {
    data: user,
    error,
    isLoading,
    refetch: refetchUser
  } = useQuery<User | undefined, Error>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    refetchInterval: 30000, // Проверяем актуальность данных пользователя каждые 30 секунд
    retry: 3, // Повторяем запрос 3 раза в случае неудачи
    retryDelay: 1000, // Задержка между повторами 1 секунда
  });

  const loginMutation = useMutation<ExtendedUser, Error, LoginData>({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("/api/login", "POST", credentials);
      const userData = await res.json();
      // Преобразуем null в undefined для activeRole
      const extendedUser: ExtendedUser = {
        ...userData,
        activeRole: userData.activeRole || undefined
      };
      return extendedUser;
    },
    onSuccess: (user: ExtendedUser) => {
      queryClient.setQueryData(["/api/user"], user);
      toast({
        title: "Вход выполнен успешно",
        description: `Добро пожаловать, ${user.firstName} ${user.lastName}!`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка входа",
        description: "Неверный логин или пароль",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation<ExtendedUser, Error, InsertUser>({
    mutationFn: async (userData: InsertUser) => {
      const res = await apiRequest("/api/register", "POST", userData);
      const user = await res.json();
      // Преобразуем null в undefined для activeRole
      const extendedUser: ExtendedUser = {
        ...user,
        activeRole: user.activeRole || undefined
      };
      return extendedUser;
    },
    onSuccess: (user: ExtendedUser) => {
      queryClient.setQueryData(["/api/user"], user);
      toast({
        title: "Регистрация прошла успешно",
        description: `Добро пожаловать, ${user.firstName} ${user.lastName}!`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка регистрации",
        description: error.message || "Не удалось зарегистрировать пользователя",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("/api/logout", "POST");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      toast({
        title: "Выход выполнен",
        description: "Вы успешно вышли из системы",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка выхода",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Преобразование типа User в ExtendedUser при получении данных
  const extendedUser = user ? {
    ...user,
    activeRole: user.activeRole !== null ? user.activeRole : undefined
  } as ExtendedUser : null;

  return (
    <AuthContext.Provider
      value={{
        user: extendedUser,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
        refetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
