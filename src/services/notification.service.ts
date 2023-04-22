import {
    pushNotificationDocument,
    pushPrivateNotificationDocument,
} from 'src/graphql/document';
import graphQLClient from 'src/libs/graphqlClient';
import { SuccessResponse } from 'src/types/util.type';

const notificationService = {
    pushNotification: async (body: { content: string }) => {
        const { pushNotification } = await graphQLClient.request<{
            pushNotification: SuccessResponse<Notification, 'notification'>;
        }>(pushNotificationDocument, body);
        return pushNotification;
    },
    pushPrivateNotification: async (body: {
        content: string;
        recipientId: string;
    }) => {
        const { pushPrivateNotification } = await graphQLClient.request<{
            pushPrivateNotification: SuccessResponse<
                Notification,
                'notification'
            >;
        }>(pushPrivateNotificationDocument, body);
        return pushPrivateNotification;
    },
};

export default notificationService;
