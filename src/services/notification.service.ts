import {
    changeNotificationDocument,
    publicNotificationsDocument,
    pushNotificationDocument,
    pushPrivateNotificationDocument,
} from 'src/graphql/document';
import graphQLClient from 'src/libs/graphqlClient';
import { Notification } from 'src/types/notification.type';
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
    getPublicNotifications: async () => {
        const { notificationsPublic } = await graphQLClient.request<{
            notificationsPublic: Notification[] | null;
        }>(publicNotificationsDocument);
        return notificationsPublic;
    },
    changeNotification: async (body: {
        content: string;
        notificationId: string;
    }) => {
        const { changeNotification } = await graphQLClient.request<{
            changeNotification: SuccessResponse<Notification, 'notification'>;
        }>(changeNotificationDocument, body);
        return changeNotification;
    },
};

export default notificationService;
