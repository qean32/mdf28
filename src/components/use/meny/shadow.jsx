const Shadow = ({ viewShadow, OfModal }) => {
    return (
        <>
            {viewShadow && <div className="shadow" onClick={OfModal}></div>}
        </>
    )
}

export default Shadow;