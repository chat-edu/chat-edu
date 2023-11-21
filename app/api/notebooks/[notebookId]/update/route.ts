import {updateNotebook} from "@/cosmos/services/notebooks";

import {NotebookIdParams} from "@/app/api/notebooks/[notebookId]/NotebookIdParams";
import {NotebookInput} from "@/types/Notebook";

export async function POST(request: Request, {params}: {params: NotebookIdParams}) {
    const body = await request.json();

    if(!body) Response.json({error: "No body provided"});

    const updatedFields: Partial<NotebookInput> = {};
    if(body.name) updatedFields.name = body.name;
    if(body.userId) updatedFields.userId = body.userId;
    if(Object.keys(updatedFields).length === 0) Response.json({error: "No fields provided"});

    return Response.json(await updateNotebook(params.notebookId, updatedFields));
}