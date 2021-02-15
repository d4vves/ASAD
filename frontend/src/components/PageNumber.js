const PageNumber = ({ pageNum, fullListLength }) => {
    return (
        <em className="page-number">{pageNum + 1} / {fullListLength / 20}</em>
    )
}

export default PageNumber