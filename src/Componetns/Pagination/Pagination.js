import React, { useContext } from "react";
import movieInfoContext from "../../context/search_MovieInfo_context";
import Context from "../../context/context";

const Pagination = () => {
    const context_ = useContext(Context);
    const ctx = useContext(movieInfoContext);

    const changePage = (e) => {
        let currentPage = e.target.dataset.pageNum;
        const url = `${context_.url[0]}/search/${ctx.searchResult.searchQuery}/${currentPage}`;
        let result = fetch(url);
        result.then((response) => {
            response.json().then((data) => {
                ctx.updateSearchResult((prevData) => {
                    return {
                        ...prevData,
                        current_page: data.currentPage,
                        movies: data.result,
                    };
                });
            });
        });
        ctx.searchResultSectionRef.current.scrollIntoView();
    };

    const hasNextPage = () => {
        if (ctx.searchResult.current_page < ctx.searchResult.total_pages) {
            return (
                <li className="next">
                    <i
                        className="fas fa-caret-right fa-2x"
                        onClick={changePage}
                        data-page-num={ctx.searchResult.current_page + 1}
                    ></i>
                </li>
            );
        }
    };

    const hasPrePage = () => {
        if (ctx.searchResult.current_page > 1) {
            return (
                <li className="previous">
                    <i
                        className="fas fa-caret-left fa-2x"
                        onClick={changePage}
                        data-page-num={ctx.searchResult.current_page - 1}
                    ></i>
                </li>
            );
        }
    };

    const pages = () => {
        let results = [];

        for (
            let pageNum = 1;
            pageNum <= ctx.searchResult.total_pages;
            pageNum++
        ) {
            let three_pages_pre =
                -3 <= pageNum - ctx.searchResult.current_page &&
                pageNum - ctx.searchResult.current_page < 0 &&
                pageNum >= 1;

            let three_pages_next =
                3 >= pageNum - ctx.searchResult.current_page &&
                pageNum - ctx.searchResult.current_page > 0 &&
                pageNum <= ctx.searchResult.total_pages;

            if (ctx.searchResult.current_page === pageNum) {
                results.push(
                    <li
                        className="activePage"
                        key={pageNum}
                        onClick={changePage}
                        data-page-num={pageNum}
                    >
                        {pageNum}
                    </li>
                );
            } else if (three_pages_pre) {
                if (pageNum - ctx.searchResult.current_page === -3) {
                    results.push(
                        <li
                            key="lessPages"
                            onClick={changePage}
                            data-page-num={1}
                        >
                            ...
                        </li>
                    );
                }
                results.push(
                    <li
                        key={pageNum}
                        onClick={changePage}
                        data-page-num={pageNum}
                    >
                        {pageNum}
                    </li>
                );
            } else if (three_pages_next) {
                results.push(
                    <li
                        key={pageNum}
                        onClick={changePage}
                        data-page-num={pageNum}
                    >
                        {pageNum}
                    </li>
                );
                if (pageNum - ctx.searchResult.current_page === 3) {
                    results.push(
                        <li
                            key="morePages"
                            onClick={changePage}
                            data-page-num={ctx.searchResult.total_pages}
                        >
                            ...
                        </li>
                    );
                }
            }
        }

        return results;
    };

    return (
        <section className="pagination">
            <ul>
                {hasPrePage()}
                {pages()}
                {hasNextPage()}
            </ul>
        </section>
    );
};

export default Pagination;
