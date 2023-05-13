import {
    Card,
    Box,
    Typography,
    Avatar,
    Grid,
    alpha,
    useTheme,
    styled,
} from '@mui/material';
import Label from 'src/components/Label';
import Text from 'src/components/Text';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { Article } from 'src/types/article.type';
import { convertLocaleDateString, getDates } from 'src/utils/util';
import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import articleService from 'src/services/article.service';

const AvatarWrapper = styled(Avatar)(
    ({ theme }) => `
    margin: ${theme.spacing(0, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
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

function WatchListColumn({
    value,
    articlesByDate,
    articles,
    highestViewedArticles,
    highestFavoriteArticles,
}: {
    articlesByDate: { date: Date; count: number }[];
    value: { startDate: Date; endDate: Date };
    articles: Article[];
    highestViewedArticles: any;
    highestFavoriteArticles: any;
}) {
    const theme = useTheme();

    const chartOptions: ApexOptions = {
        chart: {
            background: 'transparent',
            toolbar: {
                show: false,
            },
            sparkline: {
                enabled: true,
            },
            zoom: {
                enabled: false,
            },
        },
        fill: {
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.1,
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0,
                stops: [0, 100],
            },
        },
        colors: [theme.colors.primary.main],
        dataLabels: {
            enabled: false,
        },
        theme: {
            mode: theme.palette.mode,
        },
        stroke: {
            show: true,
            colors: [theme.colors.primary.main],
            width: 3,
        },
        legend: {
            show: false,
        },
        labels:
            articlesByDate &&
            articlesByDate.map((articleByDate) =>
                articleByDate.date.toString(),
            ),
        xaxis: {
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: false,
            tickAmount: 5,
        },
        tooltip: {
            x: {
                show: true,
            },
            y: {
                title: {
                    formatter: function () {
                        return 'Số bài đăng';
                    },
                },
            },
            marker: {
                show: false,
            },
        },
    };

    const chartOptionViews: ApexOptions = {
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'center', // top, center, bottom
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + ' lượt xem';
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ['#304758'],
            },
        },

        xaxis: {
            categories:
                highestViewedArticles &&
                highestViewedArticles.map(
                    (item) =>
                        `Ngày ${convertLocaleDateString(
                            item.createdDate.toString(),
                        )} bài đăng của ${item.user.username}, tiêu đề: ${
                            item.title
                        }`,
                ),
            position: 'top',
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            crosshairs: highestViewedArticles
                ? {
                      fill: {
                          type: 'gradient',
                          gradient: {
                              colorFrom: '#D8E3F0',
                              colorTo: '#BED1E6',
                              stops: [0, 100],
                              opacityFrom: 0.4,
                              opacityTo: 0.5,
                          },
                      },
                  }
                : undefined,
            tooltip: {
                enabled: false,
            },
            labels: {
                show: false,
            },
        },
        yaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val + ' lượt xem';
                },
            },
            tooltip: {
                enabled: false,
            },
        },
    };

    const chartOptionFavorites: ApexOptions = {
        chart: {},
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'center', // top, center, bottom
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + ' lượt yêu thích';
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ['#304758'],
            },
        },

        xaxis: {
            categories:
                highestFavoriteArticles &&
                highestFavoriteArticles.map(
                    (item) =>
                        `Ngày ${convertLocaleDateString(
                            item.createdDate.toString(),
                        )} bài đăng của ${item.user.username}, tiêu đề: ${
                            item.title
                        }`,
                ),
            position: 'top',
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            crosshairs: highestFavoriteArticles
                ? {
                      fill: {
                          type: 'gradient',
                          gradient: {
                              colorFrom: '#D8E3F0',
                              colorTo: '#BED1E6',
                              stops: [0, 100],
                              opacityFrom: 0.4,
                              opacityTo: 0.5,
                          },
                      },
                  }
                : undefined,
            tooltip: {
                enabled: false,
            },
            labels: {
                show: false,
            },
        },
        yaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val + ' lượt yêu thích';
                },
            },
            tooltip: {
                enabled: false,
            },
        },
    };
    const chart1Data = [
        {
            name: 'Số bài đăng',
            data: articlesByDate
                ? articlesByDate.map((item) => item.count)
                : [],
        },
    ];
    const chart2Data = [
        {
            name: 'Bài đăng xem nhiều nhất trong ngày',
            data:
                highestViewedArticles && highestViewedArticles.length > 0
                    ? highestViewedArticles.map((item) => item.views)
                    : [],
        },
    ];
    const chart3Data = [
        {
            name: 'Bài đăng được yêu thích nhất theo ngày',
            data:
                highestFavoriteArticles && highestFavoriteArticles.length > 0
                    ? highestFavoriteArticles.map((item) => item.favoritesCount)
                    : [],
        },
    ];

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
        >
            <Grid item md={4} xs={12}>
                <Card
                    sx={{
                        overflow: 'visible',
                    }}
                >
                    <Box
                        sx={{
                            p: 3,
                            height: 200,
                        }}
                    >
                        <Box display="flex" alignItems="center">
                            <Box>
                                <Typography variant="h4" noWrap>
                                    Thống kê bài đăng theo ngày
                                </Typography>
                                <Typography variant="subtitle1" noWrap>
                                    Ngày{' '}
                                    {convertLocaleDateString(
                                        value.startDate.toString(),
                                    )}{' '}
                                    -{' '}
                                    {convertLocaleDateString(
                                        value.endDate.toString(),
                                    )}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                pt: 3,
                            }}
                        >
                            <Typography
                                variant="h2"
                                sx={{
                                    pr: 1,
                                    mb: 1,
                                }}
                            >
                                {articles && articles.length > 0
                                    ? articles.length
                                    : 'Không có'}{' '}
                                bài viết
                            </Typography>
                        </Box>
                    </Box>
                    <Chart
                        options={chartOptions}
                        series={chart1Data}
                        type="area"
                        height={200}
                    />
                </Card>
            </Grid>
            <Grid item md={4} xs={12}>
                <Card
                    sx={{
                        overflow: 'visible',
                    }}
                >
                    <Box
                        sx={{
                            p: 2,
                            height: 185,
                        }}
                    >
                        <Box display="flex" alignItems="center">
                            <Box>
                                <Typography variant="h4" noWrap>
                                    Được xem nhiều nhất theo ngày
                                </Typography>
                                <Typography variant="subtitle1" noWrap>
                                    Bài đăng
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                pt: 3,
                            }}
                        >
                            <Typography
                                variant="h2"
                                sx={{
                                    pr: 1,
                                    mb: 1,
                                }}
                            >
                                {/* Bài đăng của{' '}
                                {highestViewedArticles[0].user.username} với{' '}
                                {highestViewedArticles[0].views} số lượt xem */}
                            </Typography>
                        </Box>
                    </Box>
                    <Chart
                        options={chartOptionViews}
                        series={chart2Data}
                        type="bar"
                        height={200}
                    />
                </Card>
            </Grid>
            <Grid item md={4} xs={12}>
                <Card
                    sx={{
                        overflow: 'visible',
                    }}
                >
                    <Box
                        sx={{
                            p: 3,
                            height: 185,
                        }}
                    >
                        <Box display="flex" alignItems="center">
                            <Box>
                                <Typography variant="h4" noWrap>
                                    Được yêu thích nhất trong ngày
                                </Typography>
                                <Typography variant="subtitle1" noWrap>
                                    Lượt thích
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Chart
                        options={chartOptionFavorites}
                        series={chart3Data}
                        type="bar"
                        height={200}
                    />
                </Card>
            </Grid>
        </Grid>
    );
}

export default WatchListColumn;
