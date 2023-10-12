import { HTMLAttributes } from "react";

type Props = HTMLAttributes<SVGElement>;

function ChevronDoubleRight({ ...other }: Props): JSX.Element {
    return (
        <svg
            height="1.2em"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            transform="rotate(180)"
            {...other}
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                    fill="#000000"
                    fillRule="evenodd"
                    d="M9.707 4.707a1 1 0 00-1.414-1.414l-6 6a1 1 0 000 1.414l6 6a1 1 0 001.414-1.414L4.414 10l5.293-5.293zm8 0a1 1 0 00-1.414-1.414l-6 6a1 1 0 000 1.414l6 6a1 1 0 001.414-1.414L12.414 10l5.293-5.293z"
                ></path>{" "}
            </g>
        </svg>
    );
}

export default ChevronDoubleRight;
