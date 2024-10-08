module.exports = {
    content: ['./src/**/*.{js,jsx}'],
    theme: {
        screens: {
            'sm': '576px',
            'md': '768px',
            'lg': '992px',
            'xl': '1200px'
        },
        extend: {
            colors: {
                body: "#333333",
                white: {
                    DEFAULT: "#FFFFFF",
                    "light": "#f3f2f2"
                },
                dark: "#1C546A"
            },
            fontFamily: {
                base: ['"Montserrat"', 'sans-serif']
            },
            fontSize: {
                body: "14px"
            },
            container: {
                center: true,
                padding: "15px"
            },
            backgroundPosition: {
                "center-top": "50% 0px"
            },
            letterSpacing: {
                "4": "4px"
            },
            lineHeight: {
                0: "0"
            },
            dropShadow: {
                "thumb": "0px 0px 21px rgb(0 0 0 / 30%)",
                "portfolio": "0px 10px 27px rgb(0 0 0 / 10%)",
            },
            boxShadow: {
                "scroll-top": "0px -2px 9.9px 0.1px rgb(186 187 188 / 25%)"
            },
            transitionDuration: {
                "400": "0.4s"
            },
            transitionProperty: {
                "height": "height",
                "spacing": "margin, padding"
            },
            height: {
                unset: "unset"
            },
            animation: {
                "lineround": "lineround 1200ms linear 0s infinite",
                "lineheight": "lineheight 1000ms ease-in-out 0s forwards;",
                "preloaded": "preloaded 500ms ease-in-out 300ms forwards;"
            },
            keyframes: {
                lineround: {
                    "0%": {transform: "translateY(-100%)"},
                    "100%": {transform: "translateY(200%)"},
                },
                lineheight: {
                    "0%": {height: 0},
                    "100%": {height: "100%"}
                },
                preloaded: {
                    "0%": {width: "50%"},
                    "100%": {width: 0}
                }
            }
        },
    },
    plugins: [],
  }