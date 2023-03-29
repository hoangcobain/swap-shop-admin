import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from '../components/PageHeader';

import CategoryModal from '../CategoriesManagement/CategoryModal';
import RecentOrders from './RecentOrders';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';

function CategoriesManagement() {
    return (
        <>
            <PageTitleWrapper>
                <PageHeader
                    title="Categories Management"
                    buttonName="Create category"
                    modal={<CategoryModal />}
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

export default CategoriesManagement;
