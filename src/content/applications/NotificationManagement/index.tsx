import { Helmet } from 'react-helmet-async';
import PageHeader from 'src/content/applications/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';

import Footer from 'src/components/Footer';
import RecentOrders from './RecentOrders';
import NotificationModal from './NotificationModal';

function ApplicationsArticles() {
    return (
        <>
            <Helmet>
                <title>Thông báo - Applications</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader
                    title="Quản lý thông báo"
                    buttonName="Thông báo"
                    modal={<NotificationModal />}
                />
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <RecentOrders />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default ApplicationsArticles;
