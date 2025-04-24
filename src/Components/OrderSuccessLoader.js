import React, { useEffect, useState } from "react";

export default function OrderSuccessLoader() {
    const [greenPhase, setGreenPhase] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setGreenPhase(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`order-loader-container ${greenPhase ? "green-bg" : ""} d-flex justify-content-center align-items-center`}>
            <div className={`loader-box text-center ${greenPhase ? "fade-in" : ""}`}>
                {greenPhase ? (
                    <>
                        <div className="success-icon mb-3">✔</div>
                        <h4 className="text-white">Order Placed Successfully!</h4>
                    </>
                ) : (
                    <>
                        <div className="spinner-border text-success mb-3" style={{ width: "4rem", height: "4rem" }} role="status"></div>
                        <h5 className="text-success">Placing your order...</h5>
                        <p className="text-muted">Almost done!</p>
                    </>
                )}
            </div>
        </div>
    );
}
