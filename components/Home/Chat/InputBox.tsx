import React, {ChangeEventHandler} from 'react';

import {Button, Card, Flex, FormControl, FormLabel, HStack, useColorModeValue, Input} from "@chakra-ui/react";

import Actions from "@/components/Home/Chat/Actions";

import {PromptTypes} from "@/hooks/useChatEdu";

import {Note} from "@/types/Note";

interface Props {
    value: string,
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    notes: Note[],
    askMultipleChoice: () => Promise<void>;
    askFreeForm: () => Promise<void>;
    generateStudyGuide: () => Promise<void>;
    promptType: PromptTypes
    showMessage: boolean;
}

const InputBox: React.FC<Props> = ({ value, handleChange, handleSubmit, askMultipleChoice, askFreeForm, generateStudyGuide, promptType, showMessage }) => {

    const inputBoxColor = useColorModeValue("white", "#2D2D2D")

    return (
        <Flex
           flexDirection={'column'}
           gap={4}
           position={'sticky'}
           bottom={0}
           right={0}
           pt={4}
        >
            <Actions
                askMultipleChoice={askMultipleChoice}
                askFreeForm={askFreeForm}
                generateStudyGuide={generateStudyGuide}
                disabled={promptType === PromptTypes.TEXT_BASED || promptType === PromptTypes.MULTIPLE_CHOICE}
                showMessage={showMessage}
            />
            <Card
                bg={inputBoxColor}
                p={4}
            >
                <form
                    onSubmit={handleSubmit}
                    style={{
                        width: '100%'
                    }}
                >
                    <HStack
                        align={'flex-end'}
                    >
                        <FormControl
                            flex={1}
                        >
                            <FormLabel>
                                Prompt
                            </FormLabel>
                            <Input
                                value={value}
                                onChange={handleChange}
                                focusBorderColor={'brand.500'}
                                flex={1}
                                isDisabled={promptType === PromptTypes.MULTIPLE_CHOICE}
                            />
                        </FormControl>
                        <Button
                            type={'submit'}
                            colorScheme={'brand'}
                            flexShrink={0}
                            isDisabled={promptType === PromptTypes.MULTIPLE_CHOICE}
                        >
                            Send
                        </Button>
                    </HStack>
                </form>
            </Card>
        </Flex>
    );
};

export default InputBox;
