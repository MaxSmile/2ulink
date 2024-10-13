// src/components/shortening/QRCodeBox.jsx
import { QRCodeSVG } from 'qrcode.react';
export default function QRCodeBox({ value }) {
    return (
        <div className="mt-4 flex flex-col items-center bg-white p-8 rounded border border-light border-dashed">
            <p>Print | Download | Share</p>
            <QRCodeSVG // QR code
                value={value}
                fgColor="#1C546A"
                size={256}
                level='M'
            />
            <p className="mt-6 pt-6 text-lg text-center text-dark">
                The QR code contains the shortened URL
            </p>
        </div>
    );
}