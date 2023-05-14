import { reportsDocument } from 'src/graphql/document';
import graphQLClient from 'src/libs/graphqlClient';
import { Report } from 'src/types/report.type';
import { SuccessResponsePagination } from 'src/types/util.type';

const reportService = {
    getReports: async () => {
        const { reports } = await graphQLClient.request<{
            reports: Report[] | null;
        }>(reportsDocument);
        return reports;
    },
};

export default reportService;
