import React from 'react';

import {Heading, VStack} from "@chakra-ui/react";

import NotebookGrid from "@/components/Home/Explore/NotebookGrid";

import useNotebooks from "@/hooks/queries/useNotebooks";

const PopularNotebooks = () => {

    const { notebooks, loading } = useNotebooks();

    return (
        <VStack
            spacing={4}
            align={'start'}
        >
            <Heading>
                Popular Notebooks
            </Heading>
            <NotebookGrid
                notebooks={notebooks}
                loading={loading}
            />
        </VStack>
    );
};

export default PopularNotebooks;