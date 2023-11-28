import React from 'react';

import {Card, SimpleGrid, Text, VStack} from "@chakra-ui/react";

import NotebookCard from "@/components/NotebookGrids/NotebookCard";
import AddNotebookCard from "@/components/AddModals/AddNotebook/AddNotebookCard";
import Loading from "@/components/Utilities/Loading";
import SectionBlock from "@/components/Utilities/SectionBlock";

import {Notebook} from "@/types/Notebook";
import useAuth from "@/hooks/useAuth";
import AuthProviderButtons from "@/components/Utilities/AuthButtons/AuthProviderButtons";

interface Props<NotebookType extends Notebook> {
    heading: string,
    notebooks: NotebookType[]
    loading: boolean,
    onClick: (notebook: NotebookType) => void,
    headingRightComponent?: React.ReactNode,
    noNotebooksComponent?: React.ReactNode,
    rightComponent?: (notebook: NotebookType, index: number) => React.ReactNode,
    addNotebook?: boolean,
    authGate?: boolean
}

const NotebookGrid = <NotebookType extends Notebook>({ heading, headingRightComponent, notebooks, loading, onClick, noNotebooksComponent, rightComponent, addNotebook, authGate}: Props<NotebookType>) => {

    const { user } = useAuth();

    return (
        <SectionBlock
            heading={heading}
            headingRightComponent={headingRightComponent}
        >
            <Loading
                loading={loading}
                h={'50px'}
            >
                {
                    notebooks.length === 0 && !addNotebook && !(authGate && !user) ? (
                        noNotebooksComponent || (
                            <Text>
                                No notebooks found
                            </Text>
                        )
                    ) : (
                        <SimpleGrid
                            columns={{
                                base: 1,
                                md: 2,
                                lg: 3
                            }}
                            w={'100%'}
                            gap={{
                                base: 2,
                                md: 4
                            }}
                        >
                            {
                                authGate && !user ? (
                                    <Card
                                        alignItems={'center'}
                                    >
                                        <VStack
                                            w={'100%'}
                                            align={'start'}
                                        >
                                            <Text
                                                fontSize={{
                                                    base: 'sm',
                                                    md: 'md'
                                                }}
                                            >
                                                You must be logged in to view this section
                                            </Text>
                                            <AuthProviderButtons
                                                width={'100%'}
                                            />
                                        </VStack>
                                    </Card>
                                ) : (
                                    <>
                                        {
                                            addNotebook && (
                                                <AddNotebookCard />
                                            )
                                        }
                                        {
                                            notebooks.map((notebook, index) => (
                                                <NotebookCard
                                                    key={notebook.id}
                                                    notebook={notebook}
                                                    rightComponent={rightComponent ? rightComponent(notebook, index) : undefined}
                                                    onClick={() => onClick(notebook)}
                                                />
                                            ))
                                        }
                                    </>
                                )
                            }
                        </SimpleGrid>
                    )
                }
            </Loading>
        </SectionBlock>
    );
};

export default NotebookGrid;
