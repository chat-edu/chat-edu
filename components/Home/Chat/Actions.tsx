import React from 'react';

import {Stack} from "@chakra-ui/react";

import {FaLeaf} from "react-icons/fa";
import {MdQuestionAnswer} from "react-icons/md";
import {SlOptionsVertical} from "react-icons/sl";

import Action from "@/components/Home/Chat/Action";

interface Props {
    askMultipleChoice: () => Promise<void>;
    askFreeForm: () => Promise<void>;
    generateStudyGuide: () => Promise<void>;
}

const Actions: React.FC<Props> = ({ askMultipleChoice, askFreeForm, generateStudyGuide }) => {
    return (
        <Stack
            w={'100%'}
            spacing={4}
            flexDirection={{ base: "column", md: "row" }}
        >
            <Action
                label={"Study Guide"}
                description={"Generate a study guide based on your notes"}
                icon={FaLeaf}
                onClick={generateStudyGuide}
            />
            <Action
                label={"Multiple Choice"}
                description={"Test your knowledge with multiple choice questions"}
                icon={SlOptionsVertical}
                onClick={askMultipleChoice}
            />
            <Action
                label={"Free-form Questions"}
                description={"Test your knowledge with free-form questions"}
                icon={MdQuestionAnswer}
                onClick={askFreeForm}
            />
        </Stack>
    );
};

export default Actions;
