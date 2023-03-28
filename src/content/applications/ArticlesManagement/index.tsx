import { Helmet } from 'react-helmet-async';
import PageHeader from 'src/content/applications/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import { useState } from 'react';
import Footer from 'src/components/Footer';

import RecentOrders from './RecentOrders';

function ApplicationsArticles() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Helmet>
                <title>Articles - Applications</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader
                    title="Transaction"
                    buttonName="Transaction"
                    modal={<div>Hello</div>}
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
