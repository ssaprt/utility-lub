import { Item } from "./Item";

const simples = (packageName: string) => {
    return [
        `npm i ${packageName}`,
        `yarn add ${packageName}`,
        `pnpm install ${packageName}`,
    ];
};

export const ItemInstall = ({ packageName }: { packageName: string }) => {
    return (
        <div className="col-stretch-2 children-row-center-4">
            {simples(packageName).map((item) => (
                <Item key={item} item={item} />
            ))}
        </div>
    );
};
