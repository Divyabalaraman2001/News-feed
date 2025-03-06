const getTrendingNews = (newsData) => {
    return newsData
        .sort((a, b) => b.likes - a.likes); // Sort in descending order of likes
};

// Example usage:
const newsData = [
   
    {
        _id: "67c6044b67137cfcdfaacf24",
        title: "Force talent edges Wallabies star as fight for spots to face Lions hea…",
        likes: 1,
        publishedAt: "2025-03-03T19:34:35.797+00:00"
    },
    {
        _id: "67c603df67137cfcdfaacf15",
        title: "Så kan du hoppa av techorrhjulet",
        likes: 4,
        publishedAt: "2025-03-03T19:32:47.258+00:00"
    },
    {
        _id: "67c603df67137cfcdfaacf15",
        title: "Så kan du hoppa av techorrhjulet",
        likes: 4,
        publishedAt: "2025-03-03T19:32:47.258+00:00"
    },
    ,
    {
        _id: "67c603df67137cfcdfaacf15",
        title: "Så kan du hoppa av techorrhjulet",
        likes: 5,
        publishedAt: "2025-03-03T19:32:47.258+00:00"
    },
    {
        _id: "67c603df67137cfcdfaacf15",
        title: "Så kan du hoppa av techorrhjulet",
        likes: 4,
        publishedAt: "2025-03-03T19:32:47.258+00:00"
    },
    {
        _id: "67c603df67137cfcdfaacf15",
        title: "Så kan du hoppa av techorrhjulet",
        likes: 4,
        publishedAt: "2025-03-03T19:32:47.258+00:00"
    },
    {
        _id: "67c603df67137cfcdfaacf15",
        title: "Så kan du hoppa av techorrhjulet",
        likes: 4,
        publishedAt: "2025-03-03T19:32:47.258+00:00"
    },
    {
        _id: "67c603df67137cfcdfaacf15",
        title: "Så kan du hoppa av techorrhjulet",
        likes: 4,
        publishedAt: "2025-03-03T19:32:47.258+00:00"
    },
    {
        _id: "67c603df67137cfcdfaacf15",
        title: "Så kan du hoppa av techorrhjulet",
        likes: 4,
        publishedAt: "2025-03-03T19:32:47.258+00:00"
    },
    {
        _id: "67c603df67137cfcdfaacf15",
        title: "Så kan du hoppa av techorrhjulet",
        likes: 4,
        publishedAt: "2025-03-03T19:32:47.258+00:00"
    },
    {
        _id: "67c603df67137cfcdfaacf15",
        title: "Så kan du hoppa av techorrhjulet",
        likes: 4,
        publishedAt: "2025-03-03T19:32:47.258+00:00"
    },
    {
        _id: "67c603df67137cfcdfaacf15",
        title: "Så kan du hoppa av techorrhjulet",
        likes: 4,
        publishedAt: "2025-03-03T19:32:47.258+00:00"
    }
];

console.log(getTrendingNews(newsData));
