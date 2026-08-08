"use client";
import { TitleWithItemsBlock } from "@/components/blocks/TitleWithItemsBlock/TitleWithItemsBlock";
import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";

import { CustomPopup } from "@/components/CustomPopup/CustomPopup";
import ContactForm from "@/components/contactForm/ContactForm";
import { FileDrop } from "@/components/input/FileDrop/FileDrop";
import { Input } from "@/components/input/text/Input";
import { TableWithScroll } from "@/components/table/TableWithScroll/TableWithScroll";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";
import { IconDownload, IconTrashFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScrollToFuture } from "scroll-to-future";

interface City {
    id: number | string;
    full_name: string;
    city: string;
    timezone: string;
    lat: number | string;
    lon: number | string;
}

interface FormCity extends City {
    formId: number;
}

const defaultValue = {
    id: "",
    full_name: "",
    city: "",
    timezone: "",
    lat: "",
    lon: "",
};

export const TableOfRussianCities = () => {
    const { header } = useAppContextActions();
    const { setIconHeader, setTitleHeader } = header || {};
    const [cities, setCities] = useState<City[]>([]);
    const [open, setOpen] = useState(false);
    const nextFormId = useRef(1);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [refPopup, setRefPopup] = useState<HTMLDivElement | null>(null);

    const [items, setItems] = useState<FormCity[]>([
        {
            ...defaultValue,
            formId: 0,
        },
    ]);

    useEffect(() => {
        const getCities = async () => {
            try {
                const res = await fetch("/data/tables/cities.json");
                const data: City[] = await res.json();
                setCities(data);
            } catch (error) {
                console.log(error);
            }
        };
        getCities();
    }, []);

    useEffect(() => {
        setIconHeader(
            <Image
                className="w-8 h-8"
                src="/map.svg"
                alt="map.svg"
                width={40}
                height={40}
            />,
        );
        setTitleHeader("Table of Russian Cities");
    }, [setIconHeader, setTitleHeader]);

    return (
        <div className="flex flex-col gap-4">
            <TitlePost
                icon="map.svg"
                description="Table of Russian Cities with Crimea"
                recordings={[
                    {
                        version: "1.0.0",
                        date: "07/31/2026",
                        title: "Publish",
                        description: "Created table",
                    },
                ]}
            >
                Table of Russian Cities
            </TitlePost>

            <TitleWithItemsBlock title="Download:">
                <GeneralButton
                    icon={<IconDownload />}
                    textButton="SQL"
                    download={{
                        path: "/data/tables/cities.sql",
                        fileName: "cities.sql",
                    }}
                />
                <GeneralButton
                    icon={<IconDownload />}
                    textButton="JSON"
                    download={{
                        path: "/data/tables/cities.json",
                        fileName: "cities.json",
                    }}
                />
            </TitleWithItemsBlock>

            <TitleWithItemsBlock title="Do you have the missing information?">
                <GeneralButton
                    textButton="Let us know about this"
                    handleAction={() => setOpen(true)}
                />
                <CustomPopup
                    ref={(node) => setRefPopup(node)}
                    body={{
                        className: "items-start",
                    }}
                    open={open}
                    setOpen={(nextOpen) => {
                        setOpen(nextOpen);

                        if (!nextOpen) {
                            const formId = nextFormId.current;

                            nextFormId.current += 1;
                            setSelectedFile(null);

                            setItems([
                                {
                                    ...defaultValue,
                                    formId,
                                },
                            ]);
                        }
                    }}
                >
                    <ContactForm
                        open={open}
                        popupRef={refPopup!}
                        title="Russian Cities Form"
                        fileFieldName="file"
                        preserveFieldsWithFile={["name", "from"]}
                        onClear={() => {
                            setSelectedFile(null);
                            setOpen(false);
                        }}
                    >
                        <div className="flex flex-col gap-2 items-start">
                            <div className="w-full">
                                <TitleWithItemsBlock title="Information from you:">
                                    <div className="flex flex-col lg:flex-row gap-1 w-full ">
                                        <Input
                                            size="md"
                                            name="name"
                                            type="text"
                                            label="Your name"
                                            value=""
                                        />
                                        <Input
                                            size="md"
                                            name="from"
                                            type="email"
                                            label="Your email"
                                            value=""
                                        />
                                    </div>
                                </TitleWithItemsBlock>
                            </div>

                            <div className="flex flex-col gap-2 overflow-y-scroll  p-2 items-end z-1">
                                <ScrollToFuture />
                                <GeneralButton
                                    textButton="Add New Item"
                                    handleAction={() => {
                                        const formId = nextFormId.current;
                                        nextFormId.current += 1;

                                        setItems((currentItems) => [
                                            {
                                                ...defaultValue,
                                                formId,
                                            },
                                            ...currentItems,
                                        ]);
                                    }}
                                />
                                <TitleWithItemsBlock
                                    title={
                                        selectedFile
                                            ? "Items are ignored because a file is selected:"
                                            : "Items:"
                                    }
                                >
                                    <div
                                        className={`
            flex
            max-h-[120px]
            flex-col
            items-end
            gap-2
            overflow-y-scroll
            p-2
            transition-opacity
            ${selectedFile ? "pointer-events-none select-none opacity-35" : ""}
        `}
                                    >
                                        <ScrollToFuture />

                                        {items.map(
                                            ({ formId, ...item }, index) => (
                                                <div
                                                    key={formId}
                                                    className="flex flex-row items-start gap-1"
                                                >
                                                    <div className="flex w-max flex-col items-center gap-2 lg:flex-row">
                                                        {index > 0 && (
                                                            <IconTrashFilled
                                                                className="
                                h-6
                                w-6
                                shrink-0
                                cursor-pointer
                                rounded-full
                                p-[4px]
                                text-pink-300
                                hover:bg-pink-300/30
                            "
                                                                onClick={() => {
                                                                    setItems(
                                                                        (
                                                                            currentItems,
                                                                        ) =>
                                                                            currentItems.filter(
                                                                                (
                                                                                    _,
                                                                                    itemIndex,
                                                                                ) =>
                                                                                    itemIndex !==
                                                                                    index,
                                                                            ),
                                                                    );
                                                                }}
                                                            />
                                                        )}

                                                        {Object.entries(
                                                            item,
                                                        ).map(
                                                            ([key, value]) => (
                                                                <Input
                                                                    key={key}
                                                                    size="xs"
                                                                    required={
                                                                        !selectedFile
                                                                    }
                                                                    disabled={
                                                                        selectedFile !==
                                                                        null
                                                                    }
                                                                    name={`items.${index}.${key}`}
                                                                    type="text"
                                                                    label={key}
                                                                    value={String(
                                                                        value,
                                                                    )}
                                                                />
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </TitleWithItemsBlock>
                            </div>

                            <div className="w-full">
                                <TitleWithItemsBlock title="or File:">
                                    <FileDrop
                                        name="file"
                                        accept=".json,.sql,.csv,.xlsx"
                                        maxSizeMb={15}
                                        onFileChange={setSelectedFile}
                                    />
                                </TitleWithItemsBlock>
                            </div>
                        </div>
                    </ContactForm>
                </CustomPopup>
            </TitleWithItemsBlock>

            <TitleWithItemsBlock
                title={`List of cities (${cities.length} elements):`}
            >
                <TableWithScroll data={cities} />
            </TitleWithItemsBlock>
        </div>
    );
};
