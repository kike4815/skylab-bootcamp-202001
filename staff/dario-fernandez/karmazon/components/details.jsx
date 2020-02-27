function Details({details: { name, year, price, image, color, maker, collection, style, description, url}, onCloseDetails }){ 
            return <section className="details">
                <div className="details__main">
                    <h2 className="details__name">{name}</h2>
                    <img className="details__photo" src={image} />
                </div>
                <div className="details__features">
                    <span className="details__title-container">
                        <h3 className="details__features-title">Car specifications</h3>
                        <span className="details__close"><i className="fas fa-times-circle" onClick={() => onCloseDetails()}></i></span>
                    </span>
                    <div className="details__features-list">
                        <p className="details__feature"><strong>Year:</strong> {year}</p>
                        <p className="details__feature"><strong>Color:</strong> {color && color.capitalize()}</p>
                        <p className="details__feature"><strong>Brand:</strong> {maker && maker.capitalize()}</p>
                        <p className="details__feature"><strong>Collection:</strong> {collection && collection.capitalize()}</p>
                        <p className="details__feature"><strong>Style:</strong> {style && style.capitalize()}</p>
                        <p className="details__description"><strong>Description:</strong> {description && description}</p>
                        <p className="details__feature"><strong>Price:</strong> {price && price}$</p>
                        <a className="details__link" href={url && url} target="_blank">Go to the official site</a>
                    </div>
                </div>
            </section>
}