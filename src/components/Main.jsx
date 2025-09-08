function Main() {
    return (
        <main role="main">
            <section className="form-container">
                <form action="" className="add-ingredient-form">
                    <fieldset>
                        <legend className="sr-only">Form to add ingredients for AI-generated recipes</legend>
                        <div className="input-container">
                            <input
                                className="input-field"
                                type="text"
                                aria-label="Add ingredient"
                                placeholder="e.g. oregano"
                            />
                            <button type="submit" className="btn search">Add ingredient</button>
                        </div>
                    </fieldset>
                </form>
            </section>
        </main>
    )
}

export { Main }