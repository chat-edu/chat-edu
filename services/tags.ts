import {TagRow} from "@/azure/cosmos/types/tag";

export const addTag = async (tag: TagRow): Promise<TagRow | null> =>
    fetch(`/api/tags/${tag.notebook_id}/add`, {
        method: "POST",
        body: JSON.stringify(tag)
    })
        .then(res => res.json())
        .catch(null);