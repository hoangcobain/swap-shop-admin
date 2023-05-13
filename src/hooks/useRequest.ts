import { useQuery, useMutation } from 'react-query';
import { useAuthContext } from 'src/contexts/AuthContext';
import articleService from 'src/services/article.service';
import categoryService from 'src/services/category.service';
import userService from 'src/services/user.service';
import useQueryConfig from './useQueryConfig';
import notificationService from 'src/services/notification.service';
import { QueryConfig } from 'src/types/util.type';

export function useGetUsers() {
    return useQuery({
        queryKey: ['get-users'],
        queryFn: userService.getUsers,
        staleTime: 10 * 60 * 1000,
        cacheTime: 15 * 60 * 1000,
    });
}

export function useLoginMutation() {
    return useMutation({
        mutationFn: userService.login,
    });
}

export function useMeQuery() {
    const { isAuthenticated } = useAuthContext();
    return useQuery({
        queryKey: ['me'],
        queryFn: userService.me,
        cacheTime: 0,
        enabled: isAuthenticated,
    });
}

export function useLogoutMutation() {
    return useMutation({
        mutationFn: userService.logout,
    });
}

export function useUpdateStatusUserMutation() {
    return useMutation({
        mutationFn: userService.changeStatusUser,
    });
}

export function useCategoriesQuery() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: categoryService.getCategories,
    });
}

export function useInsertCategoryMutation() {
    return useMutation({
        mutationFn: categoryService.insertCategory,
    });
}

export function useUpdateCategoryMutation() {
    return useMutation({
        mutationFn: categoryService.updateCategory,
    });
}

export function useArticlesQuery({
    queryConfig,
}: {
    queryConfig: QueryConfig;
}) {
    return useQuery({
        queryKey: ['articles', queryConfig],
        queryFn: () => articleService.getArticles(queryConfig),
    });
}

export function useUpdateStatusArticleMutation() {
    return useMutation({
        mutationFn: articleService.changeStatusArticle,
    });
}

export function usePushNotificationMutation() {
    return useMutation({
        mutationFn: notificationService.pushNotification,
    });
}

export function usePushPrivateNotificationMutation() {
    return useMutation({
        mutationFn: notificationService.pushPrivateNotification,
    });
}

export function usePublicNotificationsQuery() {
    return useQuery({
        queryKey: ['notificationsPublic'],
        queryFn: notificationService.getPublicNotifications,
        refetchInterval: 2000,
    });
}

export function useChangeNotifyMutation() {
    return useMutation({
        mutationFn: notificationService.changeNotification,
    });
}
