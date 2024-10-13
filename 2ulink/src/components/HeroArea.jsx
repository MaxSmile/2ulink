// src/components/HeroArea.jsx

import React from 'react'

import about from '../data/about.json'
import OutputForm from './shortening/OutputForm'

const Headlines = () => {
    return (
        <div>
            <h1 className="text-xl lg:text-3xl font-light mt-16">
                {about.HomeH1}
            </h1>
            <h2 className="tracking-4 py-4 lg:py-8 font-light text-sm lg:text-2xl">
                {about.HomeH2} {about.name}
            </h2>
            <h3 className="tracking-4 font-normal text-xl">{about.HomeH3}</h3>
        </div>
    );
}

const Bottomlines = () => {
    return (
        <div>
            <h2 className="text-2xl font-light mt-16">
                {about.Moto}
            </h2>
            <p className="mt-8 text-gray-600 text-lg">
                {about.name} {about.ShortAbout}
            </p>
        </div>
    );
}


const HeroAreaSection = () => {

    return (
        <section className="py-8 lg:py-24" id="clarification">
            <div className="container mx-auto">

                <Headlines />

                <div className="mt-16 mx-auto max-w-xl">
                    <OutputForm />
                </div>

                <Bottomlines />

            </div>
        </section>
    )
}

export default HeroAreaSection

