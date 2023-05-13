import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import ViewWeekTwoToneIcon from '@mui/icons-material/ViewWeekTwoTone';
import {
    Box,
    Button,
    Card,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    styled,
} from '@mui/material';
import { MouseEvent, useMemo, useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { STATUS_ARTICLE } from 'src/constants/article';
import { useArticlesQuery } from 'src/hooks/useRequest';
import { Article } from 'src/types/article.type';
import { convertLocaleDateString } from 'src/utils/util';
import WatchListColumn from './WatchListColumn';
import WatchListRow from './WatchListRow';

const EmptyResultsWrapper = styled('img')(
    ({ theme }) => `
      max-width: 100%;
      width: ${theme.spacing(66)};
      height: ${theme.spacing(34)};
`,
);

function WatchList() {
    const [tabs, setTab] = useState<string | null>('watch_list_columns');
    const [value, setValue] = useState<{ startDate: Date; endDate: Date }>({
        startDate: new Date(),
        endDate: new Date(),
    });

    const { data } = useArticlesQuery({
        queryConfig: {
            start_date: new Date(value.startDate).toISOString(),
            end_date: new Date(value.endDate).toISOString(),
            limit: '10', // cần làm thêm cái get all
            page: '1',
            status: STATUS_ARTICLE.APPROVED,
            order_by: 'ASC',
        },
    });

    const articles = data?.data.articles;

    // *******
    const articlesInRange = useMemo(() => {
        return articles
            ? articles?.filter((article: Article) => {
                  const createdDate = convertLocaleDateString(
                      article.createdDate,
                  );
                  return (
                      createdDate >=
                          convertLocaleDateString(value.startDate.toString()) &&
                      createdDate <=
                          convertLocaleDateString(value.endDate.toString())
                  );
              })
            : [];
    }, [articles]);

    const articlesByDate = useMemo(() => {
        return articlesInRange
            ? articlesInRange?.reduce((acc: any, article) => {
                  const createdDate = convertLocaleDateString(
                      article.createdDate,
                  );
                  const index = acc.findIndex(
                      (item: any) => item.date === createdDate,
                  );

                  if (index === -1) {
                      acc.push({
                          date: createdDate,
                          count: 1,
                          highestViewed: article,
                          highestFavorites: article,
                      });
                  } else {
                      acc[index].count++;
                      if (article.views > acc[index].highestViewed.views) {
                          acc[index].highestViewed = article;
                      }
                      if (
                          article.favoritesCount >
                          acc[index].highestFavorites.favoritesCount
                      ) {
                          acc[index].highestFavorites = article;
                      }
                  }
                  return acc;
              }, [])
            : [];
    }, [articlesInRange]);

    const highestViewedArticles = useMemo(() => {
        return articlesByDate
            ? articlesByDate?.reduce((acc: any, article: any) => {
                  acc.push(article.highestViewed);
                  return acc;
              }, [])
            : [];
    }, [articlesByDate]);

    const highestFavoriteArticles = useMemo(() => {
        return articlesByDate
            ? articlesByDate?.reduce((acc: any, article: any) => {
                  acc.push(article.highestFavorites);
                  return acc;
              }, [])
            : [];
    }, [articlesByDate]);

    // *****

    const handleValueChange = (newValue) => {
        console.log('newValue:', newValue);
        setValue(newValue);
    };

    const handleViewOrientation = (
        _event: MouseEvent<HTMLElement>,
        newValue: string | null,
    ) => {
        setTab(newValue);
    };

    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    pb: 3,
                }}
            >
                <Typography variant="h3">Watch List</Typography>
                <ToggleButtonGroup
                    value={tabs}
                    exclusive
                    onChange={handleViewOrientation}
                >
                    <ToggleButton disableRipple value="watch_list_columns">
                        <ViewWeekTwoToneIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <div className="mb-3">
                <Datepicker
                    value={value}
                    onChange={handleValueChange}
                    displayFormat="DD-MM-YYYY"
                />
            </div>

            {tabs === 'watch_list_columns' && (
                <WatchListColumn
                    value={value}
                    articlesByDate={articlesByDate}
                    articles={articles || []}
                    highestViewedArticles={highestViewedArticles}
                    highestFavoriteArticles={highestFavoriteArticles}
                />
            )}
        </>
    );
}

export default WatchList;
