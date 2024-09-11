import { cn } from "@/lib/utils";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[26rem] grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "row-span-1 card group/bento hover:shadow-xl shadow-input dark:shadow-none p-4 border border-transparent justify-between flex flex-col space-y-4",
                className
            )}
        >
            
            {header}
            <div className="group-hover/bento:translate-x-2 transition duration-200">
                {icon}
                <div className="font-bold mb-2 mt-2">
                    {title}
                </div>
                <div className="font-normal text-xs ">
                    {description}
                </div>
            </div>
        </div>
    );
};
