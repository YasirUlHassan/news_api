/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import News from "./News";

export default function Home() {
    const apiKey = 'f6c1649e74304d65a3a369a7bba759bf';
    const [category, setCategory] = useState("india");
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const current = new Date();
    const month = (current.getMonth() + 1).toString().padStart(2, '0');
    const date = `${current.getFullYear()}-${month}-${current.getDate() - 1}`;

    useEffect(() => {
        setLoading(true);
        fetch(`https://newsapi.org/v2/everything?q=${category}&from=${date}&language=en&sortBy=publishedAt&apiKey=${apiKey}`)
            .then((response) => response.json())
            .then((news) => {
                setArticles(news.articles);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, [category]);
    return (
        <div className="container">
            <header className="header">
                <nav>
                    <h1>DailySortFeed</h1>
                    <div className='header-right'>
                        <form>
                            <label>Search</label>
                            <input type="text" id="search" name="search" className='searchbox'
                                onChange={(event) => {
                                    const value = event.target.value.trim();
                                    setCategory(value === "" ? "india" : value);
                                }}
                                placeholder=""
                            />
                        </form>
                    </div>
                </nav>
            </header>

            <section className="news">
                <div className="loading-error">
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error.message}</p>}
                </div>
                {!loading && !error && articles.length === 0 && <h3>No News Found</h3>}
                {!loading && !error && articles.length > 0 && (
                    <>
                        <section className="heading">
                            <h1>Latest articles about India</h1>
                        </section>
                        <div className="news-articles">
                            {articles.map((article) => (
                                <News key={article.url} article={article} />
                            ))}
                        </div>
                    </>
                )}
            </section>
        </div>
    )
}