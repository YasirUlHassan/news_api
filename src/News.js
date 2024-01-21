
export default function News(props) {
    return (
        <div className="news-container">

            <div className="news-img">
                {
                    props.article.urlToImage !== null ?
                        <img src={props.article.urlToImage} alt="FallBackImage"></img> :
                        <img src="https://s3.amazonaws.com/images.ecwid.com/images/12043022/3118240932.jpg" alt=""></img>
                }
            </div>

            <div className="title-desc">
                <h1>{props.article.title}</h1>

                <div className="desc-auth">
                    <p>{props.article.description?.substring(0, 200).concat("...  ")}<a href={props.article.url} target="_blank" rel="noopener noreferrer">Read more</a></p>
                    <div className="source">
                        <div className="source-1">
                            <p>Author : </p>
                            <p>{props.article.author}</p>
                            <p>{props.article.source.name}</p>
                        </div>
                        <div className="source-2">
                            <p>Published At : </p>
                            <p>{props.article.publishedAt}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}