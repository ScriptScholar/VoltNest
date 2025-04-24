export default function Loader({ loading }) {
    if (loading) {
        return (
            <div className="loader flex-column">
                <img src="./logo.png" alt="Loading" className="rotate-logo" />
            </div>
        );
    }

    return <div className="loader flex-column" style={{ height: 0 }}></div>;
}
