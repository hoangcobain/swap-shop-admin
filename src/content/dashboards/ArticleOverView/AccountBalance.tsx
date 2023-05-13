import TrendingUp from '@mui/icons-material/TrendingUp';
import {
    Avatar,
    Box,
    Button,
    Card,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    alpha,
    styled,
    useTheme,
} from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import Text from 'src/components/Text';
import { useArticlesQuery } from 'src/hooks/useRequest';

const AvatarSuccess = styled(Avatar)(
    ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`,
);

const ListItemAvatarWrapper = styled(ListItemAvatar)(
    ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
  background: ${
      theme.palette.mode === 'dark'
          ? theme.colors.alpha.trueWhite[30]
          : alpha(theme.colors.alpha.black[100], 0.07)
  };

  img {
    background: ${theme.colors.alpha.trueWhite[100]};
    padding: ${theme.spacing(0.5)};
    display: block;
    border-radius: inherit;
    height: ${theme.spacing(4.5)};
    width: ${theme.spacing(4.5)};
  }
`,
);

function AccountBalance({ categories }: { categories: any }) {
    const theme = useTheme();

    const { data } = useArticlesQuery({
        queryConfig: {
            all: true,
        },
    });

    const articles = data && data?.data?.articles?.length;

    const totalCount =
        categories && categories.length > 0
            ? categories?.reduce(
                  (totalCount, category) => totalCount + category.count,
                  0,
              )
            : 0;

    const chartSeries =
        categories &&
        categories.map((item) => {
            const percentage = (item.count / totalCount) * 100;
            return Math.round(percentage);
        });

    const chartOptions: ApexOptions = {
        chart: {
            background: 'transparent',
            stacked: false,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '60%',
                },
            },
        },
        colors: ['#ff9900', '#1c81c2', '#333', '#5c6ac0'],
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + '%';
            },
            style: {
                colors: [theme.colors.alpha.trueWhite[100]],
            },
            background: {
                enabled: true,
                foreColor: theme.colors.alpha.trueWhite[100],
                padding: 8,
                borderRadius: 4,
                borderWidth: 0,
                opacity: 0.3,
                dropShadow: {
                    enabled: true,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: theme.colors.alpha.black[70],
                    opacity: 0.5,
                },
            },
            dropShadow: {
                enabled: true,
                top: 1,
                left: 1,
                blur: 1,
                color: theme.colors.alpha.black[50],
                opacity: 0.5,
            },
        },
        fill: {
            opacity: 1,
        },
        labels: categories && categories.map((item) => item.category),
        legend: {
            labels: {
                colors: theme.colors.alpha.trueWhite[100],
            },
            show: false,
        },
        stroke: {
            width: 0,
        },
        theme: {
            mode: theme.palette.mode,
        },
    };

    return (
        <Card>
            <Grid spacing={0} container>
                <Grid item xs={12} md={6}>
                    <Box p={4}>
                        <Typography
                            sx={{
                                pb: 3,
                            }}
                            variant="h4"
                        >
                            Tổng số bài đăng
                        </Typography>
                        <Box>
                            <Typography variant="h1" gutterBottom>
                                {articles}
                            </Typography>
                            {/* <Box
                                display="flex"
                                sx={{
                                    py: 4,
                                }}
                                alignItems="center"
                            >
                                <AvatarSuccess
                                    sx={{
                                        mr: 2,
                                    }}
                                    variant="rounded"
                                >
                                    <TrendingUp fontSize="large" />
                                </AvatarSuccess>
                                <Box>
                                    <Typography variant="h4">
                                        + $3,594.00
                                    </Typography>
                                    <Typography variant="subtitle2" noWrap>
                                        this month
                                    </Typography>
                                </Box>
                            </Box> */}
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    sx={{
                        position: 'relative',
                    }}
                    display="flex"
                    alignItems="center"
                    item
                    xs={12}
                    md={6}
                >
                    <Box
                        component="span"
                        sx={{
                            display: { xs: 'none', md: 'inline-block' },
                        }}
                    >
                        <Divider absolute orientation="vertical" />
                    </Box>
                    <Box py={4} pr={4} flex={1}>
                        <Grid container spacing={0}>
                            <Grid
                                xs={12}
                                sm={5}
                                item
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Chart
                                    height={250}
                                    options={chartOptions}
                                    series={chartSeries}
                                    type="donut"
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                sm={7}
                                item
                                display="flex"
                                alignItems="center"
                            >
                                <List
                                    disablePadding
                                    sx={{
                                        width: '100%',
                                    }}
                                >
                                    {categories &&
                                        categories.map((item) => (
                                            <ListItem
                                                disableGutters
                                                key={item.category}
                                                className="flex items-center"
                                            >
                                                <div className="flex items-center">
                                                    {/* <ListItemAvatarWrapper>
                                                        <img
                                                            alt="BTC"
                                                            src="/static/images/placeholders/logo/bitcoin.png"
                                                        />
                                                    </ListItemAvatarWrapper> */}
                                                    <h3>{item.category}</h3>
                                                </div>
                                                <Box className="absolute right-0">
                                                    <Typography
                                                        align="right"
                                                        variant="h4"
                                                        noWrap
                                                    >
                                                        {Math.round(
                                                            (item.count /
                                                                totalCount) *
                                                                100,
                                                        )}
                                                        %
                                                    </Typography>
                                                </Box>
                                            </ListItem>
                                        ))}
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    );
}

export default AccountBalance;
