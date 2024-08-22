import * as htmlToImage from "html-to-image";

const handleDownloadSVG = (qrCodeRef) => {
    if (qrCodeRef.current) {
        htmlToImage
            .toSvg(qrCodeRef.current)
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = "qr-code.svg";
                link.click();
            })
            .catch((error) => {
                console.error("Error generating PNG QR code:", error);
            });
    } else {
        console.error("PNG QR Code element is not available for download.");
    }
}

export default handleDownloadSVG;