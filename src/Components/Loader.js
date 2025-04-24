
export default function Loader({ loading }) {
    const logoStyle = {
        width: '100px',
        height: '100px',
        border: '5px solid #3498db',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#3498db',
        animation: 'halfRotate 2s ease-in-out infinite',
        margin: '20px auto',
    };

    if (loading) {
        return (
            <div className="loader flex-column">
                <div className="vn-container">
                    <div className="vn-text">VN</div>
                    <div className="half-circle"></div>
                </div>
            </div>
        );
    }

    return <div className="loader flex-column" style={{ height: 0 }}></div>;
}
