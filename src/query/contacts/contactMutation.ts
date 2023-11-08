import { useMutation } from '@tanstack/react-query';
import request from '@utils/request';
import { API_ENDPOINTS } from '@utils/api-endpoints';
import { IContact } from '@interfaces/contact';

const mutationContact = async (data: IContact) => {
  return await request.request({
    method: 'POST',
    url: API_ENDPOINTS.CONTACT,
    data,
  });
};

export const useContactMutation = () => {
  return useMutation((input: IContact) => mutationContact(input));
};
