import { API_ENDPOINTS } from '@/utils/api-endpoints';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import request from '@utils/request';
import { fetchProduct } from '../products/get-product';
import { useProductQuery } from '@/query/products/get-product';

export type ChangeRole = 'admin' | 'customer';

const mutatioRole = async (data: { id: string; role: string }) => {
  return await request.request({
    method: 'POST',
    url: '/users/admin/edit/update-role',
    data: data,
  });
};

export const useRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation((data: { id: string; role: string }) => mutatioRole(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['/users/list']);
    },
  });
};

const mutationDelete = async (data: { id: string; role: string }) => {
  return await request.request({
    method: 'POST',
    url: '/users/admin/edit/delete',
    data: data,
  });
};

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation((data: { id: string; role: string }) => mutationDelete(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['/users/list']);
    },
  });
};
