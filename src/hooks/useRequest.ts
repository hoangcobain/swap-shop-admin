import { useQuery, useMutation } from 'react-query';
import { useAuthContext } from 'src/contexts/AuthContext';
import categoryService from 'src/services/category.service';
import userService from 'src/services/user.service';

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
