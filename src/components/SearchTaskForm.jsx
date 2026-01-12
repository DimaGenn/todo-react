import Field from "./Field"

const SearchTaskForm = (props) => {
    const {
        //onSearchInput
        searchQuery,
        setSearchQuery
    } = props

    return (
        <form
            className="todo__form"
            onSubmit={(event) => event.preventDefault()}
        >
            <Field
                onInput={(event) => setSearchQuery(event.target.value)}
                value={searchQuery}
                className="todo__field"
                label="Search task"
                id="search-task"
                type="search"
            />
        </form>
    )
}

export default SearchTaskForm