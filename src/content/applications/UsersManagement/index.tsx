import { Helmet } from 'react-helmet-async';
import PageHeader from 'src/content/applications/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import RecentOrders from './RecentOrders';

function ApplicationsUsers() {
    return (
        <>
            <Helmet>
                <title>Users - Applications</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader
                    title="User Management"
                    buttonName="Create user"
                    modal={<div>hello</div>}
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

export default ApplicationsUsers;
