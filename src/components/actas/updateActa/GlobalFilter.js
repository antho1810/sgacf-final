const GlobalParticipantesFilter = ({ filter, setFilter }) => {
    return (
        <div className="ct-search" style={{justifyContent: "center"}}>
            <h4>Buscar: {' '}</h4>
            <input type="search" style={{width: "20vw"}}  placeholder="Búsqueda general..." value={filter || ''}
            onChange={e => setFilter(e.target.value)}/>
        </div>
    );
}

export default GlobalParticipantesFilter;
