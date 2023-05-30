const GlobalActasFilter = ({ filter, setFilter }) => {
    return (
        <div className="ct-search">
            <h4>Buscar: {' '}</h4>
            <input type="search" placeholder="Búsqueda general..." value={filter || ''}
            onChange={e => setFilter(e.target.value)}/>
        </div>
    );
}

export default GlobalActasFilter;
