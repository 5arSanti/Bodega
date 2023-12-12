import "./styles.css";

const NotFoundCard = () => {
	return(
        <div className="record-not-found-card-container">
            <img src="/not-found.png" alt="not-found-icon" />
            <p>No se encontró ningún dato con estos filtros.</p>
        </div>
	);
}

export { NotFoundCard };