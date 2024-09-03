import React, { FC } from "react";

interface Props {
    className?: string;
}
export const PrevIcon: FC<Props> = ({ className }) => {
    return (
        <svg className={className} viewBox="0 0 16 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.89523 11.5299L10.0456 21.9898C10.4613 22.465 11.2078 22.4408 11.5919 21.9397L14.7682 17.7957C15.028 17.4569 15.0439 16.9904 14.8079 16.6346L10.991 10.8803L15.161 6.52795C15.4681 6.20737 15.5272 5.72266 15.3059 5.33775L12.972 1.2778C12.6581 0.731866 11.9239 0.608398 11.4487 1.02165L0.991617 10.1169C0.574059 10.4801 0.530862 11.1133 0.89523 11.5299Z" fill="white" stroke="#130F21" />
        </svg>
    );
};
