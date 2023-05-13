import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import PageHeader from './PageHeader';
import WatchList from './WatchList';
import AccountBalance from './AccountBalance';
import { useArticlesQuery } from 'src/hooks/useRequest';
import { STATUS_ARTICLE } from 'src/constants/article';
import { useMemo } from 'react';

function DashboardCrypto() {
    const { data } = useArticlesQuery({
        queryConfig: {
            status: STATUS_ARTICLE.APPROVED,
            order_by: 'ASC',
        },
    });

    const articles = data?.data.articles;

    const categories = useMemo(() => {
        return articles
            ? articles?.reduce((acc: any, article) => {
                  const categoriesArticle = article.categories?.map(
                      (item) => item.name,
                  );
                  const index = acc.findIndex(
                      (item: any) =>
                          item.category.join() === categoriesArticle.join(),
                  );

                  if (index === -1) {
                      acc.push({
                          category: categoriesArticle,
                          count: 1,
                      });
                  } else {
                      acc[index].count++;
                  }
                  return acc;
              }, [])
            : [];
    }, [articles]);

    return (
        <>
            <Helmet>
                <title>Overview Dashboard</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={4}
                >
                    <Grid item xs={12}>
                        <AccountBalance categories={categories} />
                    </Grid>
                    <Grid item lg={8} xs={12}>
                        {/* <Wallets /> */}
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        {/* <AccountSecurity /> */}
                    </Grid>
                    <Grid item xs={12}>
                        <WatchList />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default DashboardCrypto;
