// src/components/shortening/UrlForm.jsx

import { useState } from "react";
import { BASE_URL, CLIENT_URL } from "../../data/constants";

import InputForm from "./InputForm";
import QRCodeBox from "./QRCodeBox";


export default function OutputForm() {
    const [inputState, setInputState] = useState(true)
    const [showQRCode, setShowQRCode] = useState(false)
    const [resultingUrl, setResultingUrl] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [copied, setCopied] = useState('Copy')
    const [share, setShare] = useState('Share')

    const handleResult = (result) => {
        setInputState(false)
        if (result.success) {
            setResultingUrl(result.mappingID)
            setErrorMessage('')
        } else {
            setErrorMessage(`Error: ${result.error}`)
            setResultingUrl('')
        }
    }

    const shareUrl = () => {
        setShare('Sharing...')
        navigator.share({ url: `${BASE_URL}/${resultingUrl}` })
            .then(() => {
                setShare('Shared!')
                setTimeout(() => setShare('Share'), 2000);
            })
            .catch((err) => {
                console.error('Error sharing', err)
                setShare('Share')
            })
    }

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(`${BASE_URL}/${resultingUrl}`)
            .then(() => {
                setCopied('Copied!')
                setTimeout(() => setCopied('Copy'), 2000);
            })
            .catch((err) => {
                console.error('Error copying to clipboard', err)
                setCopied('Copy')
            })
    }

    if (inputState) {
        return <InputForm onResult={handleResult} />
    } else return (
        <div className="px-2 md:px-0">
            <div className="mb-8" id="result">
                {errorMessage && (
                    <div className="alert-error text-lg text-left">
                        <button className="close-btn" onClick={() => { setInputState(true); setErrorMessage('')}}>
                            &times;
                        </button>
                        {errorMessage}
                    </div>
                )}
                {resultingUrl && (
                    <>
                        <div className="items-center lg:bg-swirly-arrow pb-16">
                            <div className="sm:ml-0 lg:ml-24 border-2 border-dark py-2 px-4 rounded bg-white lg:w-3/4 overflow-auto">
                                <span className="text-dark">
                                    {BASE_URL}/
                                </span>
                                <span className="text-blue-600">
                                    {resultingUrl}
                                </span>
                            </div>
                            <div className="flex justify-center space-x-4 text-center sm:ml-0 lg:ml-24 lg:w-3/4">
                            
                                <button
                                    onClick={copyToClipboard}
                                    className="button-teal mt-4"
                                >
                                    {copied}
                                </button> 
                                <button
                                    onClick={shareUrl}
                                    className="button-teal mt-4"
                                >
                                    {share}
                                </button>
                                <button onClick={() => {setInputState(true); setResultingUrl('')}} 
                                        className="button-teal mt-4">
                                    Make another
                                </button>
                            </div>
                        </div>
                        <div className="text-left mt-4 text-lg">
                        <a
                            href={`${CLIENT_URL}?reason=custom-name`}
                            className="text-blue-600 pl-8 hover:underline cursor-pointer"
                        >
                            Would you like to customize your short URL? It's free with account.
                        </a>
                        <br />
                        <button
                            onClick={() => {setShowQRCode(!showQRCode)}}
                            className="text-blue-600 pl-8 hover:underline cursor-pointer"
                        >
                            Would you like to generate a QR code with your short URL?
                        </button>
                        </div>
                        {showQRCode && <QRCodeBox value={`${BASE_URL}/${resultingUrl}`} />} 
                    </>
                )}
                
            </div>
        </div>
    )
}